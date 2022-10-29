import { Suspense, useState } from "react";
import wrapPromise from "./wrapPromise";
import {Fallback, SucessMessage} from "./Progress"

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
    <Suspense fallback={<Fallback />}>
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
    <div className="mt-3 px-3">
      <h1 className="text-2xl mb-3">프로필 수정</h1>

      <div className="mb-3">
        <label htmlFor="" className="block font-bold">Username</label>
        <p>{user.username}</p>
      </div>

      <div className="mb-3">
        <label htmlFor="" className="block font-bold">Email</label>
        <p>{user.email}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="bio" className="block font-bold">Bio</label>
          <textarea
            name="bio"
            className="border p-1 w-full outline-none"
            onChange={handleChange}
            defaultValue={user.bio}
          />
        </div>

        <div className="">
          <button
            type="submit"
            className="border p-1 disabled:text-gray-300"
            disabled={!text.trim()}
          >
            Submit
          </button>
        </div>
      </form>
      <SucessMessage message={message} />
    </div>
  )
}