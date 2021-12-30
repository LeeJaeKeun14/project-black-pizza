import pytest
import requests
import json
import jsonpath


base_url = "http://localhost:8000/api"


def test_contents_recommend():
    path = "/contents/recommend"

    response_get = requests.get(base_url + path)
    responseJson_get = json.loads(response_get.text)
    assert response_get.status_code == 200
    assert type(jsonpath.jsonpath(responseJson_get, "$..ott")[0]) == str

    response_post = requests.post(url = base_url + path, json=json.loads('{"data": [{"contents_id": 1000, "score": 5},{"contents_id": 2000, "score": 7},{"contents_id": 3000, "score": 9},{"contents_id": 4000, "score": 3},{"contents_id": 5000, "score": 1},{"contents_id": 6000, "is_picked": true},{"contents_id": 7000, "is_picked": true},{"contents_id": 8000, "is_picked": true},{"contents_id": 9000, "is_picked": true}]}'))
    responseJson_post = json.loads(response_post.text)
    assert response_post.status_code == 200
    assert type(jsonpath.jsonpath(responseJson_post, "$..ott")[0]) == str
    
    
    