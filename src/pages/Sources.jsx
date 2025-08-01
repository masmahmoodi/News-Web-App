
import React, { useEffect, useState } from "react";
import { getSources } from "../api/news"; // adjust path if needed

export default function Sources() {
    const [sources, setSources] = useState([]);

    useEffect(() => {
        async function fetchSources() {
            const data = await getSources();
            setSources(data);
        }

        fetchSources();
    }, []);

    const sourcesToDisplay = sources.map((source, index) => (
        <div className="source-card" key={index}>
            <h2 className="source-name">{source.name}</h2>
            <p className="source-description">{source.description}</p>
            <p><strong>Category:</strong> {source.category}</p>
            <p><strong>Language:</strong> {source.language}</p>
            <p><strong>Country:</strong> {source.country}</p>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="source-link">
                Visit Website
            </a>
        </div>
    ))

    return (
        <div className="sources-wrapper">
            <h1 className="sources-title">News Sources</h1>
            <div className="sources-grid">
                {sourcesToDisplay}
            </div>
        </div>
    )
}


