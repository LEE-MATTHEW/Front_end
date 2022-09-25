import { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import wrapPromise from "./wrapPromise";

function fetchData() {
  const promise = fetch(`http://localhost:3000/user`, {
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
    <Suspense fallback={<p>fetching image...</p>}>
      <EditImage resource={resource} />
    </Suspense>
  )
}

function EditImage({ resource }) {
  const initialUser = resource.read();
  const [user, setUser] = useState(initialUser);
  const [message, setMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(null);
  const [error, setError] = useState(null);

  function uploadImage(e) {
    setError(null);
    setIsLoaded(false);
    setMessage("");

    const files = e.target.files;
    console.log(files);

    const formData = new FormData();
    formData.append("image", files[0]);

    fetch(`http://localhost:3000/accounts/edit/image`, {
      method: "POST",
      headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`},
      body: formData
    })
    .then(res => {
      if(!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(data => {
      const editedUser = {...user, image:data}
      setUser(editedUser);
      setMessage("이미지가 등록되었습니다");
    })
    .catch(error => {
      setError("문제가 발생하였습니다. 잠시 후 다시 시도해주세요")
    })
    .finally(()=>setIsLoaded(true))
  }

  function deleteImage() {
    setMessage("");
    setError(null);
    setIsLoaded(false);

    fetch('http://localhost:3000/accounts/edit/image', {
      method: "DELETE",
      headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
    })
    .then(res=>{
      if(!res.ok) {
        throw res;
      }
      const editedUser = {...user, image: null};
      setUser(editedUser);
      setMessage("이미지가 삭제되었습니다")
    })
    .catch(error => {
      setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
    })
    .finally(()=> setIsLoaded(true))
  }

  return (
    <>
      <h1>프로필 이미지</h1>
      <div>
        <img src={`http://localhost:3000/users/${user.image || "avatar.png"}`}
          width="200"
          className=""
        />
      </div>
      <div className="">
        {user.image ?
          <button
            onClick={deleteImage}
          >
            이미지 삭제
          </button>
          :
          <label className="">
            이미지 등록 +
            <input
              type="file"
              name="image"
              id="file-input"
              className=""
              onChange={uploadImage}
              accept="image/*"
              style={{ display : "none" }}
            />
          </label>
        }
      </div>
    </>
  )
}