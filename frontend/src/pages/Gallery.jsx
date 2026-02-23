import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────
   HOW TO ADD YOUR PHOTOS:
   1. Put your images in: frontend/public/images/me/
      frontend/public/images/friends/
      frontend/public/images/random/
   2. Name them: Me(1).jpg, Me(2).jpg, ... etc.
      Friends(1).jpg, Friends(2).jpg ... etc.
      Random(1).jpg, Random(2).jpg ... etc.
   3. Update the counts below to match how many you have.
───────────────────────────────────────────────────── */
const ME_COUNT      = 13   // ← change to match your Me folder
const FRIENDS_COUNT = 30   // ← change to match your Friends folder
const RANDOM_COUNT  = 11   // ← change to match your Random folder

function buildPhotos() {
  const arr = []
  for (let i = 1; i <= ME_COUNT; i++)
    arr.push({ src: `/images/me/Me(${i}).jpg`, cat: 'me', alt: `Me ${i}` })
  for (let i = 1; i <= FRIENDS_COUNT; i++)
    arr.push({ src: `/images/friends/Friends&Family(${i}).jpg`, cat: 'friends', alt: `Friends ${i}` })
  for (let i = 1; i <= RANDOM_COUNT; i++)
    arr.push({ src: `/images/random/Random(${i}).jpg`, cat: 'random', alt: `Random ${i}` })
  return arr
}

const ALL_PHOTOS = buildPhotos()
const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Me', value: 'me' },
  { label: 'Family & Friends', value: 'friends' },
  { label: 'Random', value: 'random' },
]

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const visible = activeFilter === 'all'
    ? ALL_PHOTOS
    : ALL_PHOTOS.filter(p => p.cat === activeFilter)

  const openLightbox = (idx) => setLightboxIdx(idx)
  const closeLightbox = () => setLightboxIdx(null)

  const prev = useCallback(() => {
    setLightboxIdx(i => (i - 1 + visible.length) % visible.length)
  }, [visible.length])

  const next = useCallback(() => {
    setLightboxIdx(i => (i + 1) % visible.length)
  }, [visible.length])

  useEffect(() => {
    function onKey(e) {
      if (lightboxIdx === null) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIdx, next, prev])

  return (
    <div className="gallery-page">
      <Link to="/" className="home-fab" title="Back to Home">
        <i className="bi bi-house-door-fill"></i>
      </Link>

      <div className="gallery-header">
        <h1 className="gallery-title">MY GALLERY</h1>
      </div>

      <div className="gallery-controls">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="photo-grid">
        {visible.map((photo, idx) => (
          <div className="photo-card" key={photo.src} onClick={() => openLightbox(idx)}>
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <div className={`lightbox ${lightboxIdx !== null ? 'open' : ''}`} onClick={e => { if (e.target === e.currentTarget) closeLightbox() }}>
        <button className="lb-close" onClick={closeLightbox}>&times;</button>
        <button className="lb-nav lb-prev" onClick={prev}>
          <i className="bi bi-chevron-left"></i>
        </button>
        {lightboxIdx !== null && (
          <img src={visible[lightboxIdx]?.src} alt={visible[lightboxIdx]?.alt} />
        )}
        <button className="lb-nav lb-next" onClick={next}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}
