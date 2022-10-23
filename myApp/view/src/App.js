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
const Search = lazy(() => import("./components/Search"))
const ArticleView = lazy(() => import('./components/ArticleView'))
const ArticleCreate = lazy(() => import('./components/ArticleCreate'))
const Comments = lazy(() => import('./components/Comments'))

const Profile = lazy(() => import('./components/Profile'));
const FollowerList = lazy(() => import('./components/FollowerList'));
const FollowingList = lazy(() => import('./components/FollowingList'));


const ProfileEdit = lazy(() => import('./components/ProfileEdit'))
const EditImage = lazy(() => import('./components/EditImage'))
const EditAccount = lazy(() => import('./components/EditAccount'))

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
              <Route path="explore" element={<Explore />} />
              <Route path="search" element={<Search />} />
              <Route path="create" element={<ArticleCreate />} />
              <Route path="profiles/:username">
                <Route index element={<Profile />} />
                <Route path="followers" element={<FollowerList />} />
                <Route path="following" element={<FollowingList />} />
              </Route>
              
              <Route path="p/:articleId">
                <Route index element={<ArticleView />} />
                <Route path="comments" element={<Comments />} />
              </Route>
              <Route path="accounts/edit">
                <Route index element={<ProfileEdit />} />
                <Route path="image" element={<EditImage />} />
                <Route path="profile" element={<EditAccount />} />
              </Route>
            </Route>

            {/* 로그인이 필요하지 않은 페이지 */}
            <Route path="accounts/login" element={<Login />} />
            <Route path="accounts/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>

      </Suspense>

    </>
  )
}

