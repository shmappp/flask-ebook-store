import os
from datetime import timedelta
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    JWT_SECRET_KEY= os.environ.get('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES= timedelta(minutes=int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES')))