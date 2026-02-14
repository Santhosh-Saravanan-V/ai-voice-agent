"use client";

import { useState } from "react";

type Props = {
  onSubmit: (text: string) => void;
};

export default function TextInput({ onSubmit }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;
    onSubmit(text.trim());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 backdrop-blur-md">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your question..."
        className="bg-transparent outline-none flex-1 text-white placeholder-gray-400"
      />
      <button
        onClick={handleSend}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-4 py-2 rounded-lg transition-all shadow-md"
      >
        Send
      </button>
    </div>
  );
}
