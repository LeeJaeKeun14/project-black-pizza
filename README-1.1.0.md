# Blackpizza OTT 서비스

> 다양해진 OTT 플랫폼 사이에서 나에게 딱 맞는 플랫폼은 어떻게 찾을까?  
> [**나만의 맞춤 콘텐츠와 OTT 추천 받으러 가기!**](http://elice-blackpizza.koreacentral.cloudapp.azure.com/)  
> [발표 자료](./OTT서비스_1팀_최종-발표.pdf)

## 기술 스택

| 파트       | 주요 스택 및 라이브러리                |
| ---------- | -------------------------------------- |
| 프론트엔드 | `JavaScript` `React`                   |
| 백엔드     | `Python` `Flask` `MySQL` `Docker`      |
| 데이터분석 | `Python` `Pandas` `Selenium` `Sklearn` |

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

## 버전

1.1.0-release
