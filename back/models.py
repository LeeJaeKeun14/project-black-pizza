from db_connect import db


class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, nullable=False,
                    primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password


class Contents(db.Model):
    __tablename__ = "Contents"

    id = db.Column(db.Integer, nullable=False,
                    primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    origin_title = db.Column(db.String(255), nullable=True)
    open_year = db.Column(db.Integer, nullable=True)
    score = db.Column(db.Float, nullable=True)
    runtime = db.Column(db.Time, nullable=True)
    director = db.Column(db.String(80), nullable=True)
    synopsis = db.Column(db.TEXT, nullable=True)
    image = db.Column(db.String(255), nullable=True)  # 일단 link로 넣을 수 있게 살려둠

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

    __tablename__ = "Genre"

    id = db.Column(db.Integer, nullable=False,
                    primary_key=True, autoincrement=True)
    contents_id = db.Column(db.Integer, db.ForeignKey(
        'Contents.id'), nullable=False)
    genre = db.Column(db.String(80), nullable=False)

    def __init__(self, contents_id, genre):
        self.contents_id = contents_id
        self.genre = genre


class Actor(db.Model):

    __tablename__ = "Actor"

    id = db.Column(db.Integer, nullable=False,
                    primary_key=True, autoincrement=True)
    contents_id = db.Column(db.Integer, db.ForeignKey(
        'Contents.id'), nullable=False)
    actor = db.Column(db.String(80), nullable=False)

    def __init__(self, contents_id, actor):
        self.contents_id = contents_id
        self.actor = actor


class Streaming(db.Model):
    __tablename__ = "Streaming"

    id = db.Column(db.Integer, nullable=False,
                    primary_key=True, autoincrement=True)
    contents_id = db.Column(db.Integer, db.ForeignKey(
        'Contents.id'), nullable=False, primary_key=True)
    ott = db.Column(db.String(80), nullable=False)
    price = db.Column(db.String(20), nullable=False)  # 정액제, 무료
    quality = db.Column(db.String(20))

    def __init__(self, contents_id, ott, price):
        self.contents_id = contents_id
        self.ott = ott
        self.price = price


class Buy(db.Model):
    __tablename__ = "Buy"

    id = db.Column(db.Integer, nullable=False,
                    primary_key=True, autoincrement=True)
    contents_id = db.Column(db.Integer, db.ForeignKey(
        'Contents.id'), nullable=False)
    ott = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    quality = db.Column(db.String(20))

    def __init__(self, contents_id, ott, price):
        self.contents_id = contents_id
        self.ott = ott
        self.price = price


class Rent(db.Model):
    __tablename__ = "Rent"

    id = db.Column(db.Integer, nullable=False,
                    primary_key=True, autoincrement=True)
    contents_id = db.Column(db.Integer, db.ForeignKey(
        'Contents.id'), nullable=False)
    ott = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    quality = db.Column(db.String(20))

    def __init__(self, contents_id, ott, price):
        self.contents_id = contents_id
        self.ott = ott
        self.price = price


class User_Taste(db.Model):
    __tablename__ = "User_Taste"
    id = db.Column(db.Integer, nullable=False, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    contents_id = db.Column(db.Integer, db.ForeignKey('Contents.id'), nullable=False)
    score = db.Column(db.Float, nullable=True)
    is_picked = db.Column(db.Boolean, nullable=True)

    def __init__(self, user_id, contents_id, score=None, is_picked=False):
        self.user_id = user_id
        self.contents_id = contents_id
        self.score = score
        self.is_picked = is_picked