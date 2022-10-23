import { Fallback } from "./Progress"
import wrapPromise from "./wrapPromise";
import { Suspense } from "react"
import { useParams } from "react-router-dom";
import Avatar from "./Avatar"

// 서버에서 데이터 불러오기
function fetchData(username) {

  const promise = fetch(`http://localhost:3000/profiles/${username}/followers`, {
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
  // 유저이름을 받아오기
  const params = useParams();
  const username = params.username;
  // 서버로부터 응답받는 값
  const resource = fetchData(username);

  return (
    <Suspense fallback={<Fallback />}>
      <FollowerList resource={resource} />
    </Suspense>
  )
}

function FollowerList({ resource }) {
  const follows = resource.read();

  console.log(follows)

  const followerList = follows.map(follow => (
    <div
      className="mb-3"
      key={follow._id}>
      <Avatar user={follow.follower} />
    </div>
  ))

  return (
    <div className="mt-3 px-3">
      <h1 className="text-2xl mb-3">팔로워</h1>
      {followerList}
    </div>
  )
}
