'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-lg font-bold">🎓 AI Voice Agent</h1>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/agent">Voice Agent</Link>
        </div>
      </div>
    </nav>
  );
}
