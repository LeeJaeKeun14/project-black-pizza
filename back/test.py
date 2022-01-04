import pytest
import requests
import json
import jsonpath
from main import create_app
from flask_migrate import Migrate
from db_connect import db
from flask import session
import config
from sqlalchemy import create_engine, text

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


# user test

def db_file(db, filename):
    sql_lines = []
    with open(filename, 'r') as file_data:
        # .sql를 주석을 제외하고 라인별로 분류
        sql_lines = [line.strip('\n') for line in file_data if not line.startswith(
            '--') and line.strip('\n')]

        with db.connect() as conn:
            sql_command = ''
            for line in sql_lines:
                sql_command += line
                # ; 나오면 execute
                if sql_command.endswith(';'):
                    try:
                        conn.execute(text(sql_command))
                    except Exception as e:
                        print('Fail DB Reset!!')
                        print(e)
                        return False
                    finally:
                        sql_command = ''
    return True


TEST_CONFIG = {
    # 'DB_URL': 'mysql+pymysql://root:password@db_mysql/BlackPizza',
    'DB_URL': config.TEST_DB_URL,
}


@pytest.fixture(scope='session')  # 테스트 실행시 한번만 실행
def app():
    app = create_app(TEST_CONFIG)
    db.init_app(app)
    return app


@pytest.fixture(scope='session')
def db_():
    db = create_engine(TEST_CONFIG['DB_URL'], encoding='utf-8', max_overflow=0)
    return db


@pytest.fixture  # 매 테스트 실행 마다 실행
def client(app, db_):
    db_file(db_, 'test.sql')
    client = app.test_client()
    return client


def test_user(client):

    name = 'tester'
    email = 'tester@tester.com'

    # base_url = "localhost:5000/api"
    base_url = "/api"

    with client as c:
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
