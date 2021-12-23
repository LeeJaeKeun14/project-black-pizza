import pandas as pd

# df = pd.read_csv('/Users/whitewind/Desktop/elis/blackpizza/back/seed/temp_movie_data.csv')
df = pd.read_csv('./temp_movie_data.csv')
# print(df.head())

def seed_contents():
    contents = []
    for i, line in df.iterrows():
        # print(line)
        content = {}
        content["title"] = line['제목']
        content["orgin_title"] = line['원제']
        content["open"] = line['개봉일']
        content["score"] = line['평점'].split(" ")
        content["runtime"] = line['재생 시간']
        content["director"] = line['감독']
        content["synopsis"] = line['시놉시스']
        content["image"] = line['이미지']
        contents.append(content)
        break
    return contents

print(seed_contents())

def seed_contents_genre():
    contents_genre = []
    return contents_genre

def seed_actor():
    actor = []
    return actor

def seed_streaming():
    streaming = []
    return streaming

def seed_buy():
    buy = []
    return buy

def seed_rent():
    rent = []
    return rent