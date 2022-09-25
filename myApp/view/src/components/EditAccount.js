import { Suspense, useState } from "react";
import wrapPromise from "./wrapPromise";

function fetchData() {
  const promise = fetch('http://localhost:3000/user', {
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
  return wrapPromise(promise);
}

export default function () {
  const resource = fetchData();

  return (
    <Suspense fallback={<p>fetching accounts...</p>}>
      <EditAccount resource={resource} />
    </Suspense>
  )
}

function EditAccount({ resource }) {
  const initialUser = resource.read();
  const [user, setUser] = useState(initialUser);

  const [text, setText] = useState("");

  const [message, setMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(null);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setIsLoaded(false);
    setMessage("");

    const formData = JSON.stringify({ bio: text });

    fetch('http://localhost:3000/accounts/edit', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: formData
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
        const editedUser = { ...user, bio: data };

        setUser(editedUser);
        setMessage("프로필정보가 수정되었습니다")
        setText("")
      })
      .catch(error => {
        setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
      })
      .finally(() => setIsLoaded(true))
  }


  function handleChange(e) {
    setText(e.target.value)
  }

  return (
    <>
      <h1>프로필 정보</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="">Username</label>
          <p>{user.username}</p>
        </div>
        <div className="">
          <label htmlFor="">E-mail</label>
          <p>{user.email}</p>
        </div>
        <div className="">
          <label htmlFor="bio">
            소개
          </label>
          <textarea
            name="bio"
            className=""
            onChange={handleChange}
            defaultValue={user.bio}
          />
        </div>
        <div>
          <button
            type="submit"
            className=""
            disabled={!text.trim()}
          >
            제출
          </button>
        </div>
      </form>
    </>
  )
}