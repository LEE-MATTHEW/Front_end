import { Link } from "react-router-dom";

export default function ArticleList({ articles }) {
    const articleList = articles.map(article => (
        <Link
            key={article._id}
            className=""
            to={`/p/${article._id}`}
        >
            <img
                src={`http://localhost:3000/articles/${article.photos[0]}`}
                alt="thumbnail"
                className=""
                width="100"
            />
        </Link>
    ))

    return (
        <div className="">
            {articleList}
        </div>
    )
}