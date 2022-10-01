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
      <div className="">
        <h3>{profile.username}</h3>
        <div className="">
          {isMaster ?
            <Link to="/accounts/edit">Edit profile</Link>
            :
            <button
              type="button"
              onClick={editFollow}
            >
              {profile.isFollowing ? "팔로잉 취소" : "팔로잉"}
            </button>
          }
        </div>

        <p>{profile.bio}</p>


      </div>
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
