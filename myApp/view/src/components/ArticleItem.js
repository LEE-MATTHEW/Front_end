import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext"
import Carousel from "./Carousel";
import Avatar from "./Avatar";

export default function ArticleItem({ article, editArticle, deleteArticle }) {
  return (
    <>
      <h1>Article</h1>
      <Avatar user={article.user} />

      <div className="">
        <button 
          type="button"
          onClick={()=>deleteArticle(article._id)}
        >
          삭제
        </button>
      </div>

      <Carousel photos={article.photos} />

      <div className="">
        <button
          type="button"
          onClick={() => editArticle(article.isFavorite, article._id)}
          >
          {article.isFavorite ? "좋아요 취소" : "좋아요"}
        </button>
      </div>
      <p>{article.description}</p>
      <small>{new Date(article.created).toLocaleDateString()}</small>
      <p>
        <Link to={`/p/${article._id}/comments`}>댓글보기</Link>
      </p>
    </>
  )
} 