import { Link } from "react-router-dom";

export default function ArticleList({ articles }) {
    const articleList = articles.map(article => (
        <Link
            key={article._id}
            className="h-40 bg-gray-100"
            to={`/p/${article._id}`}
        >
            <img
                src={`http://localhost:3000/articles/${article.photos[0]}`}
                alt="thumbnail"
                className="w-full h-full object-cover"
                
            />
        </Link>
    ))

    return (
        <div className="grid grid-cols-3 gap-1">
            {articleList}
        </div>
    )
}