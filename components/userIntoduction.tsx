"use client"
import { useState, useEffect } from "react"

export default function UserIntroduction({ onComplete }: { onComplete: () => void }) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [intro, setIntro] = useState("")

  useEffect(() => {
    const storedIntro = localStorage.getItem("user_intro")
    if (!storedIntro) {
      setShowPrompt(true)
    } else {
      onComplete()
    }
  }, [])

  const handleSave = () => {
    if (intro.trim() !== "") {
      localStorage.setItem("user_intro", intro)
      setShowPrompt(false)
      onComplete()
    }
  }

  const handleSkip = () => {
    localStorage.setItem("user_intro", "skipped")
    setShowPrompt(false)
    onComplete()
  }

  if (!showPrompt) return null

  return (
    <div className="p-4 border rounded-xl shadow-md max-w-md mx-auto mt-10 bg-white">
      <h2 className="text-xl font-semibold mb-2">👋 Welcome!</h2>
      <p className="mb-3">Please introduce yourself (e.g., “I’m a 17-year-old student who loves F1”):</p>
      <textarea
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        rows={3}
        placeholder="Type your introduction here..."
      />
      <div className="flex justify-end space-x-2">
        <button onClick={handleSkip} className="px-3 py-1 bg-gray-400 text-white rounded">Skip</button>
        <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
      </div>
    </div>
  )
}
