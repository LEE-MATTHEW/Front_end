import { useState, Suspense } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import wrapPromise from "./wrapPromise";
import ArticleItem from "./ArticleItem";


function fetchData(articleId) {
  
  const promise = fetch(`http://localhost:3000/articles/${articleId}`, {
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
  const params = useParams();
  const articleId = params.articleId;


  const resource = fetchData(articleId);

  return (
    <Suspense fallback={<p>fetching article...</p>}>
      <ArticleView resource={resource} />
    </Suspense>
  )
}

function ArticleView({ resource }) {
  const initialArticle = resource.read();
  const [article, setArticle] = useState(initialArticle);
  const [isLoaded, setIsLoaded] = useState(null);
  const [errot, setError] = useState(null);
  
  const navigate = useNavigate();

  console.log(article);

  function editArticle(isFavorite, articleId) {
    console.log(isFavorite, articleId)

    setError(null);

    if (!isFavorite) { // 좋아요
      fetch(`http://localhost:3000/articles/${articleId}/favorite`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
      })
      .then(res=>{
        if (!res.ok) {
          throw res;
        }
        const editedArticle = {...article, isFavorite: true, favoriteCount: article.favoriteCount + 1};
        setArticle(editedArticle);
      })
      .catch(error => setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요"))
    } else {  // 좋아요 취소
      fetch(`http://localhost:3000/articles/${articleId}/favorite`, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
      })
      .then(res=>{
        if (!res.ok) {
          throw res;
        }
        const editedArticle = {...article, isFavorite: false, favoriteCount: article.favoriteCount - 1};
        setArticle(editedArticle);
      })
      .catch(error => setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요"))
    }
  }

  function deleteArticle(articleId) {
    
    setIsLoaded(false);
    setError(null);

    fetch(`http://localhost:3000/articles/${articleId}`, {
      method: "DELETE",
      headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
    })
    .then(res => {
      if(!res.ok) {
        throw res;
      }
      navigate("/",{replace: true})
    })
    .catch(error => {
      setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
    })
  }
  return (
    <>
      <ArticleItem
        article={article}
        editArticle={editArticle}
        deleteArticle={deleteArticle}
      />
    </>
  )
}