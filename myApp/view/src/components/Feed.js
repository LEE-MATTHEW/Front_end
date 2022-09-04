import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import wrapPromise from "./wrapPromise";


function fetchData() {
  const promise = fetch(`http://localhost:3000/feed`,{
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

  return (
    <>
    <h1>Feed</h1>
    <ul>
      {articles.map(article => (
        <li key={article._id}>
          <h3>{article.user.username}</h3>
          <p>{article.description}</p>
          <small>{new Date(article.created).toLocaleDateString()}</small>
        </li>
      ))}
    </ul>
    </>
  )
}
