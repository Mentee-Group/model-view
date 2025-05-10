import os
import pandas as pd
from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename

api_bp = Blueprint('api', __name__, url_prefix='/api/v1')

UPLOAD_REQUIRED_FIELDS = ['name', 'description']
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@api_bp.route('/health', methods=['GET'])
def health():
    """Health Check API Endpoint"""
    return jsonify({
        'message': 'Healthy!',
        'status': 'success'
    })


@api_bp.route('/upload-dataset', methods=['POST'])
def upload_dataset():
    if 'file' not in request.files:
        return jsonify({'error': 'No files found in request'}), 400

    files = request.files.getlist('file')

    if not files:
        return jsonify({'error': 'No files selected'}), 400

    saved_files = []

    for file in files:
        if file.filename == '':
            continue

        filename = secure_filename(file.filename)
        base_name, _ = os.path.splitext(filename)
        subfolder_path = os.path.join(UPLOAD_FOLDER, base_name)

        os.makedirs(subfolder_path, exist_ok=True)

        save_path = os.path.join(subfolder_path, filename)
        file.save(save_path)
        saved_files.append(os.path.relpath(save_path, start=UPLOAD_FOLDER))

    if not saved_files:
        return jsonify({'error': 'No valid files uploaded'}), 400

    return jsonify({
        'message': 'Files uploaded successfully',
        'files': saved_files
    }), 200

# Comment this out for now. Will use it once we are getting form fields in the request.
# @api_bp.route('/upload-dataset', methods=['POST'])
# def upload_dataset():
#     form = request.form
#     errors = []

#     for field in UPLOAD_REQUIRED_FIELDS:
#         value = form.get(field, "").strip()
#         if not value:
#             errors.append(f"{field.capitalize()} is required.")

#     if 'file' not in request.files:
#         errors.append("No files found in request.")
#     else:
#         files = request.files.getlist('file')
#         if not files or all(f.filename == '' for f in files):
#             errors.append("No valid files selected.")

#     if errors:
#         return jsonify({'errors': errors}), 400

#     saved_files = []
#     for file in files:
#         if file.filename == '':
#             continue
#         save_path = os.path.join(UPLOAD_FOLDER, file.filename)
#         file.save(save_path)
#         saved_files.append(file.filename)

#     return jsonify({'message': 'Files uploaded successfully', 'files': saved_files}), 200


@api_bp.route('/get-dataset/<dataset_name>', methods=['GET'])
def get_dataset(dataset_name):
    dataset_folder = os.path.join(UPLOAD_FOLDER, dataset_name)

    if not os.path.isdir(dataset_folder):
        return jsonify({'error': f'Dataset "{dataset_name}" not found'}), 404

    files = [f for f in os.listdir(dataset_folder) if os.path.isfile(os.path.join(dataset_folder, f))]
    if not files:
        return jsonify({'error': f'No files found in dataset "{dataset_name}"'}), 404

    file_path = os.path.join(dataset_folder, files[0])
    _, ext = os.path.splitext(file_path)

    try:
        if ext.lower() == '.csv':
            df = pd.read_csv(file_path)
            return jsonify(df.to_dict(orient='records')), 200
        elif ext.lower() == '.json':
            with open(file_path, 'r', encoding='utf-8') as f:
                data = f.read()
            return jsonify(eval(data)), 200  
        else:
            return jsonify({'error': f'Unsupported file type: {ext}'}), 400
    except Exception as e:
        return jsonify({'error': f'Failed to read file: {str(e)}'}), 500


@api_bp.route('/upload-json', methods=['POST'])
def upload_json():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No JSON data received'}), 400

    # For now, just return the received keys as confirmation
    return jsonify({'message': 'JSON received successfully.', 'keys': list(data.keys())}), 200