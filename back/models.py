from db_connect import db

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    def __init__(self, username, email):
        self.username = username
        self.email = email

class Contents(db.Model):
    __tablename__ = "Contents"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), unique=True, nullable=False)
    open_year = db.Column(db.Integer, nullable=True)
    score = db.Column(db.Integer, nullable=True)
    genre = db.Column(db.String(80), nullable=True)
    runtime = db.Column(db.Time, nullable=True)
    director = db.Column(db.String(80), nullable=True)
    image = db.Column(db.String(255), nullable=True)
    