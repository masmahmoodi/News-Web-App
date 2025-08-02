import React from "react"
import { useLocation } from "react-router-dom"

export default function Article() {
  const location = useLocation()
  const article = location.state?.article

  if (!article) return <p className="article-not-found">Article not found.</p>

  return (
    <div className="article-detail-wrapper">
      {article.image && (
        <img className="article-detail-image" src={article.image} alt="News" />
      )}
      <div className="article-detail-content">
        <h1 className="article-detail-title">{article.title}</h1>
        <p className="article-detail-meta">
          <strong>Author:</strong> {article.source?.name || "Unknown"} |{" "}
          <strong>Published:</strong>{" "}
          {new Date(article.publishedAt).toLocaleString()}
        </p>
        <p className="article-detail-description">{article.description}</p>
        {article.content && (
          <p className="article-detail-content-text">{article.content}</p>
        )}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="article-detail-link"
        >
          View Full Article ↗
        </a>
      </div>
    </div>
  )
}
