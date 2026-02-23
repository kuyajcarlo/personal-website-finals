import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Gallery from './pages/Gallery'
import Resources from './pages/Resources'
import PartyRoom from './pages/PartyRoom' // Import the new PartyRoom page

export default function App() {
  const audioRef = useRef(null)

  const playlist = {
    arctic: { src: "/music/505.mp3", mood: "arctic-mode" },
    cas: { src: "/music/Apocalypse.mp3", mood: "cas-mode" }
  }

  const [currentTrack, setCurrentTrack] = useState("arctic")
  const [volume, setVolume] = useState(0.5)
  const [autoplayAllowed, setAutoplayAllowed] = useState(false)

  // Play audio when track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !autoplayAllowed) return

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

    return () => clearInterval(fade)
  }, [currentTrack, autoplayAllowed, volume])

  // Volume control live
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // Mood change
  useEffect(() => {
    document.body.classList.remove("arctic-mode", "cas-mode")
    document.body.classList.add(playlist[currentTrack].mood)
  }, [currentTrack])

  // User interaction to allow autoplay
  const handleUserInteraction = () => setAutoplayAllowed(true)

  return (
    <BrowserRouter>
      <audio ref={audioRef} src={playlist[currentTrack].src} loop />

      <div onClick={handleUserInteraction} onKeyDown={handleUserInteraction}>
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
            <Route path="/party" element={<PartyRoom />} /> {/* New Party Room Route */}
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}