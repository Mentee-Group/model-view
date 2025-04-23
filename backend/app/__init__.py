from flask import Flask
from flask_cors import CORS

def create_app(config_object="config.DevelopmentConfig"):
    app = Flask(__name__)
    app.config.from_object(config_object)
    
    CORS(app, origins=app.config['CORS_ORIGINS'])
    
    from app.routes.api import api_bp
    app.register_blueprint(api_bp)
    
    return app