import { Suspense, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "./AuthContext";
import wrapPromise from "./wrapPromise";
import Avatar from "./Avatar";

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
              return { ...comment, isFavorite: true, favoritCount: comment.favoritCount + 1 }
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
              return { ...comment, isFavorite: false, favoritCount: comment.favoritCount - 1 }
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
    <>
      <h1>댓글</h1>
      <Form createComment={createComment} />
      {commentList}

    </>
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
    <>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor=""></label>
          <textarea
            type="text"
            name="text"
            className=""
            value={text}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <button
            type="submit"
            disabled={!text.trim()}
          >제출</button>
        </div>
      </form>
    </>
  )
}

function Comment({ comment, editComment, deleteComment }) {
  const auth = useContext(AuthContext);
  const isMaster = auth.user.username === comment.user.username;

  return (
    <>
      
      <Avatar user={comment.user}/>
      
      <p>{comment.content}</p>
      <div className="">
        <button
          type="button"
          onClick={() => editComment(comment.isFavorite, comment._id)}
        >
          {comment.isFavorite ? "좋아요 취소" : "좋아요"}
        </button>
      </div>
      <div>
        <button onClick={() => deleteComment(comment._id)}>
          삭제
        </button>
      </div>
      <small>{comment.created}</small>
    </>
  )


}