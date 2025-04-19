from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/health', methods=['GET'])
def health():
    """Health Check API Endpoint"""
    return jsonify({
        'message': 'Healthy!',
        'status': 'success'
    })