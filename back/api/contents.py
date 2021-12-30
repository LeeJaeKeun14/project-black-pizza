from flask import Flask, jsonify, Blueprint, request, session
from numpy.random.mtrand import randint

from models import User, Contents, Genre, Actor, Buy, Streaming, Rent, User_Taste
from db_connect import db
from datateam.Recommendation import recommendations

from sqlalchemy.sql import func
from sqlalchemy.sql.elements import and_

contents = Blueprint('contents', __name__, url_prefix='/api/contents')


@contents.route('/list', methods=['GET', 'POST'])
def list():
    if request.method == "POST":
        params = request.get_json()
        genres = params['genres']
        years = sorted(params['years'], reverse=True)
        list_page = int(params['page'])

        # genres = ['로맨스', '드라마', 'SF']
        # years = sorted([1990, 2000], reverse=True)
        # list_page = 1

        contents = []
        movie_list = {'page': list_page, 'list': []}
        contents_genre = db.session.query(Genre.contents_id).filter(
            Genre.genre.in_(genres)).scalar_subquery()
        for year in years:
            contents.extend(Contents.query.filter((Contents.id.in_(contents_genre)) & (
                Contents.open_year >= year) & (Contents.open_year < year+10)).all())

        contents_res = contents[(list_page-1)*20:(list_page)*20]
        for content in contents_res:
            movie_dict = {}
            movie_dict['key'] = content.id
            # movie_dict['genre'] = []
            # genres = Genre.query.filter(Genre.contents_id == content.id).all()
            # for genre in genres:
            #     movie_dict['genre'].append(genre.genre)
            movie_dict['info'] = [content.title, content.image]
            # movie_dict['info'] = [content.title, content.image, content.open_year]
            movie_list['list'].append(movie_dict)
        return jsonify(movie_list)


@contents.route('/recommend', methods=['GET', 'POST'])
def recommend():
    if request.method == 'POST':
        params = request.get_json()
        user_pick_list = params['data']
        user_pick_id = [i['contents_id'] for i in user_pick_list]
        user_scores = [i['score'] for i in user_pick_list]
        if session.get('email'):
            user_email = session['email']
            user_id = User.query.filter(User.email == user_email).first().id
            for taste in user_pick_list:
                new_taste = User_Taste(
                    user_id=user_id,
                    contents_id=taste['contents_id'],
                    score=taste['score'] if 'score' in taste else None,
                    is_picked=taste['is_picked'] if 'is_picked' in taste else False
                )
                db.session.add(new_taste)
            db.session.commit()

    else:
        user_pick_id = [100, 200, 300, 400, 500, 600, 700, 800, 900]
        user_scores = [randint(1, 10) for _ in range(10)]
    con_list = Contents.query.filter(Contents.id.in_(user_pick_id))
    user_pick = [i.title for i in con_list]

    contents_all = db.session.query(
        Contents.id, Contents.title, Contents.score, Contents.director).all()
    actors = db.session.query(Actor.contents_id, Actor.actor).all()
    genre = db.session.query(Genre.contents_id, Genre.genre).all()

    rcm_df = recommendations(user_pick, contents_all, actors, genre)

    # rcm -> response
    rcm_title = [line['제목'] for i, line in rcm_df.iterrows()]
    rcm_list = Contents.query.filter(Contents.title.in_(rcm_title))
    res = []
    content = {}
    for i in rcm_list:
        ott_info = {}
        content[i.id] = [i.title, i.image, ott_info]
        streaming_list = Streaming.query.filter(Streaming.contents_id == i.id)
        buy_list = Buy.query.filter(Buy.contents_id == i.id)
        rent_list = Rent.query.filter(Rent.contents_id == i.id)
        ott_info['streaming'] = [
            {'ott': i.ott, 'price': i.price, 'quality': i.quality} for i in streaming_list]
        ott_info['buy'] = [{'ott': i.ott, 'price': i.price,
                            'quality': i.quality} for i in buy_list]
        ott_info['rent'] = [{'ott': i.ott, 'price': i.price,
                             'quality': i.quality} for i in rent_list]

    ott_count = {}
    for value in content.values():
        otts = value[2]
        for key in otts.keys():
            for ott_dict in otts[key]:
                if ott_dict['ott'] in ott_count:
                    ott_count[ott_dict['ott']] += 1
                else:
                    ott_count[ott_dict['ott']] = 0

    res.append(content)
    res.append(ott_count)
    # print(res)
    return jsonify(res)


@contents.route('/detail/<id>', methods=['GET'])
def detail(id):
    if request.method == "GET":
        # content = detail_temp_list[id]
        content_detail = {}
        content = Contents.query.filter(Contents.id == id).first()
        genres = Genre.query.filter(Genre.contents_id == id).all()
        content_detail['genre'] = []
        for genre in genres:
            content_detail['genre'].append(genre.genre)
        actors = Actor.query.filter(Actor.contents_id == id).all()
        content_detail['actor'] = []
        for actor in actors:
            content_detail['actor'].append(actor.actor)
        content_detail['title'] = content.title
        content_detail['image'] = content.image
        content_detail['open_year'] = content.open_year
        content_detail['runtime'] = content.runtime.strftime("%H:%M")
        content_detail['director'] = content.director

    return jsonify(content_detail)


@contents.route('/search', methods=['GET'])
def search():
    if request.method == "GET":
        q = request.args.get('q', None)
        type = request.args.get('type', None)
        search_contents, search_actors, contents_list = [], [], []
        res = {'contents': [], 'q': q, 'type': type}
        if q is not None:
            if type == 'title':
                search_contents = Contents.query.filter(
                    Contents.title.like(f"%{q}%")).order_by(Contents.id).all()
            elif type == 'director':
                search_contents = Contents.query.filter(
                    Contents.director.like(f"%{q}%")).order_by(Contents.id).all()
            elif type == 'actor':
                search_actors = Actor.query.filter(
                    Actor.actor.like(f"%{q}%")).order_by(Actor.contents_id).all()

            for content in search_contents:
                content_dict = {'key': None, 'info': None, 'ott': []}
                content_dict['key'] = content.id
                content_dict['info'] = [content.title, content.image]
                otts = Streaming.query.filter(
                    Streaming.contents_id == content.id).all()
                for ott in otts:
                    content_dict['ott'].append(ott.ott)
                contents_list.append(content_dict)

            for actor in search_actors:
                content = Contents.query.filter(
                    Contents.id == actor.contents_id).first()
                content_dict = {'key': None, 'info': None, 'ott': []}
                content_dict['key'] = content.id
                content_dict['info'] = [content.title, content.image]
                otts = Streaming.query.filter(
                    Streaming.contents_id == content.id).all()
                for ott in otts:
                    content_dict['ott'].append(ott.ott)
                contents_list.append(content_dict)

            res['contents'] = contents_list
        return jsonify(res)


@contents.route('/test', methods=['GET', 'POST'])
def test():
    recommend_contents = db.session.query(Contents).all()
    res = {}
    for i in recommend_contents:
        content_info = []
        content_info.append(i.title)
        content_info.append(i.image)
        res[i.title] = content_info
    return jsonify(res)


@contents.route('/userpick', methods=['GET'])
def userpick():
    if session.get('email'):
        user_email = session['email']
        user_id = User.query.filter(User.email == user_email).first().id
        user_pick = []
        user_taste = db.session.query(User_Taste).filter(
            and_(User_Taste.user_id == user_id, User_Taste.is_picked == True)).subquery()
        contents = db.session.query(Contents.id, Contents.title, Contents.image).join(
            user_taste, user_taste.c.contents_id == Contents.id).all()

        for content in contents:
            print(content)
            movie_dict = {}
            movie_dict['key'] = content.id
            movie_dict['info'] = [content.title, content.image]
            user_pick.append(movie_dict)
    else:
        return jsonify({"status": 404, "result": 'fail', "message": "로그인된 유저가 아닙니다."})

    return jsonify(user_pick)


@contents.route('/favorite', methods=['GET'])
def favorite():
    favorite = []
    # user_taste_score = db.session.query(User_Taste).filter(User_Taste.score != None).subquery()
    common_favorite = db.session.query(User_Taste.contents_id, func.avg(User_Taste.score).label(
        'avg_score')).filter(User_Taste.score != None).group_by(User_Taste.contents_id).subquery()
    contents = db.session.query(Contents.id, Contents.title, Contents.image, common_favorite.c.avg_score).join(
        common_favorite, common_favorite.c.contents_id == Contents.id).order_by(common_favorite.c.avg_score.desc()).limit(10)

    for content in contents:
        print(content)
        movie_dict = {}
        movie_dict['key'] = content.id
        movie_dict['info'] = [content.title, content.image]
        favorite.append(movie_dict)

    return jsonify(favorite)
