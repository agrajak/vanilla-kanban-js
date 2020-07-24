## todo-3

### 만든 사람
- 김명성(@maeng2418)
- 전수현(@agarjak)

### 구현한 부분
- 노트 이동, 생성, 내용 수정, 삭제 프론트앤드 및 백앤드 동기화 완료
- 컬럼 이동, 생성, 제목 수정, 삭제 프론트앤드 및 백앤드 동기화 완료
- 위의 동작시, 액티비티 로그 쌓이도록 수정

### 데모
[Live Demo](http://http://52.79.129.64:3000)

### 실행시키는 법
1. 의존성 라이브러리 설치
  ```
npm run install
  ```
2. 프론트앤드 빌드
  ```
npm run build
  ```
  로 프론트앤드 코드를 정적 파일로 빌드

3. `.env` 파일 추가
  ```
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
  ```
  로 DB 관련 환경변수 추가
4. nodemon 실행
  ```
npm run start
  ```
  로 실행 후 크롬에서 localhost:3000에 접속 후 확인!
## 개발하는 법
1. 의존성 라이브러리 설치
  ```
npm run install
  ```
2. `.env` 파일 추가
  ```
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
  ```
  로 DB 관련 환경변수 추가

3. nodemon 실행
  ```
npm run start
  ```

4. `webpack-dev-server` 실행
  ```
npm run dev
  ```
로 webpack-dev-server를 실행후, localhost:9000에 접속.

자동으로 api관련 http request들은 3000포트로 프록시 됩니다.

### 스크럼 및 기술 블로그
[노션 링크](https://www.notion.so/To-Do-List-3f1cfb992e454bad8af19e6c2b7bf518)
