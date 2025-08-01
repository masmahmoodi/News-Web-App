import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Home() {
  const key = "bc2744d9a2b14eaf8a6ed3265ee20719";
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // added
  const location = useLocation();
  const searchTerm = location.state?.searchTerm;

  React.useEffect(() => {
    setLoading(true); // start loading when searchTerm changes

    const url = searchTerm
      ? `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${key}`
      : `https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`;

    const proxyUrl = "https://api.allorigins.win/get?url=";
    const encodedUrl = encodeURIComponent(url);

    fetch(`${proxyUrl}${encodedUrl}`)
      .then((res) => res.json())
      .then((data) => {
        const parsed = JSON.parse(data.contents);
        setArticles(parsed.articles || []);
        setLoading(false); // done loading
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
      {loading ? (
        <p style={{ textAlign: "center", color: "#ccc", marginTop: "2rem" }}>
          Loading articles...
        </p>
      ) : articles.length === 0 ? (
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
