import { Suspense, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";


export default function Login() {

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoaded(false);

    const formData = JSON.stringify(user);

    fetch(`http://localhost:3000/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData
    })
      .then(res => {
        // 서버의 응답 확인
        console.log(res)
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
       auth.signIn(data, ()=> navigate("/", {replace: true}))
      })
      .catch(error => {
        // 에러 확인
        console.log(error);
        
        if (error.status === 401) {
          return alert("User not found");
        }
        // 기타에러 (401제외)
        alert('Error!');
      })
      .finally(() => setIsLoaded(true));
  };

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  console.log(user);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="">
          <label htmlFor="email" className="">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className=""
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="">
          <label htmlFor="password" className="">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className=""
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="">
          <button
            className=""
            type="submit"
            disabled={!user.email.trim() || !user.password.trim}>
            Submit
          </button>
        </div>
      </form>
    </>
  )
}