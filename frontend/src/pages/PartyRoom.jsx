import { useEffect, useState } from 'react'

const Particles = ({ mood }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      delay: Math.random() * 5 + 's',
      duration: mood === 'arctic-mode' ? '1.5s' : mood === 'kanibalismo-mode' ? '2s' : '4s',
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
  setAutoplayAllowed
}) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const currentMood = playlist[currentTrack].mood

  // Time Tracking Logic
  useEffect(() => {
    const audio = document.querySelector('audio')
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration || 0)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateTime)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateTime)
    }
  }, [currentTrack])

  const formatTime = (time) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Seek Functionality (Click to skip)
  const handleSeek = (e) => {
    const audio = document.querySelector('audio')
    if (!audio) return
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const clickedValue = (x / rect.width) * duration
    audio.currentTime = clickedValue
  }

  return (
    <div id="party-room-container" className={`party-room ${currentMood}`} onClick={() => setAutoplayAllowed(true)}>
      <Particles mood={currentMood} />

      <div className="party-content">
        <h1>🎉 Party Room</h1>

        {/* --- TIME TRACKER --- */}
        <div className="time-tracker">
          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="progress-bar-container" onClick={handleSeek}>
            <div 
              className="progress-bar-fill" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="track-buttons">
          <button className={`mood-btn arctic ${currentTrack === 'arctic' ? 'active' : ''}`} onClick={() => setCurrentTrack('arctic')}>505</button>
          <button className={`mood-btn cas ${currentTrack === 'cas' ? 'active' : ''}`} onClick={() => setCurrentTrack('cas')}>Apocalypse</button>
          <button className={`mood-btn kanibalismo ${currentTrack === 'kanibalismo' ? 'active' : ''}`} onClick={() => setCurrentTrack('kanibalismo')}>Kanibalismo II</button>
          <button className={`mood-btn coj ${currentTrack === 'cupofjoe' ? 'active' : ''}`} onClick={() => setCurrentTrack('cupofjoe')}>Wag Na Lang</button>
        </div>

        <div className="volume-control">
          <label><i className="bi bi-volume-up-fill"></i></label>
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