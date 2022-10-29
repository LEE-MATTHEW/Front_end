import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function Search() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [users, setUsers] = useState([]);

  function handleChange(e) {
    setError(null);
    setIsLoaded(false);

    console.log(e.target.value)

    if (!e.target.value.trim()) {
      setUsers([]);
      setIsLoaded(true);
      return;
    }

    fetch(`http://localhost:3000/search?username=${e.target.value}`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error(error)
        setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
      })
      .finally(() => {
        setIsLoaded(true);
      })
  }
  // 유저 리스트 불러오기
  const userList = users.map(user => (
    <div key={user._id} className="mb-2">
      <Avatar user={user} />
    </div>
  ))
  

  return (
    <div className="px-3 pt-3">
      {/* 검색창 */}
      <h1 className="text-2xl mb-3">Search</h1>
      <div className="mb-3 flex">
        <div className="px-2">
          <Link to="/explore">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={30} height={30}>
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
            </svg>
          </Link>
        </div>
        <input
          type="text"
          className="border p-1 w-full outline-none"
          onChange={handleChange}
          placeholder="검색"
        />
      </div>

      {/* 리스트 출력 */}
      {userList}
    </div>
  )
}