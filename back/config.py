DB = {
    'host': 'localhost',
    'user': 'root',
    'pass': '',
    'db': 'test_db'
}

TEST_DB = 'test'

TEST_DB_URL = f'mysql+pymysql://{DB["user"]}:{DB["pass"]}@{DB["host"]}/{TEST_DB}?charset=utf8mb4'
