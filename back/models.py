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
    rate_count = db.Column(db.Integer, nullable=True)
    runtime = db.Column(db.Time, nullable=True)
    director = db.Column(db.String(80), nullable=True)
    synopsis = db.Column(db.TEXT, nullable=True)
    image = db.Column(db.String(255), nullable=True)  # 일단 link로 넣을 수 있게 살려둠
    isMovie = db.Column(db.Boolean, nullable=True)

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

class Genre_Matrix(db.Model):
    __tablename__ = "Genre_Matrix"
    id = db.Column(db.Integer, db.ForeignKey('Contents.id'), nullable=False, primary_key=True, autoincrement=True)
    top1 = db.Column(db.Integer, nullable=False)
    top2 = db.Column(db.Integer, nullable=False)
    top3 = db.Column(db.Integer, nullable=False)
    top4 = db.Column(db.Integer, nullable=False)
    top5 = db.Column(db.Integer, nullable=False)
    top6 = db.Column(db.Integer, nullable=False)
    top7 = db.Column(db.Integer, nullable=False)
    top8 = db.Column(db.Integer, nullable=False)
    top9 = db.Column(db.Integer, nullable=False)
    top10 = db.Column(db.Integer, nullable=False)
    top11 = db.Column(db.Integer, nullable=False)
    top12 = db.Column(db.Integer, nullable=False)
    top13 = db.Column(db.Integer, nullable=False)
    top14 = db.Column(db.Integer, nullable=False)
    top15 = db.Column(db.Integer, nullable=False)
    top16 = db.Column(db.Integer, nullable=False)
    top17 = db.Column(db.Integer, nullable=False)
    top18 = db.Column(db.Integer, nullable=False)
    top19 = db.Column(db.Integer, nullable=False)
    top20 = db.Column(db.Integer, nullable=False)
    top21 = db.Column(db.Integer, nullable=False)
    top22 = db.Column(db.Integer, nullable=False)
    top23 = db.Column(db.Integer, nullable=False)
    top24 = db.Column(db.Integer, nullable=False)
    top25 = db.Column(db.Integer, nullable=False)
    top26 = db.Column(db.Integer, nullable=False)
    top27 = db.Column(db.Integer, nullable=False)
    top28 = db.Column(db.Integer, nullable=False)
    top29 = db.Column(db.Integer, nullable=False)
    top30 = db.Column(db.Integer, nullable=False)
    top31 = db.Column(db.Integer, nullable=False)
    top32 = db.Column(db.Integer, nullable=False)
    top33 = db.Column(db.Integer, nullable=False)
    top34 = db.Column(db.Integer, nullable=False)
    top35 = db.Column(db.Integer, nullable=False)
    top36 = db.Column(db.Integer, nullable=False)
    top37 = db.Column(db.Integer, nullable=False)
    top38 = db.Column(db.Integer, nullable=False)
    top39 = db.Column(db.Integer, nullable=False)
    top40 = db.Column(db.Integer, nullable=False)
    top41 = db.Column(db.Integer, nullable=False)
    top42 = db.Column(db.Integer, nullable=False)
    top43 = db.Column(db.Integer, nullable=False)
    top44 = db.Column(db.Integer, nullable=False)
    top45 = db.Column(db.Integer, nullable=False)
    top46 = db.Column(db.Integer, nullable=False)
    top47 = db.Column(db.Integer, nullable=False)
    top48 = db.Column(db.Integer, nullable=False)
    top49 = db.Column(db.Integer, nullable=False)
    top50 = db.Column(db.Integer, nullable=False)
    top51 = db.Column(db.Integer, nullable=False)
    top52 = db.Column(db.Integer, nullable=False)
    top53 = db.Column(db.Integer, nullable=False)
    top54 = db.Column(db.Integer, nullable=False)
    top55 = db.Column(db.Integer, nullable=False)
    top56 = db.Column(db.Integer, nullable=False)
    top57 = db.Column(db.Integer, nullable=False)
    top58 = db.Column(db.Integer, nullable=False)
    top59 = db.Column(db.Integer, nullable=False)
    top60 = db.Column(db.Integer, nullable=False)