import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
          <img src="/images/MyProfile.jpg" alt="Carlo" className="nav-logo" />
          <span className="brand-text">CARLO</span>
        </Link>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li><NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/profile" onClick={() => setOpen(false)}>About Me</NavLink></li>
          <li><NavLink to="/gallery" onClick={() => setOpen(false)}>Gallery</NavLink></li>
          <li><a href="/#comments" onClick={() => setOpen(false)}>Comments</a></li>
          <li><NavLink to="/resources" onClick={() => setOpen(false)}>Resources</NavLink></li>
        </ul>

        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <i className={`bi bi-${open ? 'x-lg' : 'list'}`}></i>
        </button>
      </div>
    </nav>
  )
}
