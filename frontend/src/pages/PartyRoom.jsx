import { useEffect, useRef, useState } from 'react'

export default function PartyRoom() {
  const audioRef = useRef(null)

  const playlist = {
    arctic: { src: "/music/505.mp3", mood: "arctic-mode" },
    cas: { src: "/music/Apocalypse.mp3", mood: "cas-mode" }
  }

  const [currentTrack, setCurrentTrack] = useState("arctic")
  const [volume, setVolume] = useState(0.5)

  // Play music and fade in
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0
    audio.volume = 0
    audio.play().catch(() => {})

    let fade = setInterval(() => {
      if (audio.volume < volume) {
        audio.volume = Math.min(audio.volume + 0.02, volume)
      } else {
        clearInterval(fade)
      }
    }, 100)

    // Mood effect
    document.body.classList.remove("arctic-mode", "cas-mode")
    document.body.classList.add(playlist[currentTrack].mood)

    return () => clearInterval(fade)
  }, [currentTrack, volume])

  return (
    <div className="party-room">
      <h1>🎉 Party Room</h1>
      <audio ref={audioRef} src={playlist[currentTrack].src} loop />

      <div className="track-buttons">
        <button onClick={() => setCurrentTrack("arctic")}>505</button>
        <button onClick={() => setCurrentTrack("cas")}>Apocalypse</button>
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