import React, {
  useState, useEffect, useRef,
  useContext, createContext, Suspense, lazy
} from "react";
import {
  BrowserRouter as Router, Routes, Route,
  Outlet, Link, useParams,
  Navigate, useNavigate, useLocation
} from "react-router-dom";

// lazy를 사용함으로써 굳이 쓰지 않을 페이지를 가져오지 않을 수 있다
const Signup = React.lazy(()=> import('./components/Signup'));
const Login = React.lazy(()=> import('./components/Login'));

const Feed = React.lazy(()=> import('./components/Feed'));
const Explore = React.lazy(()=> import('./components/Explore+'));
const ArticleView = lazy(() => import('./components/ArticleView'))

const Profile = React.lazy(()=> import('./components/Profile'));

const NotFound = React.lazy(()=> import('./components/NotFound'));


export default function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Feed</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/profiles/changno">Profile</Link></li>
          <li><Link to="/accounts/login">Login</Link></li>
          <li><Link to="/accounts/signup">SignUp</Link></li>
        </ul>
      </nav>
      <Suspense fallback={<p>fetching component...</p>}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/p/:articleId" element={<ArticleView />} />
          <Route path="/profiles/:username" element={<Profile />} />
          <Route path="/accounts/login" element={<Login />} />
          <Route path="/accounts/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}




