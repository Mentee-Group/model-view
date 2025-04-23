import os

class Config:
    """Base configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-key-change')
    DEBUG = False
    TESTING = False
    CORS_ORIGINS = ["http://localhost:5173"] 

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    DEBUG = True

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    CORS_ORIGINS = ["https://productionfrontend.com"] # TODO : Change when have actual url.