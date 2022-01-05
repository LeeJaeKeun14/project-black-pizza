DB = {
    'host': 'localhost',
    'user': 'root',
    'pass': '1234',
    'db': 'test_db'
}

TEST_DB = 'test'

TEST_DB_URL = f'mysql+pymysql://{DB["user"]}:{DB["pass"]}@{DB["host"]}/{TEST_DB}?charset=utf8mb4'

# 초기 table 생성 필요
# test.sql 참고
