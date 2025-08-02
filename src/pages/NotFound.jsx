import React from "react"
import { useNavigate } from "react-router-dom" // Optional: for custom styles if you're using external CSS

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-subtitle">Oops! Page not found.</p>
      <p className="notfound-message">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button className="notfound-button" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>
    </div>
  )
}
