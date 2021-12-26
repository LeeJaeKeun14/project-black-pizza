import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import time

def df_maker(contents_all, actors, genre):
    start = time.time()
    df = pd.DataFrame(contents_all)
    df_actors = pd.DataFrame(actors)
    df_genre = pd.DataFrame(genre)
    df.rename(columns={0:'id', 1:'제목', 2:'가중치평점', 3:'특징'}, inplace = True)
    df_actors.rename(columns={0:'contents_id', 1:'actor'}, inplace = True)
    df_genre.rename(columns={0:'contents_id', 1:'genre'}, inplace = True)
    df['특징'] = df['특징'].apply(lambda x: x.strip().replace(" ", "_") if pd.notnull(x) else x)
    df['가중치평점'][df['가중치평점'].isna()] = 0
    end = time.time()
    print(f'전처리 1단계 {end - start:.5f} sec')

    start2 = time.time()
    cur_cont_id_actor = 1
    actor_list = []
    for i, line in df_actors.iterrows():
        contents_id = line['contents_id']
        if cur_cont_id_actor == contents_id:
            actor = line['actor'].strip().replace(" ", "_")
            actor_list.append(actor)
        else:
            actor_str = " ".join(actor_list)
            df['특징'][df['id'] == cur_cont_id_actor] = df['특징'][df['id'] == cur_cont_id_actor].apply(lambda x: x + actor_str if pd.notnull(x) else actor_str)
            cur_cont_id_actor = contents_id
            actor_list.clear()
            actor = line['actor'].strip().replace(" ", "_")
            actor_list.append(actor)
    end2 = time.time()
    print(f'전처리 2단계 {end2 - start2:.5f} sec')

    start3 = time.time()
    cur_cont_id_genre = 1
    genre_list = []
    for i, line in df_genre.iterrows():
        contents_id = line['contents_id']
        if cur_cont_id_genre == contents_id:
            genre = line['genre']
            genre_list.append(genre)
        else:
            genre_str = " ".join(genre_list)
            df['특징'][df['id'] == cur_cont_id_genre] = df['특징'][df['id'] == cur_cont_id_genre].apply(lambda x: x + genre_str if pd.notnull(x) else genre_str)
            cur_cont_id_genre = contents_id
            genre_list.clear()
            genre = line['genre']
            genre_list.append(genre)
    end3 = time.time()
    print(f'전처리 3단계 {end3 - start3:.5f} sec')
    # print(df)
    
    return df


def recommendations2(user_pick, contents_all, actors, genre, top_n = 20):
    #DataFrame 만들기('평점', '특징')
    df = df_maker(contents_all, actors, genre)
    # return df
    # title_list = ["나 홀로 집에", "해리 포터와 마법사의 돌", "쇼생크 탈출"]

    title_list = user_pick
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