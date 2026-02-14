"use client";
import { useEffect, useRef, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import VoiceInput from "../components/VoiceInput";

export default function Index() {
  const { user } = useUser();
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    course: "",
    interest: "",
  });
  const [hasIntroduced, setHasIntroduced] = useState(false);
  const [isReintroducing, setIsReintroducing] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode class
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userDetails");
    const storedApiKey = localStorage.getItem("openrouter_api_key");
    const storedMessages = localStorage.getItem("chatMessages");

    if (stored) {
      setUserDetails(JSON.parse(stored));
      setHasIntroduced(true);
    }

    if (!storedApiKey) {
      localStorage.setItem("openrouter_api_key", SHARED_API_KEY);
      setApiKey(SHARED_API_KEY);
    } else {
      setApiKey(storedApiKey);
    }

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (message: string) => {
    const userMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Please set your OpenRouter API key first to get AI responses.",
        },
      ]);
      return;
    }

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mistralai/mistral-small-3.1-24b-instruct:free",
            messages: [
              {
                role: "system",
                content: `You are an AI education assistant. Please block explicit and other request which is not related to education. The user's name is ${userDetails.name}, they study ${userDetails.course}, and they're interested in ${userDetails.interest}. Provide helpful, educational responses tailored to their background.`,
              },
              {
                role: "user",
                content: message,
              },
            ],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to get AI response");
      }

      const aiReply =
        data.choices?.[0]?.message?.content ||
        "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "Sorry, I encountered an error. Please check your API key and try again.",
        },
      ]);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  const handleTranscript = (text: string) => {
    if (text.trim()) {
      sendMessage(text.trim());
    }
  };

  const handleIntroduce = () => {
    if (userDetails.name.trim()) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      setHasIntroduced(true);
      setIsReintroducing(false);
    }
  };

  const handleReintroduce = () => {
    setIsReintroducing(true);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Dark mode toggle */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow hover:bg-gray-700 transition"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* SIGNED OUT VIEW */}
        <SignedOut>
          <div className="text-center py-24">
            <h1 className="text-5xl font-extrabold text-indigo-700 mb-6">
              AI Education Bot
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Sign in to start learning with AI 👨‍🏫
            </p>
            <div className="space-x-4">
              <SignInButton mode="modal">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-indigo-700 transition-all">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-green-700 transition-all">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </div>
        </SignedOut>

        {/* SIGNED IN VIEW */}
        <SignedIn>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-indigo-800">
              👋 AI Education Bot
            </h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          {!hasIntroduced || isReintroducing ? (
            <div className="space-y-4 bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-gray-800">
                {isReintroducing
                  ? "Update your details:"
                  : "Welcome! Please introduce yourself:"}
              </h2>
              <input
                className="border p-3 w-full rounded-md"
                type="text"
                placeholder="Your name"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
              />
              <input
                className="border p-3 w-full rounded-md"
                type="text"
                placeholder="Your course"
                value={userDetails.course}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, course: e.target.value })
                }
              />
              <input
                className="border p-3 w-full rounded-md"
                type="text"
                placeholder="Your interest"
                value={userDetails.interest}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, interest: e.target.value })
                }
              />
              <button
                className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
                onClick={handleIntroduce}
              >
                {isReintroducing ? "Update" : "Submit"}
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 bg-white p-4 rounded-xl shadow">
                <h2 className="text-2xl font-semibold text-indigo-800">
                  Hello {userDetails.name} 👋
                </h2>
                <p className="text-gray-600">Course: {userDetails.course}</p>
                <p className="text-gray-600">
                  Interest: {userDetails.interest}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    className="text-sm text-indigo-500 underline hover:text-indigo-700"
                    onClick={handleReintroduce}
                  >
                    Reintroduce Yourself
                  </button>
                  <button
                    className="text-sm text-red-500 underline hover:text-red-700"
                    onClick={clearChat}
                  >
                    Clear Chat
                  </button>
                </div>
              </div>

              <div className="border p-4 h-72 overflow-y-auto scrollbar-hide rounded-xl bg-white dark:bg-gray-900 dark:text-white shadow-inner mb-4 space-y-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 max-w-[80%] rounded-xl shadow-sm text-sm ${
                      msg.sender === "user"
                        ? "bg-indigo-100 text-right ml-auto"
                        : "bg-green-100 text-left"
                    }`}
                  >
                    <div className="font-medium">
                      {msg.sender === "user" ? "You" : "AI"}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow">
                <input
                  className="border border-gray-300 p-3 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="text"
                  placeholder="Type your message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <VoiceInput onResult={handleTranscript} />
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </SignedIn>
      </div>
    </div>
  );
}
