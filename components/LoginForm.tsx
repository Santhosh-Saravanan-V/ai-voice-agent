'use client'

import { useState, useEffect } from 'react'

export default function LoginForm({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState('')

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem('username', username)
      onLogin(username)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-green-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg space-y-4 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-blue-700">🔐 Login</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  )
}
