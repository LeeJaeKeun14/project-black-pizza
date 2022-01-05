import jsonpath
from flask import session
from main import create_app
from flask_migrate import Migrate
from db_connect import db
import config

TEST_CONFIG = {
    # 'DB_URL': 'mysql+pymysql://root:password@db_mysql/BlackPizza',
    'DB_URL': config.TEST_DB_URL,
}
app = create_app(TEST_CONFIG)
db.init_app(app)
migrate = Migrate(app, db)


def test_user():

    name = 'tester'
    email = 'tester@tester.com'

    with app.test_client() as c:
        base_url = "/api"

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
        # assert jsonpath.jsonpath(responseJson_post, "$.payload")[0] == email
        # assert jsonpath.jsonpath(responseJson_post, "$.session.email")[0] == email

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
