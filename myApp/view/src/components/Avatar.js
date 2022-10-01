import { Link } from "react-router-dom";

export default function Avatar({user}) {
    return (
        <Link to={`/profile/${user.username}`} className="flex items-center">
            <div className="">
                <img 
                    src={`http://localhost:3000/users/${user.image || "avatar.png"}`}
                    className="" 
                    width="25"
                />
            </div>
            <div className="">
                {user.username}
            </div>
        </Link>
    )
}