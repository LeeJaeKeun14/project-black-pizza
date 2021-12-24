from flask import Flask, jsonify, Blueprint, request, session
from models import User, Contents
from db_connect import db

contents = Blueprint('contents', __name__, url_prefix='/api/contents')

temp_list = {
    "1": ["모가디슈", "https://images.justwatch.com/poster/247509899/s276/mogadisyu.webp", {"스트리밍": {{"ott": "넷플릭스", "price": "정액제"}}, "대여": {{"ott": "wavve", "price": 5000}, {"ott": "naver_series_on", "price": 10000}}, "구매": {{"ott": "wavve", "price": 9900}, {"ott": "naver_series_on", "price": 14900}}}],
    "2": ["지옥", "https://images.justwatch.com/poster/254406538/s276/jiog.webp", {"스트리밍": {{"ott": "넷플릭스", "price": "정액제"}}}],
    "3": ["그 해 우리는", "https://images.justwatch.com/poster/256797687/s276/geu-hae-urineun.webp", {"스트리밍": {{"ott": "넷플릭스", "price": "정액제"}, {"ott": "wavve", "price": "정액제"}}}],
    "4": ["베놈", "https://images.justwatch.com/poster/245637413/s276/benom.webp", {"스트리밍": {{"ott": "넷플릭스", "price": "정액제"}, {"ott": "watcha", "price": "정액제"}}, "대여": {{"ott": "wavve", "price": 1300}, {"ott": "naver_series_on", "price": 1300}}, "구매": {{"ott": "wavve", "price": 5000}, {"ott": "naver_series_on", "price": 5500}}}],
    "5": ["사역소", "https://images.justwatch.com/poster/191247113/s276/sayeogso.webp", {"스트리밍": {{"ott": "넷플릭스", "price": "정액제"}}}],
}

detail_temp_list = {
    "1": ["모가디슈", "https://images.justwatch.com/poster/247509899/s276/mogadisyu.webp", "2021", ["액션", "드라마", "스릴러"], " 2시간 1분", "Ryoo Seung-wan", ["Kim Yoon-seok", "Jo In-sung", "Heo Joon-ho"]],
    "2": ["지옥", "https://images.justwatch.com/poster/254406538/s276/jiog.webp", "2021", ["SF", "공포", "스릴러", "범죄", "드라마", "판타지"], "52min", "Yeon Sang-ho", ["Yoo Ah-in", "Kim Hyun-joo", "Park Jeong-min"]],
}

list_page = 1


@contents.route('/list', methods=['GET'])
def list():
    global list_page
    movie_list = {'page': list_page}
    if request.method == "GET":
        for i, movie in enumerate((temp_list.values())):
            if (i+1) % 100 == 0:
                list_page += 1
                break
            title = movie[0]
            image = movie[1]
            movie_list[str(i+1)] = [title, image]

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
        content = detail_temp_list[id]
        # content = Contents.query.filter(Contents.id == id).first()

    return jsonify(content)


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
