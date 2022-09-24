import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ArticleCreate() {

  const navigate = useNavigate();
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setIsLoaded(false);

    const formData = new FormData(e.target);
    
    fetch(`http://localhost:3000/articles`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json()
    })
    .then(data => {
      navigate("/", {replace: true})
    })
    .catch(err => {
      setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
    })
    .finally(() => setIsLoaded(true))
  }

  function handleFile(e) {
    console.log(e.target.files);

    const files = Object.keys(e.target.files).map(key => e.target.files[key]);
    // files state를 업데이트
    setFiles(files);
  }

  console.log(files);

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          {/* htmlFor를 쓰는 이유: label만 클릭해도 input과 연동되는 기능을 주기 위해서 */}
          {/* label 태그 안에 input 태그를 집어 넣으면 htmlFor를 쓰지않아도 input의 id와 연동이 된다 */}
          <label>
            Photos +
            <input
              type="file"
              name="photos"
              style={{ display: "none" }}
              className=""
              multiple={true}
              accept="image/*"
              onChange={handleFile}
            />
          </label>
        </div>

        {/* 파일 리스트 출력 */}
        <ul className="">
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>

        <div className="">
          <label htmlFor="description" className="">Description</label>
          <textarea 
            type="text"
            name="description"
            id="description"
            className=""
            onChange={handleChange}
          />
        </div>
        <div className="">
          <button
            type="submit"
            className=""
            disabled={!text.trim() || files.length<1}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}


