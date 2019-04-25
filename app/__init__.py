from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)


SQLALCHEMY_DATABASE_URI = "postgresql://monk:jordan@localhost/monk"
SQLALCHEMY_TRACK_MODIFICATION = False
SECRET_KEY = '1234567890'
UPLOAD_FOLDER = "./app/static/uploads"
csrf = CSRFProtect(app)
app.config.from_object(__name__)

db = SQLAlchemy(app)

from app import views,models