from flask import Flask, jsonify, Blueprint, request, session
from models import User, Contents, Genre, Actor
from db_connect import db

contents = Blueprint('contents', __name__, url_prefix='/api/contents')

temp_list = {
    "1": ["모가디슈", "https://images.justwatch.com/poster/247509899/s276/mogadisyu.webp", {"스트리밍": [{"ott": "넷플릭스", "price": "정액제"}], "대여": [{"ott": "wavve", "price": 5000}, {"ott": "naver_series_on", "price": 10000}], "구매": [{"ott": "wavve", "price": 9900}, {"ott": "naver_series_on", "price": 14900}]}],
    "2": ["지옥", "https://images.justwatch.com/poster/254406538/s276/jiog.webp", {"스트리밍": [{"ott": "넷플릭스", "price": "정액제"}]}],
    "3": ["그 해 우리는", "https://images.justwatch.com/poster/256797687/s276/geu-hae-urineun.webp", {"스트리밍": [{"ott": "넷플릭스", "price": "정액제"}, {"ott": "wavve", "price": "정액제"}]}],
    "4": ["베놈", "https://images.justwatch.com/poster/245637413/s276/benom.webp", {"스트리밍": [{"ott": "넷플릭스", "price": "정액제"}, {"ott": "watcha", "price": "정액제"}], "대여": [{"ott": "wavve", "price": 1300}, {"ott": "naver_series_on", "price": 1300}], "구매": [{"ott": "wavve", "price": 5000}, {"ott": "naver_series_on", "price": 5500}]}],
    "5": ["사역소", "https://images.justwatch.com/poster/191247113/s276/sayeogso.webp", {"스트리밍": [{"ott": "넷플릭스", "price": "정액제"}]}],
}

detail_temp_list = {
    "1": ["모가디슈", "https://images.justwatch.com/poster/247509899/s276/mogadisyu.webp", "2021", ["액션", "드라마", "스릴러"], " 2시간 1분", "Ryoo Seung-wan", ["Kim Yoon-seok", "Jo In-sung", "Heo Joon-ho"]],
    "2": ["지옥", "https://images.justwatch.com/poster/254406538/s276/jiog.webp", "2021", ["SF", "공포", "스릴러", "범죄", "드라마", "판타지"], "52min", "Yeon Sang-ho", ["Yoo Ah-in", "Kim Hyun-joo", "Park Jeong-min"]],
}


@contents.route('/list', methods=['GET'])
def list():
    if request.method == "GET":
        list_page = int(request.args.get('page'))
        movie_list = {'page': list_page, 'list': []}
        contents = Contents.query.filter(
            (Contents.id >= (list_page-1)*100+1) & (Contents.id <= (list_page)*100)).all()
        for content in contents:
            movie_dict = {}
            movie_dict['key'] = content.id
            movie_dict['info'] = [content.title, content.image]
            movie_list['list'].append(movie_dict)
        list_page += 1

    return jsonify(movie_list)


@contents.route('/recommend', methods=['GET', 'POST'])
def recommend():
    if request.method == 'GET':
        recommend_contents = temp_list
    else:
        recommend_contents = temp_list
    # res = {"status": 200, "result": "success", "contents": recommend_contents}
    return jsonify(recommend_contents)


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
