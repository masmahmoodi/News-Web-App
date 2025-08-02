import React from "react"

export default function Sources() {
  const key = "b2aa7ffdd5b1356857bddfbb1eb64e94"
  const [sources, setSources] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
 
  React.useEffect(() => {
    const url = `https://gnews.io/api/v4/top-headlines?token=${key}&lang=en`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Status: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const uniqueSources = Array.from(
          new Map(
            (data.articles || []).map((a) => [a.source?.url, a.source])
          ).values()
        )
        setSources(uniqueSources.filter(Boolean))
      })
      .catch((err) => {
        console.error("Failed to fetch sources:", err)
        setSources([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const sourcesToDisplay = sources.map((source, index) => (
    <div className="source-card" key={index}>
      <h2 className="source-name">{source.name}</h2>
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="source-link"
      >
        Visit Website
      </a>
    </div>
  ))

  return (
    <div className="sources-wrapper">
      <h1 className="sources-title">News Sources</h1>
      {isLoading ? (
        <div className="loading-indicator">
          <h2>Loading sources...</h2>
        </div>
      ) : (
        <div className="sources-grid">{sourcesToDisplay}</div>
      )}
    </div>
  )
}
