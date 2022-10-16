import { Link } from "react-router-dom";

export default function Avatar({user}) {
    return (
        <Link to={`/profile/${user.username}`} className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                    src={`http://localhost:3000/users/${user.image || "avatar.png"}`}
                    className="w-full h-full object-cover" 
                />
            </div>
            <div className="ml-2">
                {user.username}
            </div>
        </Link>
    )
}