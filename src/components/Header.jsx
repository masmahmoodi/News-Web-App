import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Header() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const navigate = useNavigate()
  const location = useLocation()

  function handleSubmit(e) {
    e.preventDefault()

    if (searchTerm.trim()) {
      navigate("/", { state: { searchTerm } })
      setSearchTerm("")
    }
  }

  // Determine whether to show the search bar
  const hideSearchBar =
    location.pathname.includes("/article") || location.pathname.includes("/sources")

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="News App Logo" />
      </div>
      <div className="nav-links">
        <Link to=".">Home</Link>
        <Link to="sources">Sources</Link>
      </div>

      {!hideSearchBar && (
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      )}
    </nav>
  )
}
