import pandas as pd
import numpy as np
import random as rd

def recommendations(user_pick, contents_all, genre_matrix):
    df = pd.DataFrame(contents_all, columns = ["id", "제목", "평점", "평가수"])

    C = df["평점"].mean()
    m = df["평가수"].quantile(0.6)
    def weighted_vote_average(record):
        v = record["평가수"]
        R = record["평점"]
        return ((v/(v+m)) * R) + ((m/(m+v)) * C)
    
    df["가중치평점"] = df.apply(weighted_vote_average, axis=1)

    indexes = []
    for pick in user_pick:
        indexes.append(df[df.id == pick].index[0])
        
    similar_indexes = np.array(genre_matrix)
    # 각 영화별 10개 추천
    first_recommends = []
    for index in indexes:
        first_recommends += list(similar_indexes[index,1:10])
    
    similar_indexes = similar_indexes[indexes,10:]
    similar_indexes_ls = list(similar_indexes.reshape(-1))
    similar_indexes = set(similar_indexes_ls)  # 중복된 영화들을 제거/ 가중치 부여 # ["마블", "마블", "대부", "배트맨"]
    
    similar_indexes = np.array(list(similar_indexes))
    for i in indexes:
        similar_indexes = similar_indexes[similar_indexes != i]  # 타이틀 기준 제거
    
    counter = {}
    for index in similar_indexes:
        counter[index] = similar_indexes_ls.count(index)
    
    result = df.iloc[similar_indexes]
    for k, v in counter.items():
        if v > 1:
            print(k, v)
            result["가중치평점"][k] += v*2
    
    second_recommends = list(result.sort_values("가중치평점", ascending=False)[:6].index)
    third_recommends = list(result.sort_values("가중치평점", ascending=False)[6:].index)
    
    total = []
    total += rd.sample(first_recommends, k=9)
    total += second_recommends
    total += rd.sample(third_recommends, k=5)

    return list(df.iloc[total]["id"])
