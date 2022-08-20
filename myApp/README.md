# Back-end Server

## END point
- index
GET / - index로 요청

- 유저 인증(authentication, auth)
GET /user - 로그인한 유저 데이터를 전송한다

- 로그인, 회원가입
POST /user/login - 로그인을 처리한다. 성공할 경우 token을 전송한다.
POST / users - 회원가입을 처리한다.

- 프로필 정보
GET /prefiles/:username - username의 프로필 데이터를 전송한다.
GET /profiles/:username/articles - username의 타임라인을 전송한다.
POST /profiles/:username/follow - username을 팔로우하는 요청을 처리한다.
DELETE /profiles/:username/follow - username을 언팔로우하는 요청을 처리한다.
GET /profiles/:username/followers - username을 팔로워 리스트를 전송한다.
GET /profiles/:username/following - username을 팔로잉 리스트를 전송한다.

- 프로필 수정
POST /accounts/edit - 유저의 프로필 업데이트를 처리한다.
POST /accounts/edit/image - 유저의 프로필 이미지를 추가한다.
DELETE /accounts/edit/image - 유저의 프로필 이미지를 삭제한다.

- 게시물
GET /feed - 피드 게시물을 전송한다.
GET /articles - 전체 게시물을 전송한다.
GET /articles/:id - id가 :id인 게시물을 전송한다.
POST /articles - 새로운 게시물 저장을 처리한다.
PUT /articles/:id - id가 :id인 게시물의 업데이트를 처리한다.
DELETE /articles/:id - id가 :id인 게시물의 삭제를 처리한다.

POST /articles/:id/favorite - 게시물의 좋아요 추가를 처리한다.
DELETE /articles/:id/favorite - 게시물의 좋아요 취소를 처리한다.

- 댓글
GET /articles/:id/comments - :id 게시물에 달린 댓글을 전송한다.
POST /articles/:id/comments - :id 게시물에 달린 댓글 추가를 처리한다.
DELETE /comments/:id - :id 댓글의 삭제를 처리한다.

POST /comments/:id/favorite - :id 댓글의 좋아요 추가를 처리한다.
DELETE /comments/:id/favorite - :id 댓글의 좋아요 삭제를 처리한다.

- 유저 검색
GET /search - 유저 검색의 결과를 전송한다.

# Front-end Server

# Package
passport, jwt cookieParser, cors, path, formidable, mongoose

- passport
유저 인증에 사용(로그인)

- cookieParser
요청에 담긴 cookie 데이터를 파싱한다

- cors(Cross-Origin Resource Sharing)
교차 출처 리소스 공유를 허가한다

- path
서버에서 정적인 경로를 설정한다

- formidable 
요청의 formData를 파싱한다

- mongoose
ODM(Object DOcument Model)
JavaScript로 작성된 데이터베이스 쿼리를 네이티브 데이터베이스 쿼리로 변환한다
> JavaScript로 작성된 쿼리 : User.find({ username: "changno" })
> 네이티브 쿼리(데이터베이스 언어)로 작성된 쿼리 : SELECT * FROM User WHERE username="changno"
> 단점 : 네이티브 쿼리로 한번의 번역이 필요하기 때문에 네이티브 쿼리에 비해 속도가 느리다

# 리엑트는 view 서버

# 흔히 많이 사용하는 API서버 
postman


