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

  return (
    <div className="">
      <h1>Search</h1>
      <div className="">
        <input
          type="text"
          className=""
          onChange={handleChange}
          placeholder="검색"
          autoComplete="off"
        />
      </div>

      <ul>
        {users.map(user=> (
          <li key={user._id}>
            <Avatar user={user} />
          </li>
        ))}
      </ul>

    </div>
  )

}