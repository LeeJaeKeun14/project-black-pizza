from flask import Flask, jsonify, Blueprint, request, session
from models import User, Contents
from db_connect import db

contents = Blueprint('contents', __name__, url_prefix='/api/contents')

temp_list = {
    "모가디슈": ["모가디슈", "https://images.justwatch.com/poster/247509899/s276/mogadisyu.webp", {"스트리밍": {"넷플릭스": "정액제"}, "대여": {"wavve": 5000, "naver_series_on": 10000}, "구매": {"wavve": 9900, "naver_series_on": 14900}}],
    "지옥": ["지옥", "https://images.justwatch.com/poster/254406538/s276/jiog.webp", {"스트리밍": {"넷플릭스": "정액제"}}],
    "그 해 우리는": ["그 해 우리는", "https://images.justwatch.com/poster/256797687/s276/geu-hae-urineun.webp", {"스트리밍": {"넷플릭스": "정액제", "wavve": "정액제"}}],
    "베놈": ["베놈", "https://images.justwatch.com/poster/245637413/s276/benom.webp", {"스트리밍": {"넷플릭스": "정액제", "watcha": "정액제"}, "대여": {"wavve": 1300, "naver_series_on": 1300}, "구매": {"wavve": 5000, "naver_series_on": 5500}}],
    "사역소": ["사역소", "https://images.justwatch.com/poster/191247113/s276/sayeogso.webp", {"스트리밍": {"넷플릭스": "정액제"}}],
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
            movie_list[str(i)] = [title, image]

    return jsonify(movie_list)


@contents.route('/recommend', methods=['GET', 'POST'])
def recommend():
    if request.method == 'GET':
        recommend_contents = temp_list
    else:
        recommend_contents = temp_list
    # res = {"status": 200, "result": "success", "contents": recommend_contents}
    return jsonify(recommend_contents)


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
