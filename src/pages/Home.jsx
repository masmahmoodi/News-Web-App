import React from "react"

export default function Home() {
  const key = "bc2744d9a2b14eaf8a6ed3265ee20719"
  const [articles, setArticles] = React.useState([])

  React.useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`)
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
  }, [])

  const articlesToDisplay = articles.map((article, index) => {
    return (
      <div className="article-card" key={index}>
        {article.urlToImage && (
          <img className="article-image" src={article.urlToImage} alt="News" />
        )}
        <div className="article-content">
          <h3 className="article-title">{article.title}</h3>
          <p className="article-author">By {article.author || "Unknown Author"}</p>
          <p className="article-date">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <p className="article-description">{article.description}</p>
          <a
            className="article-link"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More →
          </a>
        </div>
      </div>
    )
  })

  return <div className="articles-wrapper">{articlesToDisplay}</div>
}
