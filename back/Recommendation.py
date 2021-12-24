import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

## 데이터 읽기

def read_df():
    df = pd.read_csv("temp_movie_data.csv")

    df["장르"][df["장르"].isna()] = "['']"  # 이후에는 제거
    df["장르"] = df["장르"].apply(lambda x: eval(x))
    df["장르"] = df["장르"].apply(lambda x : (' ').join(x))

    isna_index = df["평점"].isna()
    df["평점"][isna_index] = "['']"
    df["평점"] = df["평점"].apply(lambda x : eval(x))

    def print_ls_1(x):
        if len(x) == 1:
            return 0
        else:
            return x[1].split()[0]
        
    def print_ls_2(x):
        if len(x) == 1:
            return "0k"
        else:
            try:
                return x[1].split()[1].strip("()")
            except:
                return "0k"
            
    df["평가수"] = df["평점"].apply(print_ls_2)
    df["평점"] = df["평점"].apply(print_ls_1)
    df["평가수"] = df["평가수"].apply(lambda x: str(int(x[:-1]) * 1000) if x[-1] == "m" else x[:-1])
    df["평점"] = df["평점"].astype("float")
    df["평가수"] = df["평가수"].astype("int")

    C = df["평점"].mean()
    m = df["평가수"].quantile(0.6)

    def weighted_vote_average(record):
        v = record["평가수"]
        R = record["평점"]
        
        return ((v/(v+m)) * R) + ((m/(m+v)) * C)
    df["가중치평점"] = df.apply(weighted_vote_average, axis=1)

    not_index = df["감독"].notna()
    df["감독"][not_index] = df["감독"][not_index].apply(lambda x: x.strip("['']"))
    df["감독"][not_index] = df["감독"][not_index].apply(lambda x : x.split(" , "))

    def sum_list(x):
        ls = []
        for i in x[:5]:
            ls.append("_".join(i.split(" ")))
        return " ".join(ls)

    df["감독"][df["감독"].isna()] = "['']"
    # df["감독"] = df["감독"].apply(lambda x: eval(x))
    df["감독"] = df["감독"].apply(sum_list)

    df["출연진"][df["출연진"].isna()] = "['']"
    df["출연진"] = df["출연진"].apply(lambda x: eval(x))
    df["출연진"] = df["출연진"].apply(sum_list)

    df["특징"] = df["장르"] + " " + df["감독"] + " " + df["출연진"]
    return df

def recommendations(titles, top_n = 20):

    df = read_df()
    # title_list = ["나 홀로 집에", "해리 포터와 마법사의 돌", "쇼생크 탈출"]
    title_list = titles
    sum_find = " ".join(list(df[df["제목"].apply(lambda x : x in title_list)]["특징"]))

    title_indexes = []
    for title_name in title_list:
        title_movie = df[df["제목"] == title_name]
        title_indexes += list(title_movie.index.values)

    count_vect = CountVectorizer(min_df=0, ngram_range=(1, 2))
    genre_mat = count_vect.fit_transform(list(df["특징"]) + [sum_find])
    genre_sim = cosine_similarity(genre_mat, genre_mat)
    genre_sim_sorted_ind = genre_sim.argsort()[:, ::-1]
    
    last_index = len(df)
    similar_indexes = genre_sim_sorted_ind[last_index, :(top_n * 2)]
    similar_indexes = similar_indexes.reshape(-1)
    similar_indexes = similar_indexes[similar_indexes != last_index]  # 타이틀 기준 제거
    for i in title_indexes:
        similar_indexes = similar_indexes[similar_indexes != i]  # 타이틀 기준 제거
    similar_indexes
    
    return df.iloc[similar_indexes].sort_values("가중치평점", ascending=False)[:top_n]