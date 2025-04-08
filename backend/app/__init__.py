from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
import os
from flask_cors import CORS
from flask_jwt_extended import JWTManager

allowed_origins = ['http://localhost:3000'] # testing frontend origin

app = Flask(__name__)
CORS(app, origins=allowed_origins, supports_credentials=True)
jwt = JWTManager(app)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes  