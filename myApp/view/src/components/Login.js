import { Suspense, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { Loading, ErrorMessage, SucessMessage } from "./Progress";


export default function Login() {

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(null);
  const [user, setUser] = useState({
    email: localStorage.getItem("email") || "",
    password: ""
  })

  const [passwordType, setPasswordType] = useState("password");

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoaded(false);
    setError(null);

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
        localStorage.setItem("email", user.email);
        auth.signIn(data, ()=> navigate("/", {replace: true}))
      })
      .catch(error => {
        // 에러 확인
        console.log(error);
        
        if (error.status === 401) {
          return setError("이메일 또는 비밀번호를 확인하세요")
        }
        // 기타에러 (401제외)
        setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
      })
      .finally(() => setIsLoaded(true));
  };

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  function togglePassword() {
    if (passwordType==="password") {
      setPasswordType("text")
    } else {
      setPasswordType("password")
    }
  }

  console.log(user);

  return (
    <div className="flex justify-center h-96 items-end">
      <form className="w-60" onSubmit={handleSubmit}>
        <h1 className="text-2xl mb-3">My App</h1>
        <div className="mb-2">
          <label htmlFor="email" className="block font-bold">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="border w-full p-1 outline-none"
            value={user.email}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block font-bold">Password</label>
          <div className="relative">
            <input
              type={passwordType}
              name="password"
              id="password"
              className="border w-full py-1 pl-1 pr-16 outline-none"
              value={user.password}
              onChange={handleChange}
              autoComplete="off"
            />
            <div className="absolute top-0 right-0 bottom-0">
              <button 
                type="button"
                className="h-full flex items-center px-2"
                onClick={togglePassword}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={20} height={20}>
                  <path fill={passwordType === "password" ? "#60a5fa" : "#ddd"} d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-2">
          <button
            className="border w-full p-1 disabled:text-gray-300"
            type="submit"
            disabled={!user.email.trim() || !user.password.trim}>
            Submit
          </button>
        </div>
        <div className="text-blue-300">
          <Link to={`/accounts/signup`}>Create Account</Link>
        </div>
        <div className="text-center">
          <small>2022 &copy; myapp</small>
        </div>
      </form>
      <Loading isLoaded={isLoaded} />
      <ErrorMessage error={error} />
    </div>
  )
}