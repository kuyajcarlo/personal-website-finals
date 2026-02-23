import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <div className="profile-page">
      <Link to="/" className="home-fab" title="Back to Home">
        <i className="bi bi-house-door-fill"></i>
      </Link>

      <div className="profile-layout">
        {/* Left Column */}
        <div className="left-col">
          <div className="avatar-card">
            <img src="/images/MyProfile.jpg" alt="John Carlo E Baracena" />
          </div>

          <div className="basic-info-card">
            <h2>JOHN CARLO E BARACENA</h2>
            <div className="info-row">
              <i className="bi bi-telephone-fill"></i>
              <span>09063605941</span>
            </div>
            <div className="info-row">
              <i className="bi bi-envelope-fill"></i>
              <span>johncarlobaracena@gmail.com</span>
            </div>
            <div className="info-row">
              <i className="bi bi-envelope-at-fill"></i>
              <span>jebaracena@student.apc.edu.ph</span>
            </div>

            <a href="/images/MyProfile.jpg"  className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block', fontSize: '0.85rem' }}>
              <i className="bi bi-profile"></i>
            </a>

            <div className="social-icons">
              <a href="https://www.facebook.com/gwapo.ko.tlg" target="_blank" rel="noreferrer">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com/goddamn.carlo/" target="_blank" rel="noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/in/john-carlo-baracena-b13181322/" target="_blank" rel="noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com/kuyajcarlo" target="_blank" rel="noreferrer">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-col">
          {/* About */}
          <div className="info-block">
            <h3><i className="bi bi-person-circle"></i> ABOUT ME</h3>
            <p><strong>Age:</strong> 20 years old &nbsp;|&nbsp; <strong>Birthday:</strong> May 10, 2005</p>
            <p style={{ marginTop: '0.75rem' }}>
              I am a student at Asia Pacific College, currently pursuing a degree in Information Technology.
              I am passionate about web development, creating user interfaces, and exploring gaming experiences.
              I love combining my technical skills with creative design to build engaging digital projects.
            </p>
          </div>

          {/* Skills & Hobbies */}
          <div className="two-col-grid">
            <div className="info-block">
              <h3><i className="bi bi-code-slash"></i> SKILLS</h3>
              <ul className="tag-list">
                <li>Java Programming</li>
                <li>Python Programming</li>
                <li>SQL Queries</li>
                <li>HTML &amp; CSS</li>
                <li>React / Vue.js</li>
                <li>Business Management</li>
              </ul>
            </div>

            <div className="info-block">
              <h3><i className="bi bi-controller"></i> HOBBIES</h3>
              <ul className="tag-list">
                <li>Gaming</li>
                <li>Cycling</li>
                <li>Badminton</li>
                <li>Manga &amp; Manhwa</li>
                <li>Watching Movies</li>
                <li>Loves Dogs &amp; Cats</li>
                <li>Writing Stories</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="info-block">
            <h3><i className="bi bi-book-fill"></i> EDUCATION</h3>
            <ul className="edu-list">
              <li>
                <span className="edu-label">ELEMENTARY</span>
                San Juan Nepumuceno School
              </li>
              <li>
                <span className="edu-label">JUNIOR HIGH (GRADE 7)</span>
                Domini Angelicus Integrated School
              </li>
              <li>
                <span className="edu-label">JUNIOR HIGH</span>
                APEC ROXAS BLVD.
              </li>
              <li>
                <span className="edu-label">SENIOR HIGH SCHOOL</span>
                Pasay South High School
              </li>
              <li>
                <span className="edu-label">COLLEGE (CURRENT)</span>
                Asia Pacific College — BS Information Technology
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div className="info-block">
            <h3><i className="bi bi-folder-fill"></i> PROJECTS</h3>
            <div className="project-list">
              <div className="project-item">
                <strong>RESERVATION SYSTEM</strong>
                <p>A web-based application for managing reservations, built with HTML, CSS, and a backend database.</p>
              </div>
              <div className="project-item">
                <strong>GAME UI PROTOTYPES</strong>
                <p>Design mockups and interactive prototypes for gaming interfaces using modern CSS and JavaScript.</p>
              </div>
              <div className="project-item">
                <strong>PERSONAL PORTFOLIO (THIS SITE)</strong>
                <p>A full-stack portfolio website built with React + Flask + Supabase, deployed on Vercel and Render.</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/gallery" className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2.5rem' }}>
              <i className="bi bi-images"></i> View My Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
