import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Gallery from './pages/Gallery'
import Resources from './pages/Resources'

export default function App() {
  const audioRef = useRef(null)

  const playlist = {
  arctic: {
    src: "/music/505.mp3",
    mood: "arctic-mode"
  },
  cas: {
    src: "/music/Apocalypse.mp3",
    mood: "cas-mode"
  }
}

  const [currentTrack, setCurrentTrack] = useState("arctic")
  const [volume, setVolume] = useState(0.5)

  // Fade in effect
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0
    audio.play().catch(() => {})

    let fade = setInterval(() => {
      if (audio.volume < volume) {
        audio.volume += 0.02
      } else {
        clearInterval(fade)
      }
    }, 100)

    return () => clearInterval(fade)
  }, [currentTrack])

  // Volume change live
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Mood change
  useEffect(() => {
    document.body.classList.remove("arctic-mode", "cas-mode")
    document.body.classList.add(playlist[currentTrack].mood)
  }, [currentTrack])

  return (
    <BrowserRouter>
      <audio ref={audioRef} src={playlist[currentTrack].src} loop />

      <Navbar 
        setTrack={setCurrentTrack}
        volume={volume}
        setVolume={setVolume}
      />

      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  )
}