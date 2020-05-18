# bringback_server
[Bring Back](https://github.com/ohjooh/bringback) 프로젝트의 서버 repository입니다.



## 서버 설치법
1. 로컬 저장소에 프로젝트를 저장한다.

<pre><code>git clone https://github.com/ohjooh/bringback_server.git</code></pre>

2. Node.js command prompt를 실행한다. 저장해 둔 로컬 저장소의 경로에 들어가서 npm을 설치한다.

<pre><code>npm install</code></pre>

3. 서버를 실행한다.
<pre><code>node server.js</code></pre>

"서버 가동"이라는 문구가 뜨면 정상적으로 실행된 것임.

## DB 실행법

1. MongoDB Compass를 실행한다. 

2. 실행하자마자 뜨는 Connect to Host라는 화면에서 Hostname을 localhost/bringback으로 지어준다. Port 번호는 3000으로 입력한다.

#### 기입한 데이터 예시
<img src="https://github.com/ohjooh/bringback_server/blob/master/mongoDB%20%EC%97%B0%EA%B2%B0%EB%B2%95.PNG" width="40%"></img>

3. CONNECT 버튼을 누른다.

이후 안드로이드에서 프로젝트를 에뮬레이터로 실행시키면 정상적으로 작동한다. 
