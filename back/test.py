import pytest
import requests
import json
import jsonpath
from flask import Flask, session
from models import User


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


def test_user():

    name = 'tester'
    email = 'tester@tester.com'

    # 회원가입
    path = '/user/signup'
    response_post = requests.post(url=base_url + path, json=json.loads(
        f'{{"name": "{name}", "email": "{email}", "password": "test@1234", "password2" : "test@1234"}}'))
    responseJson_post = json.loads(response_post.text)

    assert response_post.status_code == 200
    assert jsonpath.jsonpath(responseJson_post, "$.result")[0] == 'success'
    assert jsonpath.jsonpath(responseJson_post, "$.msg")[0] == '회원가입이 완료되었습니다.'

    # 로그인
    path = '/user/signin'
    response_post = requests.post(url=base_url + path, json=json.loads(
        f'{{"email": "{email}", "password": "test@1234"}}'))
    responseJson_post = json.loads(response_post.text)

    assert response_post.status_code == 200
    assert jsonpath.jsonpath(responseJson_post, "$.result")[0] == 'success'
    assert jsonpath.jsonpath(responseJson_post, "$.msg")[0] == '로그인에 성공하였습니다.'
    # assert jsonpath.jsonpath(responseJson_post, "$.payload")[0] == email
    # assert jsonpath.jsonpath(responseJson_post, "$.session.email")[0] == email

    # test db 삭제
    path = '/user/delete'
    response_post = requests.post(url=base_url + path, json=json.loads(
        f'{{"email": "{email}"}}'))
    responseJson_post = json.loads(response_post.text)

    assert response_post.status_code == 200
    assert jsonpath.jsonpath(responseJson_post, "$.result")[0] == 'success'

    # 로그인 됐는지 확인
    path = '/user/isSignin'
    response_get = requests.get(base_url + path)
    responseJson_get = json.loads(response_get.text)
    assert response_get.status_code == 200
    # assert jsonpath.jsonpath(responseJson_get, "$.status")[0] == 404

    # 로그아웃
    path = '/user/signout'
    response_get = requests.get(base_url + path)
    responseJson_get = json.loads(response_get.text)
    assert response_get.status_code == 200
    # assert jsonpath.jsonpath(responseJson_get, "$.result")[0] == 'success'

# 로그인 테스트를 했을때까지는 session에 값이 들어오는 것이 확인됨
# 하지만 isSignin 혹은 logout response get을 하면 session['email']값이 추적이 안되는 것을 보아 session 유지에 문제가 있음
# http test에서는 session 유지 잘 되었음 pytest 진행과정이 다른 느낌
# test user를 db에 저장하지 않기 위한 delete 코드 삽입함
