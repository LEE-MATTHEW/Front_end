import { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import wrapPromise from "./wrapPromise";

function fetchData() {
  const promise = fetch(`http://localhost:3000/articles`, {
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
  const articles = resource.read();
  return (
    <>
      <h1>Explore</h1>
      <p>
        <Link to={"/search"}>검색</Link>
      </p>
      <ul>
        {articles.map(article => (
          <li key={article._id}>
            <Link to={`/p/${article._id}`}>
              {article.description}
            </Link>
          </li>
        ))}
      </ul>

    </>
  )
}