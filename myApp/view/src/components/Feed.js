import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import wrapPromise from "./wrapPromise";
import ArticleItem from "./ArticleItem";

const limit = 5;

function fetchData() {
  const promise = fetch(`http://localhost:3000/feed/?limit=${limit}`,{
    headers : { "Authorization": `Bearer ${localStorage.getItem("token")}`}
  })
  .then(res => {
    if(!res.ok) {
      throw res;
    }
    return res.json();
  })
  return wrapPromise(promise);
}
export default function () {
  const resource = fetchData();
  
  return (
  <Suspense fallback={<p>fetching feed...</p>}>
    <Feed resource={resource}/>
  </Suspense>
  )
}

function Feed({resource}) {
  const initialArticles = resource.read();
  const [articles, setArticles] = useState(initialArticles);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [skip, setSkip] = useState(limit);

  function editArticle(isFavorite, articleId) {
    setError(null);

    if(!isFavorite) {
      fetch(`http://localhost:3000/articles/${articleId}/favorite`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
      })
      .then(res => {
        if(!res.ok) {
          throw res;
        }
        const editedArticles = articles.map(article => {
          if(articleId === article._id) {
            return {...article, isFavorite: true, favoriteCount: article.favoriteCount + 1}
          }
          return article;
        })
        setArticles(editedArticles)
      })
      .catch(error => {
        setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
      })
    } else {
      fetch(`http://localhost:3000/articles/${articleId}/favorite`, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
      })
      .then(res => {
        if(!res.ok) {
          throw res;
        }
        const editedArticles = articles.map(article => {
          if(articleId === article._id) {
            return {...article, isFavorite: false, favoriteCount: article.favoriteCount - 1}
          }
          return article;
        })
        setArticles(editedArticles)
      })
      .catch(error => {
        setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
      })

    }
  }

  function deleteArticle(articleId) {
    setError(null);

    fetch(`http://localhost:3000/articles/${articleId}`, {
      method: "DELETE",
      headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
    })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      const updatedArticles = articles.filter(article => articleId !== article._id);
      setArticles(updatedArticles);
    })
    .catch(error => {
      setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
    })
  }

  function addArticles() {
    setError(null);
    setIsLoaded(false);

    fetch(`http://localhost:3000/feed/?limit=${limit}&skip=${skip}`,{
      headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
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
    <h1>Feed</h1>
    <ul>
      {articles.map(article => (
        <li key={article._id}>
          <ArticleItem 
            article={article}
            editArticle={editArticle}
            deleteArticle={deleteArticle}
          />
        </li>
      ))}
    </ul>
    <button onClick={addArticles}>더보기</button>
    </>
  )
}
