from flask import Flask, jsonify, Blueprint, request, session
# from back.models import Buy, Streaming, Rent
from models import User, Contents, Genre, Actor, Buy, Streaming, Rent
from db_connect import db
from datateam.Recommendation import recommendations

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
        contents = Contents.query.order_by(Contents.open_year.desc()).all()[
            (list_page-1)*100+1:(list_page)*100]
        for content in contents:
            movie_dict = {}
            movie_dict['key'] = content.id
            movie_dict['info'] = [content.title,
                                  content.image, content.open_year]
            movie_list['list'].append(movie_dict)
        list_page += 1

    return jsonify(movie_list)


@contents.route('/recommend', methods=['GET', 'POST'])
def recommend():
    if request.method == 'POST':
        params = request.get_json()
        user_pick_list = params['data']
        user_pick_id = [i[0] for i in user_pick_list]
    else:
        user_pick_id = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    con_list = Contents.query.filter(Contents.id.in_(user_pick_id))
    user_pick = [i.title for i in con_list]
    rcm_df = recommendations(user_pick)
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
    print(res)
    return jsonify(res)

    # user_pick = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    # contents_all = db.session.query(Contents.id, Contents.title, Contents.score, Contents.director).all()
    # actors = db.session.query(Actor.contents_id, Actor.actor).all()
    # genre = db.session.query(Genre.contents_id, Genre.genre).all()
    # contents_all = db.session.query(Contents.id, Contents.title, Contents.score, Contents.director).limit(10)
    # actors = db.session.query(Actor.contents_id, Actor.actor).limit(10)
    # genre = db.session.query(Genre.contents_id, Genre.genre).limit(10)
    # rcm = recommendations(user_pick, contents_all, actors, genre)
    # print(rcm)
    # return jsonify(rcm)

    # if request.method == 'GET':
    #     recommend_contents = temp_list
    # else:
    #     recommend_contents = temp_list
    # res = {"status": 200, "result": "success", "contents": recommend_contents}

    # return recommend_contents


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
