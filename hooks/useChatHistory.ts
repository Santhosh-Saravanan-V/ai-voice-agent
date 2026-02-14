import { useState, useEffect } from "react";

export default function useChatHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);
  

  const addToHistory = (text: string) => {
    const updated = [...history, text];
    setHistory(updated);
    localStorage.setItem("chatHistory", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("chatHistory");
  };
  

  return { history, addToHistory, clearHistory };
}
