from flask import Blueprint, jsonify, request

api_bp = Blueprint('api', __name__, url_prefix='/api/v1')

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
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    if file:
        # For now, just return the filename as confirmation
        return jsonify({'message': f'File {file.filename} received successfully.'}), 200

    return jsonify({'error': 'File upload failed'}), 500


@api_bp.route('/upload-json', methods=['POST'])
def upload_json():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No JSON data received'}), 400

    # For now, just return the received keys as confirmation
    return jsonify({'message': 'JSON received successfully.', 'keys': list(data.keys())}), 200