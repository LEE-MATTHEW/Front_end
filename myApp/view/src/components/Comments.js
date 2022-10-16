import { Suspense, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "./AuthContext";
import wrapPromise from "./wrapPromise";
import Avatar from "./Avatar";
import ModalWindow from "./ModalWindow";

function fetchData(articleId) {
  const promise = fetch(`http://localhost:3000/articles/${articleId}/comments`, {
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json()
    })
  return wrapPromise(promise);
}

export default function () {
  const params = useParams();
  const articleId = params.articleId;
  const resource = fetchData(articleId);

  return (
    <Suspense fallback={<p>fetching comments...</p>}>
      <Comments
        articleId={articleId}
        resource={resource}
      />
    </Suspense>
  )
}

function Comments({ articleId, resource }) {
  const initialComments = resource.read();
  const [comments, setComments] = useState(initialComments);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [message, setMessage] = useState("");

  function createComment(text, setText) {
    setIsLoaded(false);
    setError(null);
    setMessage("");

    const formData = JSON.stringify({ content: text });

    fetch(`http://localhost:3000/articles/${articleId}/comments`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: formData
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(newComment => {
        setComments([newComment, ...comments]);
        setText("");
        setMessage("댓글이 추가되었습니다")
      })
      .catch(err => {
        console.log(err);
        setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
      })
      .finally(() => setIsLoaded(true))
  }


  function editComment(isFavorite, commentId) {
    setError(null);

    if (!isFavorite) {
      fetch(`http://localhost:3000/comments/${commentId}/favorite`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      })
        .then(res => {
          if (!res.ok) {
            throw res;
          }
          const editCommentList = comments.map(comment => {
            if (commentId === comment._id) {
              return { ...comment, isFavorite: true, favoriteCount: comment.favoriteCount + 1 }
            }
            return comment;
          })
          setComments(editCommentList);
        })
        .catch(error => {
          setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
        })
    } else {
      fetch(`http://localhost:3000/comments/${commentId}/favorite`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      })
        .then(res => {
          if (!res.ok) {
            throw res;
          }
          const editCommentList = comments.map(comment => {
            if (commentId === comment._id) {
              return { ...comment, isFavorite: false, favoriteCount: comment.favoriteCount - 1 }
            }
            return comment;
          })
          setComments(editCommentList);
        })
        .catch(error => {
          setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
        })
    }
  }

  function deleteComment(commentId) {
    setIsLoaded(false);
    setError(null);
    setMessage("");

    fetch(`http://localhost:3000/comments/${commentId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        const updatedComments = comments.filter(comment => comment._id !== commentId);
        setComments(updatedComments);
        setMessage("댓글이 삭제되었습니다")
      })
      .catch(error => {
        setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요")
      })
      .finally(() => setIsLoaded(true));
  }

  const commentList = comments.map(comment => (
    <div key={comment._id} className="">
      <Comment
        comment={comment}
        editComment={editComment}
        deleteComment={deleteComment}

      />
    </div>
  ))
  return (
    <div className="mt-3 px-3">
      <h1 className="text-2xl mb-3">댓글</h1>

      <Form createComment={createComment} />

      {commentList}
    </div>
  )
}

function Form({ createComment }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    createComment(text, setText)
  }

  function handleChange(e) {
    setText(e.target.value);

  }
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <textarea
        type="text"
        name="text"
        className="border w-full p-1 outline-none"
        value={text}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="border p-1 disabled:text-gray-300"
        disabled={!text.trim()}
      >
        Submit
      </button>
    </form>
   
  )
}

function Comment({ comment, editComment, deleteComment }) {
  const auth = useContext(AuthContext);
  const isMaster = auth.user.username === comment.user.username;

  return (
    <>
      {/* 아바타, 더보기 버튼 */}
      <div className="flex justify-between mb-2">
        <Avatar user={comment.user}/>
        {isMaster &&
        <ModalWindow>
          <li className="border-b">
            <button
              className="p-1 text-center w-full text-red-500"
              onClick={()=>deleteComment(comment._id)}
            >
              Delete
            </button>
          </li>
        </ModalWindow>}
      </div>

      {/* 댓글 내용 */}
      <div className="mb-2">{comment.content}</div>


      {/* 댓글 좋아요 버튼 */}
      <div className="flex mb-2">
        <button
          className="btn btn-link"
          onClick={() => editComment(comment.isFavorite, comment._id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="10" height="10">
            <path fill={comment.isFavorite ? "#f00" : "#ddd"} d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
          </svg>
        </button>
        <p className="ml-1 text-xs">{comment.favoriteCount} likes</p>
      </div>
      
      {/* 댓글 작성 일자 */}

      <div className="text-xs text-gray-400 mb-2">{comment.created}</div>
    </>
  )


}