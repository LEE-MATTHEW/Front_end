import React, { 
  useState, useEffect, useRef, 
  useContext, createContext, Suspense, lazy 
} from "react";
import {
  BrowserRouter as Router, Routes, Route, 
  Outlet, Link, useParams, 
  Navigate, useNavigate, useLocation
} from "react-router-dom";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />)

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Feed</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/accounts/login">Login</Link></li>
          <li><Link to="/accounts/signup">SignUp</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element = {<Feed />}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/accounts/login" element={<Login/>}/>
        <Route path="/accounts/signup" element={<SignUp/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

function Feed() {
  return <h1>Feed</h1>
}
function Explore() {
  return <h1>Explore</h1>
}
function Login() {
  return <h1>Login</h1>
}
function SignUp() {
  const [error, setError] = useState({});
  const [isLoaded, setIsLoaded] = useState({});
  const [message, setMessage] = useState({});
  const [user, setUser] = useState({});

  function handleSubmit() {}
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name==="username") {
      setError({...error, [name]:""})
      setMessage({...message, [name]:""})
      setUser({...user, [name]:""})
      if (!value) {
        setError({...error, [name]: "유저의 이름을 입력하세요"});
      } else if (!value.match(/^[a-z]{5,}$/)) {
        setError({...error, [name]: "유저이름은 소문자를 이용해 5글자 이상이어야 합니다"})
      } else {
        // 중복검사
        setIsLoaded({...isLoaded,[name]:false});

        fetch(`http://localhost:3000/validation/username/?value=${value}`)
        .then(res=>{
          if(!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then(data=> {
          if(data) {
            return setError({...error, [name]:"이미 사용중인 이름입니다"})
          }
          setMessage({...message,[name]: "사용가능한 유저이름입니다"})
          setUser({...user,[name]: value})
          
        })
        .catch(error=> setError({...error, [name]: "잠시 후 다시 시도해 주세요"}))
        .finally(()=>setIsLoaded({...isLoaded,[name]:true}));

      } 
    }

    if (name==="email") {}

    if (name==="password") {}
    
    if (name==="passwordConfirm") {}

  }
  console.log("user",user);
  console.log("error", error);
  console.log("message",message);

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
            error = {error.username}
            isLoaded = {isLoaded.username}
            message = {message.username}
          />
        </div>
        <div className="">
          <label htmlFor="email">E-mail</label>
          <input type="text" name="email" id="email" onChange={handleChange}/>
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" onChange={handleChange}/>
        </div>
        <div className="">
          <label htmlFor="passwordConfirm">Password Confirm</label>
          <input type="text" name="passwordConfirm" id="passwordConfirm" onChange={handleChange}/>
        </div>
        <div className="">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

function Validation({ error, isLoaded, message}){
  if (error) {
    return <p>{error}</p>
  }
  if (isLoaded) {
    return <p>loading...</p>
  }
  return <p>{message}</p>
}
function NotFound() {
  return <h1>Not Found</h1>
}