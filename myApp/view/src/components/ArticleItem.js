import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext"
import Carousel from "./Carousel";
import Avatar from "./Avatar";
import ModalWindow from "./ModalWindow";



export default function ArticleItem({ article, editArticle, deleteArticle }) {

  const auth = useContext(AuthContext);
  const isMaster = auth.user.username === article.user.username;

  return (
    <>
      {/* 모달 */}
      <div className="flex justify-between px-3 mt-3 mb-2">
        <Avatar user={article.user} />
        {isMaster &&
          <ModalWindow>
            {/* ModalWindow의 children을 전달한다 */}
            <li className="border-b">
              <button
                className="p-1 text-center w-full text-red-500"
                onClick={() => deleteArticle(article._id)}
              >
                Delete
              </button>
            </li>
          </ModalWindow>
        }
      </div>

      {/* 이미지 */}
      <Carousel photos={article.photos} />

      <div className="px-3">
        {/* 좋아요 */}
        <div className="flex mb-2">
          <button
            className=""
            onClick={() => editArticle(article.isFavorite, article._id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
              <path fill={article.isFavorite ? "#f00" : "#ddd"} d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            </svg>
          </button>
          <p className="ml-2">{article.favoriteCount} likes</p>
        </div>
        {/* 사진설명 */}
        <div className="mb-2">
          <p>
            <span className="font-bold">{article.user.username}</span> {" "}
            {article.description}
          </p>
        </div>
        {/* 댓글 이동 버튼 */}
        <div className="mb-2">
          <Link to={`/p/${article._id}/comments`} className="text-gray-400">댓글</Link>
        </div>
        {/* 게시물 올린 날짜 */}
        <div className="text-xs text-gray-400">
          {article.created}
        </div>
      </div>
    </>
  )
} 