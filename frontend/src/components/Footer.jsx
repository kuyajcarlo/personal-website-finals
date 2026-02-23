import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>&copy; 2026 John Carlo E Baracena — Gamer Portfolio</p>
        <div className="footer-links">
          <Link to="/resources">Resources</Link>
          <a href="mailto:johncarlobaracena@gmail.com">
            <i className="bi bi-envelope-fill"></i> Email
          </a>
        </div>
      </div>
    </footer>
  )
}
