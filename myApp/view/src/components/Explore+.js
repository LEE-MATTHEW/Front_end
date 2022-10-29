import { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import ArticleList from "./ArticleList";
import wrapPromise from "./wrapPromise";
import { Fallback } from "./Progress";

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
    <Suspense fallback={<Fallback />}>
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
        <Link to={"/search"}>
          <div className="flex">
            <div className="px-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20}>
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
              </svg>
            </div>
            검색
          </div>
        </Link>
      </div>

      <ArticleList articles={articles} />

      <button onClick={addArticles}>더보기</button>

    </>
  )
}