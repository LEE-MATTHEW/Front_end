import { useContext, Suspense } from "react"
import { Link, Outlet, Navigate } from "react-router-dom"
import AuthContext from "./AuthContext";

export default function () {

  const auth = useContext(AuthContext);

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Feed</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/create">Create</Link></li>
          <li><Link to={`/profiles/${auth.user.username}`}>Profile</Link></li>
        </ul>
      </nav>



      <Suspense fallback={<p>fetching component...</p>}>
        {/* Layout 라우트의 하위 라우트 */}
        <Outlet />
      </Suspense>
    </>
  )
}