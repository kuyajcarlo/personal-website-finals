import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar({ setTrack, volume, setVolume }) {
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
          <li><NavLink to="/party" onClick={() => setOpen(false)}>Party Room</NavLink></li>
          {/* 🎵 MUSIC CONTROLS */}
          <li className="music-controls">
            <button
              className="music-btn"
              onClick={() => {
                setTrack("arctic")
                setOpen(false)
              }}
            >
              505
            </button>

            <button
              className="music-btn"
              onClick={() => {
                setTrack("cas")
                setOpen(false)
              }}
            >
              Apocalypse
            </button>
            
            <button
              className="music-btn"
              onClick={() => {
                setTrack("kanibalismo")
                setOpen(false)
              }}
            >
              Kanibalismo II
            </button>


            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
            />

            <div className="equalizer">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </li>
        </ul>

        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <i className={`bi bi-${open ? 'x-lg' : 'list'}`}></i>
        </button>
      </div>
    </nav>
  )
}