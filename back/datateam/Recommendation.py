import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import time

def df_maker(contents_all, actors, genre):
    df = pd.DataFrame(contents_all)
    df_actors = pd.DataFrame(actors)
    df_genre = pd.DataFrame(genre)
    df.rename(columns={0:'id', 1:'제목', 2:'가중치평점', 3:'감독'}, inplace = True)
    df_actors.rename(columns={0:'contents_id', 1:'actor'}, inplace = True)
    df_genre.rename(columns={0:'contents_id', 1:'genre'}, inplace = True)
    df['감독'] = df['감독'].apply(lambda x: x.strip().replace(" ", "_") if pd.notnull(x) else x)
    # df['가중치평점'][df['가중치평점'].isna()] = 0
    df['가중치평점'].apply(lambda x: 0 if pd.isnull(x) else x)

    actor_dict = {}
    for i, line in df_actors.iterrows():
        contents_id = line['contents_id']
        actor = line['actor'].strip().replace(" ", "_")
        actor_dict[contents_id] = (actor_dict[contents_id] + " " + actor) if contents_id in actor_dict else actor
    df_new_actors = pd.DataFrame.from_dict(actor_dict, orient='index', columns=['actor'])
    df_new_actors['contents_id'] = df_new_actors.index

    genre_dict = {}
    for i, line in df_genre.iterrows():
        contents_id = line['contents_id']
        genre = line['genre'].strip()
        genre_dict[contents_id] = (genre_dict[contents_id] + " " + genre) if contents_id in genre_dict else genre
    df_new_genre = pd.DataFrame.from_dict(genre_dict, orient='index', columns=['genre'])
    df_new_genre['contents_id'] = df_new_genre.index

    new_df_act = pd.merge(df, df_new_actors, left_on="id", right_on="contents_id", how="left")
    new_df_gnr = pd.merge(new_df_act, df_new_genre, left_on="id", right_on="contents_id", how="left")
    new_df_gnr.iloc[:, 3:].fillna("")
    # print(new_df_gnr['genre'])
    new_df_gnr['특징'] = new_df_gnr['genre'] + " " + new_df_gnr['감독'] + " " + new_df_gnr['actor']
    
    return new_df_gnr


def recommendations(user_pick, contents_all, actors, genre, top_n = 20):
    df = df_maker(contents_all, actors, genre)
    # title_list = ["나 홀로 집에", "해리 포터와 마법사의 돌", "쇼생크 탈출"]

    title_list = user_pick
    print(list(df[df["제목"].apply(lambda x : x in title_list)]["특징"]))
    sum_find = " ".join(list(df[df["제목"].apply(lambda x : x in title_list)]["특징"]))

    title_indexes = []
    for title_name in title_list:
        title_movie = df[df["제목"] == title_name]
        title_indexes += list(title_movie.index.values)

    count_vect = CountVectorizer(min_df=0, ngram_range=(1, 2))
    # genre_mat = count_vect.fit_transform(list(df["특징"]) + [sum_find])
    genre_mat = count_vect.fit_transform(list(df["특징"].values.astype('U')) + [sum_find])
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