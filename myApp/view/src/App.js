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
const AuthRequired = lazy(() => import('./components/AuthRequired'))
const AuthProvider = lazy(() => import("./components/AuthProvider"));

const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));

const Layout = lazy(() => import('./components/Layout'))

const Feed = lazy(() => import('./components/Feed'));
const Explore = lazy(() => import('./components/Explore+'));

const ArticleView = lazy(() => import('./components/ArticleView'))
const ArticleCreate = lazy(()=> import('./components/ArticleCreate'))

const Profile = lazy(() => import('./components/Profile'));

const NotFound = lazy(() => import('./components/NotFound'));


export default function App() {
  return (
    <>
      <Suspense fallback={<p>fetching app...</p>}>
        <AuthProvider>
          <Routes>

            {/* 로그인이 필요한 페이지 */}
            <Route path="/" element={<AuthRequired layout={<Layout />} />}>
              <Route index element={<Feed />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/create" element={<ArticleCreate />} />
              <Route path="/profiles/:username">
                <Route index element={<Profile />} />
              </Route>
              <Route path="/p/:articleID">
                <Route index element={<ArticleView />} />
              </Route>
            </Route>

            {/* 로그인이 필요하지 않은 페이지 */}
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>

      </Suspense>

    </>
  )
}

