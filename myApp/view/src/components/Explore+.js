import { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import ArticleList from "./ArticleList";
import wrapPromise from "./wrapPromise";

// 한번에 나오는 게시물 갯수 제한
const limit= 9;

function fetchData() {
  const promise = fetch(`http://localhost:3000/articles/?limit=${limit}`, {
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
    <Suspense fallback={<p>fetching articles...</p>}>
      <Explore resource={resource} />
    </Suspense>
  )
}

function Explore({ resource }) {
  const initialArticles = resource.read();
  const [articles, setArticles] = useState(initialArticles);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [skip, setSkip] = useState(limit);


  // 더보기
  function addArticles() {
    setError(null);
    setIsLoaded(false);

    fetch(`http://localhost:3000/articles/?limit=${limit}&skip=${skip}`, {
      headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
    })
    .then(res => {
      if(!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(data => {
      setArticles([...articles, ...data]);
      setSkip(skip + limit);
    })
    .catch(error => {
      setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
    })
    .finally(()=> setIsLoaded(true));
  }

  return (
    <>
      <div className="pt-3 mb-3 px-3">
        <Link to={"/search"}>검색</Link>
      </div>

      <ArticleList articles={articles} />

      <button onClick={addArticles}>더보기</button>

    </>
  )
}