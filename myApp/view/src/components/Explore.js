import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Explore() {
  console.log("Explore loaded!")
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/articles`, {
      // 서버에 token을 전달
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
        // articles를 업데이트
        setArticles(data)
      })
      .catch(error => {
        console.log(error);
        setError(error)
      })
      .finally(() => setIsLoaded(true))
  }, [])

  if (error) {
    return <h1>Error!</h1>
  }
  if (isLoaded === false) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <h1>Explore</h1>
      <ul>
        {articles.map(article => (<li key={article._id}>{article.description}</li>))}
      </ul>
    </>
  )
}