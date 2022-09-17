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
  const initialUser = resource && resource.read();
  // token이 없는 경우 user는 undefined
  const [user, setUser] = useState(initialUser);

  // 로그인
  function signIn(data, callback) {
    setUser(data.user);
    localStorage.setItem("token", data.token);

    // 로그인 성공 후, feed페이지로 이동한다
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