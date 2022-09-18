import { useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import wrapPromise from "./wrapPromise";

function fetchData() {
  const promise = fetch(`http://localhost:3000/user`, {
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
  return wrapPromise(promise);
}
// token이 있는 경우 fetchData 함수를 실행
const resource = localStorage.getItem("token") && fetchData();

export default function ({ children }) {
  // resource가 있는 경우에 resource 일기를 시도한다
  // initialUser : 앱이 처음 로드되었을 때 (= 새로고침(reload), 주소창에 직접 링크를 칠 경우 새로고침과 같은 기능)
  const initialUser = resource && resource.read();
  // token이 없는 경우 user는 undefined
  const [user, setUser] = useState(initialUser);

  // 로그인
  function signIn(data, callback) {
    setUser(data.user);
    localStorage.setItem("token", data.token);

    // 로그인 성공 후, feed페이지로 이동한다
    // user state가 업데이트 된 다음에 실행되어야 하기때문에 시간을 주어 순서를 정함
    setTimeout(() => {
      callback()
    }, 100)
  }


  // 로그아웃
  function signOut() {
    setUser(null);
    localStorage.removeItem("token")
  }

  const value = { user, signIn, signOut }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}