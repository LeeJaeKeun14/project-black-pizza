from flask import Blueprint, request, redirect, session, jsonify
from werkzeug.security import generate_password_hash

from models import User
from db_connect import db

from key.kakao_client import CLIENT_ID, REDIRECT_URI, SIGNOUT_REDIRECT_URI
from api.kakao_controller import Oauth

kakao = Blueprint("kakao", __name__, url_prefix="/oauth/kakao")


@kakao.route('/')
def kakao_sign_in():
    # 카카오톡으로 로그인 버튼을 눌렀을 때
    kakao_oauth_url = f"https://kauth.kakao.com/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&response_type=code"
    return redirect(kakao_oauth_url)


@kakao.route('/callback')
def callback():
    code = request.args["code"]

    # 전달받은 authorization code를 통해서
    # access_token, refresh_token을 발급
    oauth = Oauth()
    auth_info = oauth.auth(code)

    # error 발생 시 로그인 페이지로 redirect
    if "error" in auth_info:
        print("에러가 발생했습니다.")
        return {'message': '인증 실패'}, 404

    # 아닐 시
    user = oauth.userinfo("Bearer " + auth_info['access_token'])

    print(user)
    kakao_account = user["kakao_account"]
    profile = kakao_account["profile"]
    name = profile["nickname"]
    if "email" in kakao_account.keys():
        email = kakao_account["email"]
    else:
        email = f"{name}@kakao.com"

    user = User.query.filter(User.name == name).first()

    if user is None:
        # 유저 테이블에 추가
        user = User(name, email, generate_password_hash(name))
        db.session.add(user)
        db.session.commit()

        # message = '회원가입이 완료되었습니다.'
        # value = {"status": 200, "result": "success", "msg": message}

    session['email'] = user.email
    session['isKakao'] = True
    # message = '로그인에 성공하였습니다.'
    # value = {"status": 200, "result": "success", "msg": message}

    return redirect("http://localhost")


@kakao.route('/signout')
def kakao_sign_out():
    # 카카오톡으로 로그아웃 버튼을 눌렀을 때
    kakao_oauth_url = f"https://kauth.kakao.com/oauth/logout?client_id={CLIENT_ID}&logout_redirect_uri={SIGNOUT_REDIRECT_URI}"

    if session.get('email'):
        session.clear()
        value = {"status": 200, "result": "success"}
    else:
        value = {"status": 404, "result": "fail"}
    print(value)
    return redirect(kakao_oauth_url)
