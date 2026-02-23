import { Link } from 'react-router-dom'

const sections = [
  {
    icon: 'bi-code-square',
    title: 'Frameworks & Libraries',
    items: [
      { name: 'React', desc: 'Frontend JavaScript library', url: 'https://react.dev/' },
      { name: 'React Router DOM', desc: 'Client-side routing for React', url: 'https://reactrouter.com/' },
      { name: 'Vite', desc: 'Fast frontend build tool', url: 'https://vitejs.dev/' },
    ],
  },
  {
    icon: 'bi-server',
    title: 'Backend & Database',
    items: [
      { name: 'Flask', desc: 'Python micro web framework for REST API', url: 'https://flask.palletsprojects.com/' },
      { name: 'Supabase', desc: 'Open-source Firebase alternative — PostgreSQL database', url: 'https://supabase.com/' },
      { name: 'supabase-py', desc: 'Python client for Supabase', url: 'https://github.com/supabase-community/supabase-py' },
    ],
  },
  {
    icon: 'bi-cloud-upload',
    title: 'Hosting & Deployment',
    items: [
      { name: 'Vercel', desc: 'Frontend hosting platform for React app', url: 'https://vercel.com/' },
      { name: 'GitHub', desc: 'Version control and source code hosting', url: 'https://github.com/' },
    ],
  },
  {
    icon: 'bi-tools',
    title: 'Development Tools',
    items: [
      { name: 'Visual Studio Code', desc: 'Code editor', url: 'https://code.visualstudio.com/' },
    ],
  },
  {
    icon: 'bi-check-circle',
    title: 'Validators',
    items: [
      { name: 'W3C HTML Validator', desc: 'HTML markup validation service', url: 'https://validator.w3.org/' },
      { name: 'W3C CSS Validator', desc: 'CSS validation service', url: 'https://jigsaw.w3.org/css-validator/' },
    ],
  },
  {
    icon: 'bi-palette',
    title: 'Design Inspiration',
    items: [
      { name: 'One Page Love', desc: 'Single page website design inspiration', url: 'https://onepagelove.com/' },
      { name: 'Dribbble', desc: 'Design inspiration community', url: 'https://dribbble.com/' },
      { name: 'Google Fonts', desc: 'Orbitron, Rajdhani, Share Tech Mono fonts', url: 'https://fonts.google.com/' },
    ],
  },
  {
    icon: 'bi-book',
    title: 'Learning Resources',
    items: [
      { name: 'MDN Web Docs', desc: 'Web development documentation', url: 'https://developer.mozilla.org/' },
      { name: 'W3Schools', desc: 'Web development tutorials', url: 'https://www.w3schools.com/' },
    ],
  },
  {
    icon: 'bi-robot',
    title: 'AI Assistance',
    items: [
      {
        name: 'Claude AI by Anthropic',
        desc: 'AI assistant for code generation, debugging, and design improvements',
        url: 'https://claude.ai/',
        note: 'Used for: full-stack architecture, React conversion, REST API integration',
      },
    ],
  },
]

export default function Resources() {
  return (
    <div className="resources-page">
      <Link to="/" className="home-fab" title="Back to Home">
        <i className="bi bi-house-door-fill"></i>
      </Link>

      <div className="resources-card">
        <h1><i className="bi bi-bookmark-star-fill"></i> Resources Used</h1>
        <p>All resources, tools, and references used to build this portfolio website.</p>

        {sections.map(sec => (
          <div key={sec.title}>
            <h3 className="res-section-title">
              <i className={`bi ${sec.icon}`}></i> {sec.title}
            </h3>
            <ul className="res-list">
              {sec.items.map(item => (
                <li key={item.name}>
                  <strong>{item.name}</strong> — {item.desc}<br />
                  <a href={item.url} target="_blank" rel="noreferrer">{item.url}</a>
                  {item.note && <><br /><em>{item.note}</em></>}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="note-box">
          <h4><i className="bi bi-info-circle"></i> Note</h4>
          <p>
            All resources listed were used in accordance with their respective licenses and terms of use.
            This project was created for educational purposes as part of a web programming course at Asia Pacific College.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2.5rem' }}>
            <i className="bi bi-house-door"></i> Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
