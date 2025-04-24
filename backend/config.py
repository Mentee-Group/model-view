import os

class Config:
    """Base configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-key-change')
    DEBUG = False
    TESTING = False
    CORS_ORIGINS = ["http://localhost:5173"]
    NAME = "base"

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    NAME = "development"

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    DEBUG = True
    NAME = "testing"

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    CORS_ORIGINS = ["https://productionfrontend.com"] # TODO : Change when have actual url.
    NAME = "production"

config_by_name = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}

def get_config():
    env = os.environ.get('FLASK_ENV', 'development') 
    return config_by_name.get(env, DevelopmentConfig)