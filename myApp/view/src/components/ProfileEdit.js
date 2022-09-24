import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function ProfileEdit() {
  const auth = useContext(AuthContext);

  return (
    <>
      <h1>프로필 수정</h1>
      <ul>
        <li>
          <Link to="/accounts/edit/image">이미지 수정</Link>
        </li>
        <li>
          <Link to="/accounts/edit/profile">정보 수정</Link>
        </li>
        <li>
          <button className="" onClick={auth.signOut}>
            로그아웃
          </button>
        </li>
      </ul>
    </>
  )
}