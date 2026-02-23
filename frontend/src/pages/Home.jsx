import { Link, useNavigate } from 'react-router-dom'
import CommentsSection from '../components/CommentsSection'

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <section className="hero-section">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-image-wrap">
            <img src="/images/MyProfile.jpg" alt="John Carlo E Baracena" className="profile-image" />
            <div className="level-badge">LVL 20</div>
          </div>
          <h1 className="profile-name">John Carlo E Baracena</h1>
          <p className="profile-subtitle">Web Developer &amp; Gaming Enthusiast</p>

        </div>

        {/* Right Side */}
        <div className="info-right">
          <div className="info-cards-grid">
            <div className="info-card">
              <div className="card-icon"><i className="bi bi-person-circle"></i></div>
              <h3>About</h3>
              <p>20 y/o aspiring IT professional who loves gaming, coding, and visual design.</p>
            </div>
            <div className="info-card">
              <div className="card-icon"><i className="bi bi-code-slash"></i></div>
              <h3>Skills</h3>
              <p>HTML, CSS, Python, SQL, Java, React</p>
            </div>
            <div className="info-card">
              <div className="card-icon"><i className="bi bi-folder-fill"></i></div>
              <h3>Projects</h3>
              <p>Reservation app, Game UI prototypes</p>
            </div>
            <div className="info-card">
              <div className="card-icon"><i className="bi bi-envelope-fill"></i></div>
              <h3>Contact</h3>
              <p>johncarlobaracena@gmail.com</p>
            </div>
          </div>

          <div className="gallery-preview-wrap" onClick={() => navigate('/gallery')}>
            <img src="/images/MyProfile.jpg" alt="Gallery Preview" />
            <div className="gallery-overlay">
              <span>VIEW GALLERY</span>
            </div>
          </div>
        </div>
      </section>

      <CommentsSection />
    </>
  )
}
