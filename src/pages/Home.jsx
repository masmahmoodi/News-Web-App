import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { fetchNews } from "../api/news"; // make sure this path is correct

export default function Home() {
  const [articles, setArticles] = React.useState([]);
  const location = useLocation();
  const searchTerm = location.state?.searchTerm;

  React.useEffect(() => {
    fetchNews(searchTerm).then((data) => {
      setArticles(data.articles || []);
    });
  }, [searchTerm]);

  const articlesToDisplay = articles.map((article, index) => (
    <div className="article-card" key={index}>
      {article.urlToImage && (
        <img className="article-image" src={article.urlToImage} alt="News" />
      )}
      <div className="article-content">
        <h3 className="article-title">{article.title}</h3>
        <p className="article-author">
          By {article.author || "Unknown Author"}
        </p>
        <p className="article-date">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <p className="article-description">{article.description}</p>
        <NavLink className="article-link" state={{ article }} to="article">
          Read More →
        </NavLink>
      </div>
    </div>
  ));

  return (
    <div className="articles-wrapper">
      {articles.length === 0 ? (
        <div className="no-results">
          <h2>No articles found</h2>
          <p>Try searching for a different topic or check your spelling.</p>
        </div>
      ) : (
        articlesToDisplay
      )}
    </div>
  );
}
