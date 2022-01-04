import pytest
import requests
import json
import jsonpath
from main import create_app
from flask_migrate import Migrate
from db_connect import db
from flask import session


base_url = "http://localhost:5000/api"


def test_contents_recommend():
    path = "/contents/recommend"

    response_get = requests.get(base_url + path)
    responseJson_get = json.loads(response_get.text)
    assert response_get.status_code == 200
    assert type(jsonpath.jsonpath(responseJson_get, "$..ott")[0]) == str

    response_post = requests.post(url=base_url + path, json=json.loads(
        '{"data": [{"contents_id": 1000, "score": 5},{"contents_id": 2000, "score": 7},{"contents_id": 3000, "score": 9},{"contents_id": 4000, "score": 3},{"contents_id": 5000, "score": 1},{"contents_id": 6000, "is_picked": true},{"contents_id": 7000, "is_picked": true},{"contents_id": 8000, "is_picked": true},{"contents_id": 9000, "is_picked": true}]}'))
    responseJson_post = json.loads(response_post.text)
    assert response_post.status_code == 200
    assert type(jsonpath.jsonpath(responseJson_post, "$..ott")[0]) == str


def test_contents_list():
    path = "/contents/list"

    response_post = requests.post(url=base_url + path, json=json.loads(
        '{"genres": ["로맨스", "드라마", "SF"],"years": [1990, 2000, 2010, 2020],"page": 1}'))
    responseJson_post = json.loads(response_post.text)

    assert response_post.status_code == 200
    assert type(jsonpath.jsonpath(responseJson_post, "$.list")[0]) == list
    assert type(jsonpath.jsonpath(responseJson_post, "$..key")[0]) == int
    assert type(jsonpath.jsonpath(responseJson_post, "$..info")[0]) == list
    assert type(jsonpath.jsonpath(responseJson_post, "$..info[0]")[0]) == str


def test_contents_detail():
    id = 1
    path = f'/contents/detail/{id}'

    response_get = requests.get(base_url + path)
    responseJson_get = json.loads(response_get.text)

    assert response_get.status_code == 200
    assert type(jsonpath.jsonpath(responseJson_get, "$.genre")[0]) == list
    assert type(jsonpath.jsonpath(responseJson_get, "$.actor")[0]) == list


def test_contents_search():
    query = '스파이더맨'
    type_ = 'title'
    path = f'/contents/search?q={query}&type={type_}'

    response_get = requests.get(base_url + path)
    responseJson_get = json.loads(response_get.text)

    assert response_get.status_code == 200
    assert type(jsonpath.jsonpath(responseJson_get, "$.contents")[0]) == list
    assert type(jsonpath.jsonpath(responseJson_get, "$.q")[0]) == str
    assert type(jsonpath.jsonpath(responseJson_get, "$.type")[0]) == str
    assert type(jsonpath.jsonpath(
        responseJson_get, "$.contents..key")[0]) == int
    assert type(jsonpath.jsonpath(
        responseJson_get, "$.contents..info")[0]) == list
    assert type(jsonpath.jsonpath(
        responseJson_get, "$.contents..ott")[0]) == list


test_db_url = 'mysql+pymysql://root:1234@localhost:3306/test_db'

test_config = {
    'DB_URL': 'mysql+pymysql://root:password@db_mysql/BlackPizza',
    # 'DB_URL': test_db_url,
}
app = create_app(test_config)
db.init_app(app)
migrate = Migrate(app, db)


def test_user():

    name = 'tester'
    email = 'tester@tester.com'

    with app.test_client() as c:
        base_url = "localhost:5000/api"
        # base_url = "/api"

        # 회원가입
        path = '/user/signup'
        response_post = c.post(
            base_url + path, json={"name": f"{name}", "email": f"{email}", "password": "test@1234", "password2": "test@1234"})
        responseJson_post = response_post.get_json()
        assert response_post.status_code == 200
        assert jsonpath.jsonpath(responseJson_post, "$.result")[0] == 'success'
        assert jsonpath.jsonpath(responseJson_post, "$.msg")[
            0] == '회원가입이 완료되었습니다.'

        # 로그인
        path = '/user/signin'
        response_post = c.post(
            base_url + path, json={"email": f"{email}", "password": "test@1234"})
        responseJson_post = response_post.get_json()

        assert response_post.status_code == 200
        assert jsonpath.jsonpath(responseJson_post, "$.result")[0] == 'success'
        assert jsonpath.jsonpath(responseJson_post, "$.msg")[
            0] == '로그인에 성공하였습니다.'
        assert 'Set-Cookie' in response_post.headers
        assert 'session=' in response_post.headers['Set-Cookie']
        assert session['email'] == email

        # 로그인 됐는지 확인
        path = '/user/isSignin'
        response_get = c.get(base_url + path)
        responseJson_get = response_get.get_json()
        assert response_get.status_code == 200
        assert session['email'] == email

        # 로그아웃
        path = '/user/signout'
        response_get = c.get(base_url + path)
        responseJson_get = response_get.get_json()
        assert response_get.status_code == 200
        assert jsonpath.jsonpath(responseJson_get, "$.result")[0] == 'success'

        # test db 삭제
        path = '/user/delete'
        response_post = c.post(base_url + path, json={"email": f"{email}"})
        responseJson_post = response_post.get_json()
        assert response_post.status_code == 200
        assert jsonpath.jsonpath(responseJson_post, "$.result")[0] == 'success'
