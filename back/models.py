from db_connect import db


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(self, username, email):
        self.username = username
        self.email = email


class Contents(db.Model):
    __tablename__ = "contents"

    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), unique=True, nullable=False)
    origin_title = db.Column(db.String(255), unique=True, nullable=True)
    open_year = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Float, nullable=False)
    runtime = db.Column(db.Time, nullable=False)
    director = db.Column(db.String(80), nullable=False)
    synopsis = db.Column(db.TEXT, nullable=False)
    image = db.Column(db.String(255), nullable=False)  # 일단 link로 넣을 수 있게 살려둠

    def __init__(self, data):
        if type(data) is dict:
            self.title = data['title']
            self.origin_title = data['origin_title']
            self.open_year = data['open_year']
            self.score = data['score']
            self.runtime = data['runtime']
            self.director = data['director']
            self.synopsis = data['synopsis']
            self.image = data['image']

    # data 잘 들어갔는지 테스트용
    def __str__(self):
        return f'{self.title}\n{self.director}\n'


class Genre(db.Model):

    __tablename__ = "genre"

    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    contents_id = db.Column(db.Integer, db.ForeignKey(
        'contents.id'), nullable=False)
    genre = db.Column(db.String(80), nullable=False)

    def __init__(self, contents_id, genre):
        self.contents_id = contents_id
        self.genre = genre


class Actor(db.Model):

    __tablename__ = "actor"

    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    contents_id = db.Column(db.Integer, db.ForeignKey(
        'contents.id'), nullable=False)
    actor = db.Column(db.String(80), nullable=False)

    def __init__(self, contents_id, actor):
        self.contents_id = contents_id
        self.actor = actor


class Streaming(db.Model):
    __tablename__ = "streaming"

    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    contents_id = db.Column(db.Integer, db.ForeignKey(
        'contents.id'), nullable=False, primary_key=True)
    ott = db.Column(db.String(80), nullable=False)
    price = db.Column(db.String(20), nullable=False)  # 정액제, 무료
    quality = db.Column(db.String(20), nullable=False)

    def __init__(self, contents_id, ott, price, quality):
        self.contents_id = contents_id
        self.ott = ott
        self.price = price


class Buy(db.Model):
    __tablename__ = "buy"

    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    contents_id = db.Column(db.Integer, db.ForeignKey(
        'contents.id'), nullable=False)
    ott = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    quality = db.Column(db.String(20), nullable=False)

    def __init__(self, contents_id, ott, price, quality):
        self.contents_id = contents_id
        self.ott = ott
        self.price = price


class Rent(db.Model):
    __tablename__ = "rent"

    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    contents_id = db.Column(db.Integer, db.ForeignKey(
        'contents.id'), nullable=False)
    ott = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    quality = db.Column(db.String(20), nullable=False)

    def __init__(self, contents_id, ott, price, quality):
        self.contents_id = contents_id
        self.ott = ott
        self.price = price
