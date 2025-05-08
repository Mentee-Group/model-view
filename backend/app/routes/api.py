import os
from flask import Blueprint, jsonify, request

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
        save_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(save_path)
        saved_files.append(file.filename)

    if not saved_files:
        return jsonify({'error': 'No valid files uploaded'}), 400

    return jsonify({'message': 'Files uploaded successfully', 'files': saved_files}), 200


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

@api_bp.route('/upload-json', methods=['POST'])
def upload_json():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No JSON data received'}), 400

    # For now, just return the received keys as confirmation
    return jsonify({'message': 'JSON received successfully.', 'keys': list(data.keys())}), 200