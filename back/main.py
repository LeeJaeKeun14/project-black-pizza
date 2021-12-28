from flask import Flask
from flask_migrate import Migrate
from models import User
from db_connect import db
from api.contents import contents
from api.user import user

app = Flask(__name__)
app.register_blueprint(contents)
app.register_blueprint(user)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@db_mysql/BlackPizza'
# os.urandom(16)
app.config['SECRET_KEY'] = b'\x0c\xe6\xe8\x86\xc5\xec\xfb\xfd\xb7\x9cN=\x10M\x0fg'
db.init_app(app)
migrate = Migrate(app, db)


@app.route('/')
def welcome():
    message = "내가 가장 좋아하는 음식은 검정피자"
    return message


@app.route('/api')
def lucyIsBack():
    name = db.session.query(User).filter(User.username == '검정피자').all()
    k = name[0]
    print(name)
    return str(k.username)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
