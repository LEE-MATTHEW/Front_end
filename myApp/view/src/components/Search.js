import { useState } from "react";
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
      <div className="mb-3">
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