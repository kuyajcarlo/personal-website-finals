import { useEffect, useRef } from 'react'

export default function PartyRoom({
  playlist,
  currentTrack,
  setCurrentTrack,
  volume,
  setVolume,
  autoplayAllowed,
  setAutoplayAllowed
}) {
  const audioRef = useRef(null)

  // Handle mood **only inside this page**
  useEffect(() => {
    const container = document.getElementById('party-room-container')
    if (!container) return
    container.className = `party-room ${playlist[currentTrack].mood}`
  }, [currentTrack, playlist])

  // Play audio locally (fade-in)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !autoplayAllowed) return

    audio.currentTime = 0
    audio.volume = 0
    audio.play().catch(() => {})

    const fade = setInterval(() => {
      if (audio.volume < volume) audio.volume = Math.min(audio.volume + 0.02, volume)
      else clearInterval(fade)
    }, 100)

    return () => clearInterval(fade)
  }, [currentTrack, volume, autoplayAllowed])

  const handleUserInteraction = () => setAutoplayAllowed(true)

  return (
    <div
      id="party-room-container"
      onClick={handleUserInteraction}
      onKeyDown={handleUserInteraction}
    >
      <h1>🎉 Party Room</h1>
      <audio ref={audioRef} src={playlist[currentTrack].src} loop />

      <div className="track-buttons">
        <button onClick={() => setCurrentTrack('arctic')}>505</button>
        <button onClick={() => setCurrentTrack('cas')}>Apocalypse</button>
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
  )
}