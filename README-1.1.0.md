# Blackpizza OTT 서비스

> 다양해진 OTT 플랫폼 사이에서 나에게 딱 맞는 플랫폼은 어떻게 찾을까?  
> [**나만의 맞춤 콘텐츠와 OTT 추천 받으러 가기!**](http://elice-blackpizza.koreacentral.cloudapp.azure.com/)  
> [발표 자료](./OTT서비스_1팀_최종-발표.pdf)

## 기술 스택

| 파트       | 주요 스택 및 라이브러리                    |
| ---------- | ------------------------------------------ |
| 프론트엔드 | `JavaScript` `React` `Recoil` `ReactQuery` |
| 백엔드     | `Python` `Flask` `MySQL` `Docker`          |
| 데이터분석 | `Python` `Pandas` `Selenium` `Sklearn`     |

## 배포 (~2022. 2. 19.)

http://elice-blackpizza.koreacentral.cloudapp.azure.com/

## 로컬에서 실행하기

### 깃 레포 클론

`git clone https://kdt-gitlab.elice.io/003-part3-ottservice/team1/blackpizza.git`

### ui_upgrade branch 가져오기

`git remote update`  
`git checkout -t origin/ui_upgrade`

### 레포로 들어가기

`cd blackpizza`

### 리엑트 서드파티모듈 설치

`cd front && npm install && cd ..`

### docker-compose 실행

`docker-compose up -d`

- -d 옵션: 백그라운드 실행

### back서버에 접속하기(초기 데이터베이스 설정 목적)

`docker exec -it blackpizza_back_1 /bin/bash`

### 초기 데이터베이스에 값 넣기

`flask db upgrade`

- 위 명령어가 오류나면 아직 DB의 실행이 덜 끝나서 그러니, 잠시 뒤 한번 더 입력해주시면 됩니다.
- 위 명령어는 최초 1회만 실행해주시고, 이후에는 자동으로 db_mysql/data 폴더 내 자료가 저장됩니다.

### 데이터베이스에 값 삭제하기

`flask db downgrade`

- 위 명령어 한번 실행에 바로 직전 migration 하나가 취소됩니다.

### 웹페이지 접속해서 확인하기(80번 포트)

- localhost:80 에 접속해서 서비스 실행되는지 확인

### 서버 종료 하기

`docker-compose down`

### 서버 삭제 하기

`docker rmi blackpizza_db_mysql blackpizza_front blackpizza_back blackpizza_thumbnail`

- 서버를 종료해야 삭제가 가능합니다.

## UI 개선 스터디

### 1. 📱 반응형으로 개선

- 헤더의 네비게이션 바를 모바일 화면에서 사용할 시에는 토글 버튼을 사용하여 볼 수 있도록 개선

### 2. 🖼  이미지 로딩 스켈레톤 추가

- 이미지 로드시 이미지를 로드 중이라는 것을 사용자에게 알려주기 위해 로딩 스켈레톤 추가
- my page와 survey result 페이지에는 css 애니메이션을 사용하여 로딩 표시
- survey 페이지의 콘텐츠 포스터에는 콘텐츠 제목을 보여 줌으로써 로딩 표시

### 3. 🪄 프로젝트 소개 페이지 개선

- aos라이브러리 사용하여 에니메이션 효과 추가

### 4. 📜 디테일 페이지 모달창으로 변경

- 메인페이지에서 인기 콘텐츠나 검색한 콘텐츠의 자세한 내용을 보여 주는 부분을 배너와 같은 위치에 보여주고 있었지만 배경으로 사용할 스틸이미지 등이 없어 모달창으로 UI를 변경

### 5. ❗️ 버튼, 스크롤 등 사용시 불편한점 개선

- survey 페이지에서 2개로 위치해고 있는 버튼을 1개로 통합
- survey 페이지에서 스크롤을 내리며 콘텐츠를 선택한 후 다음 단계로 가는 버튼을 누르려면 스크롤을 다시 올려야하는 문제가 있어 버튼과 진행바를 고정시켜 UX개선

### 6. 🎨 추천 결과 UI

- 추천 콘텐츠를 보여주는 부분에서 아이템의 길이가 모두 달라서 중간에 빈부분이 있었는데 이 부분을 개선하기 위해 핀터레스트 스타일 레이아웃을 구현

### 7. 📬 소셜 로그인기능 추가

- kakao로그인 기능 추가

## 버전

1.1.0-release
