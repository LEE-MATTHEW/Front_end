import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ArticleCreate() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoaded,setInLoaded] = useState(null);
  const [text, setText] = useState("");
  const [files, setFiles]= useState([]);

  function handleSubmit() {

  }

  function handleFile(e) {  
    console.log(e.target.files);

    const files = Object.keys(e.target.files).map(key=>e.target.files[key]);
    // file input의 파일들을 files state를 업데이트
    setFiles(files);
  }

  console.log(files);
  
  return (
    <>
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          {/* htmlFor를 쓰는 이유: label만 클릭해도 input과 연동되는 기능을 주기 위해서 */}
          {/* label 태그 안에 input 태그를 집어 넣으면 htmlFor를 쓰지않아도 input의 id와 연동이 된다 */}
          <label htmlFor="photos">
            Photos +
          </label>
          <input 
            type="file"
            name="photos"
            id="photos"
            style={{display:"none"}}
            className=""
            multiple={true}
            // 이미지 파일만 선택할 수 있게 함
            accept="image/*"
            onChange={handleFile}
          />
        </div>

        {/* 파일 리스트 출력 */}
        <ul className="">
          {files.map((file, index)=>(
            <li key={index}>{file.name}</li>
          ))}
        </ul>
        <div className="">
          <label htmlFor="description" className="">
            Description
          </label>
          <textarea 
            type="text"
            name="description"
            id="description"
            className=""
          />
        </div>
        <div className="">
          <button 
            type = "submit"
            className=""
            disabled=""
          >Submit</button>
        </div>
      </form>
    </>
  )
}