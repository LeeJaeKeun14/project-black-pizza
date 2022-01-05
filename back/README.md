# Backend README file

## 목차

1. [Docker](#Docker)
2. [DB](#DB)
3. [API](#API)
4. [Test Code](#Test-Code)

---

## Docker

### Docker 개념

> 리눅스의 응용 프로그램들을 프로세서 격리 기술들을 사용해 컨테이너로 실행하고 관리하는 오픈 소스 프로젝트이다.

- **이미지**: 각 요소들이 설치된 모습을 '이미지'란 형태로 캡쳐해서 저장한다. 공식적으로 제공되는 이미지도 있고, 원하는 대로 만들 수도 있다.
- **컨테이너**: 독립된 가상 공간으로 각각의 컨테이너 안에서 서비스들이 서로 방해받지 않고 실행될 수 있다. 서로 다른 버전의 서비스더라도 각자 컨테이너를 가지면 실행하는데에 문제가 생기지 않는다.
- **가상 컴퓨팅**은 한 물리적 컴퓨터 안에 각각 OS를 가동하는 가상 컴퓨터들이 물리적 자원을 분할해서 쓰지만 **도커**는 OS단까지 내려가지 않고 도커엔진 위에서 실행 환경(컨테이너)들만 독립적으로 돌리기 때문에 가상 컴퓨팅보다 훨씬 가볍고 빠르게 각각 설치, 실행, 연동 등이 가능하다.
- [Dockerhub](https://hub.docker.com/): 도커 이미지들을 업로드, 공유, 다운받을 수 있는 곳
- [Docker Document](https://docs.docker.com/): 도커 문서

### Docker Compose

> 다중 컨테이너 application을 정의하고 공유할 수 있도록 개발된 도구이다. compose에서 서비스를 정의하는 yaml 파일(docker-compose.yml)을 만들고, 단일 명령을 사용하여 모두 실행하거나 모두 종료할 수 있다.

- version
  - 파일 규격 버전
- services
  - 실행하려는 서비스(컨테이너) 각각의 묶음
  - service name
    - db_mysql, back, front, thumbnail
  - 각 service 속성
    - volumes: ​${PWD}:${mount를 원하는 디렉토리}의 형태로 볼륨 매핑을 해준다.
    - build: 자동으로 Dockerfile을 빌드하여 이미지를 생성해준다.
      - context: Docker file이 있는 경로
      - dockerfile: Dockerfile 파일명
    - environment: 컨테이너의 환경변수를 정의해준다.
    - command: docker-compose를 실행 및 빌드할 때 작성한 명령이 실행된다.
    - restart: 컨테이너를 재시작한다.
      - no: 수동으로 재시작한다.
      - always: 컨테이너를 수동으로 끄기 전까지 항상 재시작한다.
      - on-failure: 오류가 있을 시에 재시작한다.
    - depends_on: 서비스가 하나 이상일 때 실행 의존성을 지정할 수 있다. 즉, 서비스간의 종속성 순서대로 서비스를 시작할 수 있다.
    - port: 호스트OS와 컨테이너의 포트를 바인딩 시켜준다. 형식은 "host:container" 또는 "container" 등으로 사용된다.

### 실행방법

#### 리엑트 서드파티모듈 설치

`cd front && npm install && cd ..`

#### docker-compose 실행

`docker-compose up -d`

- -d 옵션: 백그라운드 실행

#### back서버에 접속하기(초기 데이터베이스 설정 목적)

`docker exec -it blackpizza_back_1 /bin/bash`

#### 초기 데이터베이스에 값 넣기

`flask db upgrade`

- 위 명령어가 오류나면 아직 DB의 실행이 덜 끝나서 그러니, 잠시 뒤 한번 더 입력해주시면 됩니다.

#### 웹페이지 접속해서 확인하기(80번 포트)

- localhost:80 에 접속해서 서비스 실행되는지 확인

#### 서버 종료 하기

`docker-compose down`

#### 서버 삭제 하기

`docker rmi blackpizza_db_mysql blackpizza_front blackpizza_back blackpizza_thumbnail`

- 서버를 종료해야 삭제가 가능합니다.

---

## DB

- models.py : sqlalchemy ORM 구조 확인
- 테이블 구조도
  <img src="/uploads/6c162f0693731ff8bf2ba9538a07bbc3/db2.png" height="500">

---

## API

> [api 명세서](https://kdt-gitlab.elice.io/003-part3-ottservice/team1/blackpizza/-/wikis/api%20list)

- api/contents.py : contents 관련 api
- api/user.py : user 관련 api

---

## Test Code

### http test

- 개발/운영 환경에서 API 요청이 잘 되는지 확인할 경우 vscode의 REST Client 익스텐션을 사용해 REST API 테스트를 수행한다.
- Postman을 대체할 수 있다.
- .http 확장의 파일을 생성하여 API 요청 스펙을 작성하고 Send Request를 클릭해서 API 요청을 수행한다.
- API를 하나씩 검사하기에 좋은 툴인 것 같다. 오류가 생긴 API만 빠르게 다시 테스트할 수 있다.

### pytest

- test.py : 모든 api에 대한 pytest
- config.py : test.py의 user test를 위한 test db config 설정 가능

  - 사전 세팅: local에 test db 생성, test.sql 참고 user table 생성

- 파이썬 테스팅 툴로 좋은 프로그램을 작성하도록 도와준다.
- assert를 사용해 테스트를 진행할 수 있다.
- positive test 방식으로 작성하였다.
- `@pytest.fixture`: 함수를 fixture로 명명하여 parameter로 사용할 수 있다. fixture를 사용하면 테스트 코드가 간결해지고, 재활용할 수 있다. 주로 테스트를 위한 데이터 셋업과 데이터 클리닝이 반복적, 독립적으로 사용 될 때 사용한다.
  - 테스트를 위한 특정 파일과 디렉토리를 만들고 테스트 종료 시 해당 파일과 디렉토리를 삭제하는 경우
  - DB를 연결하고 테스트 종료 시 DB 연결을 종료하는 경우
