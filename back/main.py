from flask import Flask
from flask_migrate import Migrate
from models import User
from db_connect import db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@db_mysql/BlackPizza'
db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def welcome():
    message = "내가 가장 좋아하는 음식은 검정피자"
    return message

@app.route('/api')
def lucyIsBack():
    name = db.session.query(User).filter(User.username=='검정피자').all()
    k = name[0]
    print(name)
    return str(k.username)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')