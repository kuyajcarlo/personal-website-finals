import { useEffect, useState } from 'react'

// Helper component for the falling particles
const Particles = ({ mood }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate 30 random particles whenever the mood changes
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      delay: Math.random() * 5 + 's',
      duration: mood === 'arctic-mode' ? '1.5s' : '4s', // Fast for Arctic, slow for CAS
      size: Math.random() * 4 + 2 + 'px'
    }))
    setParticles(newParticles)
  }, [mood])

  return (
    <div className="particle-container">
      {particles.map(p => (
        <div 
          key={p.id} 
          className={`particle ${mood}`}
          style={{ 
            left: p.left, 
            animationDelay: p.delay, 
            animationDuration: p.duration,
            width: p.size,
            height: p.size
          }} 
        />
      ))}
    </div>
  )
}

export default function PartyRoom({
  playlist,
  currentTrack,
  setCurrentTrack,
  volume,
  setVolume,
  autoplayAllowed,
  setAutoplayAllowed
}) {
  const currentMood = playlist[currentTrack].mood

  // Handle container mood class
  useEffect(() => {
    const container = document.getElementById('party-room-container')
    if (container) {
      container.className = `party-room ${currentMood}`
    }
  }, [currentMood])

  const handleUserInteraction = () => setAutoplayAllowed(true)

  return (
    <div
      id="party-room-container"
      onClick={handleUserInteraction}
      onKeyDown={handleUserInteraction}
      className={`party-room ${currentMood}`}
    >
      {/* 1. Added Particles Component */}
      <Particles mood={currentMood} />

      <div className="party-content">
        <h1>🎉 Party Room</h1>

        <div className="track-buttons">
          {/* 2. Added conditional classes to buttons for styling */}
          <button 
            className={`btn-mood ${currentTrack === 'arctic' ? 'active-arctic' : ''}`}
            onClick={() => setCurrentTrack('arctic')}
          >
            505
          </button>
          <button 
            className={`btn-mood ${currentTrack === 'cas' ? 'active-cas' : ''}`}
            onClick={() => setCurrentTrack('cas')}
          >
            Apocalypse
          </button>
        </div>

        <div className="volume-control">
          <label>Volume:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}