import { Suspense, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import wrapPromise from "./wrapPromise";

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

  return (
    <>
      <h1>Article View</h1>
      <h3>{article.user.username}</h3>
      <p>{article.description}</p>
      <small>{new Date(article.created).toLocaleDateString()}</small>
    </>
  )
}