import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Gallery from './pages/Gallery'
import Resources from './pages/Resources'
import PartyRoom from './pages/PartyRoom' 

export default function App() {
  const audioRef = useRef(null)
  const playlist = {
  arctic: { src: "/music/505.mp3", mood: "arctic-mode" },
  cas: { src: "/music/Apocalypse.mp3", mood: "cas-mode" },
  kanibalismo: { src: "/music/KanibalismoII.mp3", mood: "kanibalismo-mode" },
  cupofjoe: { src: "/music/WagNaLang.mp3", mood: "coj-mode" }
}

  const [currentTrack, setCurrentTrack] = useState("arctic")
  const [volume, setVolume] = useState(0.5)
  const [autoplayAllowed, setAutoplayAllowed] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (autoplayAllowed) {
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
    }
  }, [currentTrack, autoplayAllowed, volume])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

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
            <Route
              path="/party"
              element={
                <PartyRoom
                  playlist={playlist}
                  currentTrack={currentTrack}
                  setCurrentTrack={setCurrentTrack}
                  volume={volume}
                  setVolume={setVolume}
                  autoplayAllowed={autoplayAllowed}
                  setAutoplayAllowed={setAutoplayAllowed}
                />
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}