import { Suspense, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import wrapPromise from "./wrapPromise";
import AuthContext from "./AuthContext";

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
  const auth = useContext(AuthContext);

  const initialProfile = resource.profile.read();
  const [profile, setProfile] = useState(initialProfile);

  console.log(initialProfile)

  return (
    <>
      <div className="">
        <h3>{profile.username}</h3>
        <p>{profile.bio}</p>
        <button onClick={auth.signOut}>Logout</button>
        <Link to="/account/edit">Edit profile</Link>
      </div>
    </>
  )
}

function ProfileTimeline({ resource }) {
  const initialArticles = resource.articles.read();
  const [articles, setArticles] = useState(initialArticles);

  return (
    <ul>
      {articles.map(article => (
        <li key={article._id}>
          <Link to={`/p/${article._id}`}>
            {article.description}
          </Link>
        </li>
      ))}
    </ul>
  )
}
