import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Home() {
  const key = "b2aa7ffdd5b1356857bddfbb1eb64e94";
  const [articles, setArticles] = React.useState([]);
  const location = useLocation();
  const searchTerm = location.state?.searchTerm;

  React.useEffect(() => {
    const url = searchTerm
      ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchTerm)}&token=${key}&lang=en`
      : `https://gnews.io/api/v4/top-headlines?token=${key}&lang=en`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setArticles(data.articles || []))
      .catch((err) => {
        console.error("Failed to fetch articles:", err);
        setArticles([]); // prevent hanging if API fails
      });
  }, [searchTerm]);

  const articlesToDisplay = articles.map((article, index) => (
    <div className="article-card" key={index}>
      {article.image && (
        <img className="article-image" src={article.image} alt="News" />
      )}
      <div className="article-content">
        <h3 className="article-title">{article.title}</h3>
        <p className="article-author">
          By {article.source?.name || "Unknown Author"}
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
