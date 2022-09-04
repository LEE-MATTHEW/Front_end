import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [error, setError] = useState({});
  const [isLoaded, setIsLoaded] = useState({});
  const [message, setMessage] = useState({});
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = JSON.stringify(user);

    fetch(`http://localhost:3000/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: formData
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        navigate("/accounts/login", { replace: false })
      })
      .catch(error => {
        alert("Error!");
      })
  }
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    // 유저이름 유효성 검사
    if (name === "username") {
      setError({ ...error, [name]: "" })
      setMessage({ ...message, [name]: "" })
      setUser({ ...user, [name]: "" })
      if (!value) {
        setError({ ...error, [name]: "유저의 이름을 입력하세요" });
      } else if (!value.match(/^[a-z]{5,}$/)) {
        setError({ ...error, [name]: "유저이름은 소문자를 이용해 5글자 이상이어야 합니다" })
      } else {
        // 중복검사
        setIsLoaded({ ...isLoaded, [name]: false });

        fetch(`http://localhost:3000/validation/username/?value=${value}`)
          .then(res => {
            if (!res.ok) {
              throw res;
            }
            return res.json();
          })
          .then(data => {
            if (data) {
              return setError({ ...error, [name]: "이미 사용중인 이름입니다" })
            }
            setMessage({ ...message, [name]: "사용가능한 유저이름입니다" })
            setUser({ ...user, [name]: value })

          })
          .catch(error => setError({ ...error, [name]: "잠시 후 다시 시도해 주세요" }))
          .finally(() => setIsLoaded({ ...isLoaded, [name]: true }));

      }
    }

    if (name === "email") {
      setError({ ...error, [name]: "" })
      setMessage({ ...message, [name]: "" })
      setUser({ ...user, [name]: "" })
      if (!value) {
        setError({ ...error, [name]: "이메일을 입력하세요" });
      } else if (!value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
        setError({ ...error, [name]: "올바른 이메일이 아닙니다" })
      } else {
        // 중복검사
        setIsLoaded({ ...isLoaded, [name]: false });

        fetch(`http://localhost:3000/validation/username/?value=${value}`)
          .then(res => {
            if (!res.ok) {
              throw res;
            }
            return res.json();
          })
          .then(data => {
            if (data) {
              return setError({ ...error, [name]: "이미 사용중인 이메일입니다" })
            }
            setMessage({ ...message, [name]: "사용가능한 이메일입니다" })
            setUser({ ...user, [name]: value })

          })
          .catch(error => setError({ ...error, [name]: "잠시 후 다시 시도해 주세요" }))
          .finally(() => setIsLoaded({ ...isLoaded, [name]: true }));

      }
    }

    if (name === "password") {
      setError({ ...error, [name]: "" })
      setMessage({ ...message, [name]: "" })
      setUser({ ...user, [name]: "" });

      if (!value) {
        setError({ ...error, [name]: "비밀번호를 입력하세요" });
      } else if (!value.match(/.{8,}/)) {
        setError({ ...error, [name]: "비밀번호가 안전하지 않습니다" })
      } else {
        setMessage({ ...message, [name]: "안전한 비밀번호 입니다" });
        setUser({ ...user, [name]: value });
      }
    }

    if (name === "passwordConfirm") {
      setError({ ...error, [name]: "" })
      setMessage({ ...message, [name]: "" })
      setUser({ ...user, [name]: "" });

      if (!value) {
        setError({ ...error, [name]: "비밀번호를 한번 더 입력하세요" });
      } else if (user.password !== value) {
        setError({ ...error, [name]: "비밀번호가 일치하지 않습니다" })
      } else {
        setMessage({ ...message, [name]: "비밀번호가 일치합니다" });
        setUser({ ...user, [name]: value });
      }
    }

  }
  console.log("user", user);
  console.log("error", error);
  console.log("message", message);

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
          />
          <Validation
            error={error.username}
            isLoaded={isLoaded.username}
            message={message.username}
          />
        </div>
        <div className="">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            onChange={handleChange}
          />
          <Validation
            error={error.email}
            isLoaded={isLoaded.email}
            message={message.email}
          />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            autoComplete="off"
            onChange={handleChange}
          />
          <Validation
            error={error.password}
            isLoaded={isLoaded.password}
            message={message.password}
          />
        </div>
        <div className="">
          <label htmlFor="passwordConfirm">Password Confirm</label>
          <input
            type="text"
            name="passwordConfirm"
            id="passwordConfirm"
            autoComplete="off"
            onChange={handleChange}
          />
          <Validation
            error={error.passwordConfirm}
            isLoaded={isLoaded.passwordConfirm}
            message={message.passwordConfirm}
          />
        </div>
        <div className="">
          <button
            type="submit"
            disabled={!user.username || !user.email || !user.password || !user.passwordConfirm}
          >
            Submit</button>
        </div>
      </form>
    </>
  )
}

function Validation({ error, isLoaded, message }) {
  if (error) {
    return <p>{error}</p>
  }
  if (isLoaded === false) {
    return <p>loading...</p>
  }
  return <p>{message}</p>
}