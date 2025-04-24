from flask import Flask
from flask_cors import CORS

from config import get_config

def create_app():
    config_class = get_config()
    
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    CORS(app, origins=app.config['CORS_ORIGINS'])
    
    from app.routes.api import api_bp
    app.register_blueprint(api_bp)

    print(f"Starting app with config: {config_class.NAME}")
    
    return app