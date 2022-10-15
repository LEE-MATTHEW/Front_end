import { Suspense, useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import wrapPromise from "./wrapPromise";
import AuthContext from "./AuthContext";
import ArticleList from "./ArticleList";

function fetchData(username) {
  const profilePromise = fetch(`http://localhost:3000/profiles/${username}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
  const articlesPromise = fetch(`http://localhost:3000/profiles/${username}/articles`, {
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })

  return {
    profile: wrapPromise(profilePromise),
    articles: wrapPromise(articlesPromise)
  }
}

export default function () {


  const params = useParams();
  const username = params.username;
  const resource = fetchData(username);

  return (
    <Suspense fallback={<p>fetching profile...</p>}>
      <ProfileDetail resource={resource} />
      <ProfileTimeline resource={resource} />
    </Suspense>
  )
}
function ProfileDetail({ resource }) {
  const initialProfile = resource.profile.read();
  const [profile, setProfile] = useState(initialProfile);

  console.log(profile);

  const auth = useContext(AuthContext);
  const isMaster = auth.user.username === profile.username;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);

  useEffect(()=> {
    setProfile(initialProfile);
  }, [resource])


  function editFollow() {
    setError(null);
    setIsLoaded(false);



    if (!profile.isFollowing) { // 팔로우
      fetch(`http://localhost:3000/profiles/${profile.username}/follow`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      })
        .then(res => {
          if (!res.ok) {
            throw res;
          }
          const editedProfile = { ...profile, isFollowing: true }
          setProfile(editedProfile);
        })
        .catch(error => setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요"))
        .finally(() => setIsLoaded(true));

    } else {  // 팔로우 취소
      fetch(`http://localhost:3000/profiles/${profile.username}/follow`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      })
        .then(res => {
          if (!res.ok) {
            throw res;
          }
          const editedProfile = { ...profile, isFollowing: false }
          setProfile(editedProfile);
        })
        .catch(error => setError("문제가 발생했습니다. 잠시 후 다시 시도해주세요"))
        .finally(() => setIsLoaded(true));
    }
  }

  return (
    <>
      {/* 유저 이미지와 프로필 수정(팔로우 버튼) */}
      <div className="flex mt-3 mb-3 px-3">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img 
            src={`http://localhost:3000/users/${profile.image || "avatar.jpeg"}`}
            className = "w-full h-full object-cover"
          />
        </div>
        <div className="grow ml-3">
          <div className="flex flex-col">
            <div className="text-xl mb-2">{profile.username}</div>
            {isMaster ?
              <Link to="/accounts/edit" className="border p-1 text-center">
                정보 수정
              </Link>
              :
              <button
                className="border p-1 w-full"
                onClick={editFollow}
              >
                {profile.isFollowing ? "팔로잉 취소" : "팔로잉"}
              </button>
            }
          </div>
        </div>
      </div>
      {/* 자기소개 */}
      <div className="mb-3 px-3">
        <p>{profile.bio}</p>
      </div>

      {/* 팔로잉 수 / 팔로워 수 / 게시물 수 */}
      <ul className="flex border-y mb-3 py-1">
        <li className="flex flex-col items-center w-full">
          <div className="">팔로워</div>
          <Link to={`/profiles/${profile.username}/following`}>
            {profile.followersCount}
          </Link>
        </li>
        <li className="flex flex-col items-center w-full">
          <div className="">팔로잉</div>
          <Link to={`/profiles/${profile.username}/following`}>
            {profile.followingCount}
          </Link>
        </li>
        <li className="flex flex-col items-center w-full">
          <div className="">게시물</div>
          <div className="">{profile.articlesCount}</div>
        </li>
      </ul>
    </>
  )
}

function ProfileTimeline({ resource }) {
  const initialArticles = resource.articles.read();
  const [articles, setArticles] = useState(initialArticles);

  useEffect(()=> {
    setArticles(initialArticles);
  },[resource])

  return (
    <ArticleList articles={articles} />
  )
}
