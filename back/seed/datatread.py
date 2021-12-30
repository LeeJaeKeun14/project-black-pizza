import pandas as pd
from parse import compile

#데이터 pandas로 불러오기
df = pd.read_csv('./seed/total_data.csv')
df2 = pd.read_csv('./seed/genre_sim_matrix.csv')

#데이터 전처리
    #데이터 parse를 위한 compiler 생성
p_score = compile("[{}]")
p_runtime = compile("{}시간 {}분")
p_runtime2 = compile("{}분")
p_director = compile("[{}]")
    #데이터 parse
df['개봉일'] = df['개봉일'].apply(lambda x: int(x))
# df['평점'] = df['평점'].apply(lambda x: float(p_score.parse(x)[0].split(",")[0].replace("'", "").replace("%", ""))/10 if pd.notnull(x) else x)
df['재생 시간'] = df['재생 시간'].apply(lambda x: (p_runtime.parse(x)[0]+":"+p_runtime.parse(x)[1] if p_runtime.parse(x) is not None else "0:"+p_runtime2.parse(x)[0]) if pd.notnull(x) else x)
df['감독'] = df['감독'].apply(lambda x: p_director.parse(x)[0].split(",")[0].replace("'", "") if pd.notnull(x) else x)
    #NaN 값을 None으로 변경
df = df.where((pd.notnull(df)), None)

#시드데이터 생성
def seed_maker():
    # return 값 초기 설정
    contents = []
    contents_genre = []
    contents_actor = []
    contents_streaming = []
    contents_buy = []
    contents_rent = []

    for i, line in df.iterrows():
        contents_id = i+1
        #contens 데이터 생성
        content = {}
        content["title"] = line['제목'] if pd.notnull(line['제목']) else None
        content["origin_title"] = line['원제'] if pd.notnull(line['원제']) else None
        content["open_year"] = line['개봉일'] if pd.notnull(line['개봉일']) else None
        content["score"] = float(line['평점']) if pd.notnull(line['평점']) else None
        content["rate_count"] = int(line['평가수']) if pd.notnull(line['평가수']) else None
        content["runtime"] = line['재생 시간'] if pd.notnull(['재생 시간']) else None
        content["director"] = line['감독'] if pd.notnull(line['감독']) else None
        content["synopsis"] = line['시놉시스'] if pd.notnull(line['시놉시스']) else None
        content["image"] = line['이미지'] if pd.notnull(line['이미지']) else None
        content["isMovie"] = True if line['종류'] == '영화' else False
        contents.append(content)
        
        #contents_genre 데이터 생성
        if line['장르'] != None:
            p_genre = compile("[{}]")
            genre = p_genre.parse(line['장르'])[0].replace("'", "").split(",")
            for gnr in genre:
                new_row = {}
                new_row['contents_id'] = contents_id
                new_row['genre'] = gnr
                contents_genre.append(new_row)
        
        #contents_actor 데이터 생성
        if line['출연진'] != None:
            p_actor = compile("[{}]")
            actors = p_actor.parse(line['출연진'])[0].replace("'", "").split(",")
            actor_count = 0
            for act in actors:
                if actor_count >= 5:
                    break
                new_row = {}
                new_row['contents_id'] = contents_id
                new_row['actor'] = act
                contents_actor.append(new_row)
                actor_count += 1
        #contents_streaming 데이터 생성
        if line['스트리밍'] != None:
            strm = eval(line['스트리밍'])
            otts_stream = strm.keys()
            for ott in otts_stream:
                new_ott = {}
                new_ott['contents_id'] = contents_id
                new_ott['ott'] = ott
                new_ott['price'] = strm[ott][0]
                if len(strm[ott]) == 2:
                    new_ott['quality'] = strm[ott][1]
                else:
                    new_ott['quality'] = None
                contents_streaming.append(new_ott)    

        #contents_buy 데이터 생성
        if line['구매'] != None:
            buy_list = eval(line['구매'])
            otts_buy = buy_list.keys()
            for ott in otts_buy:
                new_ott = {}
                new_ott['contents_id'] = contents_id
                new_ott['ott'] = ott
                new_ott['price'] = int(buy_list[ott][0].replace("₩", "").replace(',', ''))
                if len(buy_list[ott]) == 2:
                    new_ott['quality'] = buy_list[ott][1]
                else:
                    new_ott['quality'] = None
                contents_buy.append(new_ott) 

        #contents_rent 데이터 생성
        if line['대여'] != None:
            rent_list = eval(line['대여'])
            otts_rent = rent_list.keys()
            for ott in otts_rent:
                new_ott = {}
                new_ott['contents_id'] = contents_id
                new_ott['ott'] = ott
                new_ott['price'] = int(rent_list[ott][0].replace("₩", "").replace(',', ''))
                if len(rent_list[ott]) == 2:
                    new_ott['quality'] = rent_list[ott][1]
                else:
                    new_ott['quality'] = None
                contents_rent.append(new_ott) 

    return contents, contents_genre, contents_actor, contents_streaming, contents_buy, contents_rent


def matrix_maker():
    matrix = []

    for i, line in df2.iterrows():
        row = {}
        row['contents_id'] = i+1
        for j in range(1, 21):
            key = f"top{j}"
            row[key] = int(line[j])
        matrix.append(row)
    
    return matrix