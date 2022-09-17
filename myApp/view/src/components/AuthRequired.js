import { useContext, Suspense } from "react"
import { Link, Outlet, Navigate } from "react-router-dom"
import AuthContext from "./AuthContext";
import Layout from "./Layout";

export default function AuthRequired({ layout }) {

  const auth = useContext(AuthContext);

  // user가 없을 경우 login페이지로 이동시킨다
  if (!auth.user) {
    return <Navigate to="/account/login" replace={true} />
  }

  return layout;
}