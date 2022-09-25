import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext"

export default function ArticleItem({article}) {
  return (
    <>
      <h1>Article</h1>
      <h3>{article.user.username}</h3>

      <div className="">
        {article.photos.map((photo, index)=> (
          <img 
            key={index}
            src={`http://localhost:3000/articles/${photo}`}
            width="200"
          />
        ))}
      </div>
      <p>{article.description}</p>
      <small>{new Date(article.created).toLocaleDateString()}</small>
      <p>
        <Link to={`/p/${article._id}/comments`}>댓글보기</Link>
      </p>
    </>
  )
} 