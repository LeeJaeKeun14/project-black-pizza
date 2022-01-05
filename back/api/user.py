from flask import Blueprint, request, session, jsonify
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

import re

from models import User
from db_connect import db

user = Blueprint("user", __name__, url_prefix="/api/user")


@user.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        params = request.get_json()
        name = params['name']
        email = params['email']
        password = params['password']
        password2 = params['password2']

        message = None

        check_email = re.compile(
            '^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
        check_name = re.compile('^[가-힣a-zA-Z]+$')
        check_pw1 = re.compile(
            '^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[~!@#$%^&*+=-]).{8,100}$')
        check_pw2 = re.compile('^[a-zA-Z\d]{10,100}$')
        check_pw3 = re.compile('^[a-zA-Z~!@#$%^&*]{10,100}$')
        check_pw4 = re.compile('^[\d~!@#$%^&*]{10,100}$')

        if name is None or check_name.match(name) is None:
            message = '이름이 유효하지 않습니다.'
        elif email is None or check_email.match(email) is None:
            message = '아이디가 유효하지 않습니다.'
        elif password is None or (check_pw1.match(password) or check_pw2.match(password) or check_pw3.match(password) or check_pw4.match(password)) is None:
            message = '비밀번호는 영문/숫자/특수문자(~!@#$%^&*) 3개 조합 8자리 혹은 2개 조합 10자리 이상으로 입력해주세요.'
        elif password != password2:
            message = '비밀번호를 다시 확인해주십시오.'
        else:
            user = User.query.filter(User.email == email).first()
            if user is not None:
                message = f'{user.name} 계정은 이미 등록된 계정입니다.'

        if message is None:
            # 유저 테이블에 추가
            user = User(name, email, generate_password_hash(password))
            db.session.add(user)
            db.session.commit()

            message = '회원가입이 완료되었습니다.'
            value = {"status": 200, "result": "success", "msg": message}
        else:
            value = {"status": 404, "result": "fail", "msg": message}
    return jsonify(value)


@user.route('/signin', methods=['POST'])
def signin():
    if request.method == 'POST':
        params = request.get_json()
        email = params['email']
        password = params['password']
        message = None

        user = User.query.filter(User.email == email).first()
        if user is None:
            message = '등록되지 않은 계정입니다.'
        elif not check_password_hash(user.password, password):
            message = '비밀번호가 틀렸습니다.'
        elif len(password) < 8:
            message = '비밀번호가 8자리 이상이어야 합니다.'

        if message is None:
            # session.clear()
            session['email'] = user.email
            message = '로그인에 성공하였습니다.'
            value = {"status": 200, "result": "success",
                     "msg": message}
        else:
            value = {"status": 404, "result": "fail", "msg": message}

    return jsonify(value)


@user.route('/signout', methods=['GET'])
def signout():
    if session.get('email'):
        session.pop('email')
        value = {"status": 200, "result": "success"}
    else:
        value = {"status": 404, "result": "fail"}
    return jsonify(value)


@user.route('/isSignin', methods=['GET'])
def isLogin():
    if session.get('email'):
        email = session['email']
        value = {"status": 200, "result": "success",
                 "payload": email}
    else:
        value = {"status": 404, "result": "fail"}
    return jsonify(value)


@user.route('/delete', methods=['POST'])
def delete():
    if request.method == 'POST':
        params = request.get_json()
        email = params['email']

        User.query.filter(User.email == email).delete()
        db.session.commit()

        value = {"status": 200, "result": "success"}
        return jsonify(value)
