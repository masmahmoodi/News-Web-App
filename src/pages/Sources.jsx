import React from "react";

export default function Sources() {
  const key = "bc2744d9a2b14eaf8a6ed3265ee20719";
  const [sources, setSources] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines/sources?apiKey=${key}`;
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const encodedUrl = encodeURIComponent(url);

    fetch(`${proxyUrl}${encodedUrl}`)
      .then((res) => res.json())
      .then((data) => {
        const parsed = JSON.parse(data.contents);
        setSources(parsed.sources || []);
        setLoading(false);
      });
  }, []);

  const sourcesToDisplay = sources.map((source, index) => (
    <div className="source-card" key={index}>
      <h2 className="source-name">{source.name}</h2>
      <p className="source-description">{source.description}</p>
      <p><strong>Category:</strong> {source.category}</p>
      <p><strong>Language:</strong> {source.language}</p>
      <p><strong>Country:</strong> {source.country}</p>
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="source-link"
      >
        Visit Website
      </a>
    </div>
  ));

  return (
    <div className="sources-wrapper">
      <h1 className="sources-title">News Sources</h1>
      {loading ? (
        <p style={{ textAlign: "center", color: "#ccc" }}>Loading sources...</p>
      ) : (
        <div className="sources-grid">{sourcesToDisplay}</div>
      )}
    </div>
  );
}
