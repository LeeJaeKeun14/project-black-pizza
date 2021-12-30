import pandas as pd
import numpy as np
import time

def recommendations(user_pick, contents_all, genre_matrix, top_n = 20):
    df = pd.DataFrame(contents_all, columns = ["id", "제목", "평점", "평가수"])

    C = df["평점"].mean()
    m = df["평가수"].quantile(0.6)
    def weighted_vote_average(record):
        v = record["평가수"]
        R = record["평점"]
        return ((v/(v+m)) * R) + ((m/(m+v)) * C)
    
    df["가중치평점"] = df.apply(weighted_vote_average, axis=1)
    
    # title_list = ["나 홀로 집에", "해리 포터와 마법사의 돌", "쇼생크 탈출"]

    indexes = []
    for title in user_pick:
        indexes.append(df[df.제목 == title].index[0])
    
    similar_indexes = np.array(genre_matrix)[indexes, :]
    similar_indexes = similar_indexes.reshape(-1)
    similar_indexes = set(similar_indexes)
    similar_indexes = np.array(list(similar_indexes))
    for i in indexes:
        similar_indexes = similar_indexes[similar_indexes != i]  # 타이틀 기준 제거

    return df.iloc[similar_indexes].sort_values("가중치평점", ascending=False)[:top_n]
