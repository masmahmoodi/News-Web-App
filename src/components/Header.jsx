import React from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
console.log(logo)
export default function Header() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="News App Logo" />
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/sources">Sources</Link>
      </div>
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input type="search" placeholder="Search news..." />
        <button type="submit">Search</button>
      </form>
    </nav>
  )
}
