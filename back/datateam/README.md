# 추천 알고리즘

- 데이터 분석 포지션 팀원

|  이름  |     이메일         |
| :---:  |    :---:           |
| 이재근 | ljkean14@gmail.com |
| 전현호 | sush0506@naver.com |

***

- [추천 알고리즘](#추천-알고리즘)
  - [코로나 데이터 분석](#코로나-데이터-분석)
  - [사용 데이터](#사용-데이터)
    - [데이터 수집](#데이터-수집)
    - [데이터 전처리](#데이터-전처리)
  - [알고리즘](#알고리즘)
    - [텍스트 전처리](#텍스트-전처리)
    - [TfidfVectorizer](#tfidfvectorizer)
    - [cosine similarity](#cosine-similarity)
    - [가중치 평점](#가중치-평점)
  - [알고리즘 버전](#알고리즘-버전)

***

## 코로나 데이터 분석

## 사용 데이터

- 데이터 : total_data.csv
  - shape : (19144, 15)
  - columns : '제목', '원제', '개봉일', '스트리밍', '대여', '구매', '평점', '평가수', '장르', '종류', '재생 시간', '감독', '출연진', '시놉시스', '이미지'

### 데이터 수집

- Selenium

    <img src="./img/selenium.png" style="width:160px;" />

- [Just Watch](https://www.justwatch.com/kr)에서 selenium을 사용하여 수집
  - 영화, TV프로그램의 형식이 달라 각각의 방식으로 데이터 수집

### 데이터 전처리

- 결측값 제거

## 알고리즘

- 추천 알고리즘
  - 특징 : 장르(액션, 드라마, ...), 종류(영화, TV프로그램), 감독, 출연진, 시놉시스
  - 특징을 Vectorizer를 사용하여 단어의 빈도를 계산하고 cosine_similarity를 사용하여 백터간 거리를 계산
  - TfidfVectorizer : 단순 빈도계산인 Counter Vectorizer와 다르게 관사나, 의미없이 많이 사용되는 단어의 페널티를 주는 TF-IDF 기법을 사용하는 Vectorizer 이다.
  - cosine_similarity : 특징A 특징B의 각도를 계산하여, 특징의 방향이 유사한지를 계산 할 수 있는 유사도 계산식 이다.
  - 추천 우선도 : 평가자수와 평점의 모두 영향을 받는 가중치 평점을 사용하여 우선도를 결정하였다.

### 텍스트 전처리

- 시놉시스의 특수문자들을 제거하고, 형태소 형식으로 말뭉치를 만들어 반환.

### TfidfVectorizer

- $TF-IDF \; = \; TF(t, d) \times IDF(t)$
  - TF-IDF : 단어 빈도-역 문서 빈도 (Term Frequency-Inverse Document Frequency)
  - TF(t, d) : Term Frequency
    - 특정 문서 d에서 특정 단어 t 등장 횟수
  - DF(t) : Document Frequency
    - 특정 단어 t가 등장한 문서의 수
  - IDF(t) : Inverse Document Frequency
    - N / DF
    - $\log \frac{n}{DF(d, t) + 1}$
  - t : term(word)
  - d : document(set of words)
  - N : 말뭉치의 수

### cosine similarity

### 가중치 평점

## 알고리즘 버전

- 0.0.1
