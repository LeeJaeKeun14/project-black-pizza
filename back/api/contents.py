from flask import Flask, jsonify, Blueprint, request, session
from models import User
from db_connect import db

contents = Blueprint('contents', __name__, url_prefix='/api/contents')

@contents.route('/list', methods=['GET'])
def list():
    # 여기 함수는 서우님께서 작성해주세요
    msg = "hello"
    return msg

@contents.route('/recommend', methods=['GET', 'POST'])
def recommend():
    name = db.session.query(User).filter(User.username=='검정피자').all()
    k = name[0]
    print(name)
    return str(k.username)
