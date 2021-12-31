import pytest
import requests
import json
import jsonpath


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
    reponseJson_get = json.loads(response_get.text)

    assert response_get.status_code == 200
    assert type(jsonpath.jsonpath(reponseJson_get, "$.genre")[0]) == list
    assert type(jsonpath.jsonpath(reponseJson_get, "$.actor")[0]) == list


def test_contents_search():
    query = '스파이더맨'
    type_ = 'title'
    path = f'/contents/search?q={query}&type={type_}'

    response_get = requests.get(base_url + path)
    reponseJson_get = json.loads(response_get.text)

    assert response_get.status_code == 200
    assert type(jsonpath.jsonpath(reponseJson_get, "$.contents")[0]) == list
    assert type(jsonpath.jsonpath(reponseJson_get, "$.q")[0]) == str
    assert type(jsonpath.jsonpath(reponseJson_get, "$.type")[0]) == str
    assert type(jsonpath.jsonpath(
        reponseJson_get, "$.contents..key")[0]) == int
    assert type(jsonpath.jsonpath(
        reponseJson_get, "$.contents..info")[0]) == list
    assert type(jsonpath.jsonpath(
        reponseJson_get, "$.contents..ott")[0]) == list


'''
def test_user_signup():
    path = '/user/signup'
    name = 'tester'
    email = 'tester@tester.com'

    response_post = requests.post(url=base_url + path, json=json.loads(
        f'{{"name": "{name}", "email": "{email}", "password": "test@1234", "password2" : "test@1234"}}'))
    responseJson_post = json.loads(response_post.text)

    assert response_post.status_code == 200
    assert jsonpath.jsonpath(responseJson_post, "$.result")[0] == 'success'
    assert jsonpath.jsonpath(responseJson_post, "$.msg")[0] == '회원가입이 완료되었습니다'
'''


def test_user_signin():
    path = '/user/signin'

    email = 'tester@tester.com'
    response_post = requests.post(url=base_url + path, json=json.loads(
        f'{{"email": "{email}", "password": "test@1234"}}'))
    responseJson_post = json.loads(response_post.text)

    assert response_post.status_code == 200
    assert jsonpath.jsonpath(responseJson_post, "$.result")[0] == 'success'
    assert jsonpath.jsonpath(responseJson_post, "$.msg")[0] == '로그인에 성공하였습니다.'


def test_user_isSignin():
    path = '/user/isSignin'

    response_get = requests.get(base_url + path)
    responseJson_get = json.loads(response_get.text)

    assert response_get.status_code == 200
    assert jsonpath.jsonpath(responseJson_get, "$.result")[0] == 'success'
    assert type(jsonpath.jsonpath(responseJson_get, "$.payload")[0]) == str
    assert jsonpath.jsonpath(responseJson_get, "$.payload")[
        0] == jsonpath.jsonpath(responseJson_get, "$.session.email")[0]


def test_user_signout():
    path = '/user/signout'

    response_get = requests.get(base_url + path)
    responseJson_get = json.loads(response_get.text)

    assert response_get.status_code == 200
    assert jsonpath.jsonpath(responseJson_get, "$.result")[0] == 'success'
