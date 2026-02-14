// components/VoiceInput.tsx
"use client";

import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

type Props = {
  onResult: (text: string) => void;
};

export default function VoiceInput({ onResult }: Props) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript && onResult) {
      onResult(transcript);
      resetTranscript();
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <button
      onClick={() => SpeechRecognition.startListening({ continuous: false })}
      className={`px-4 py-2 rounded ${
        listening ? "bg-red-500" : "bg-green-600"
      } text-white`}
    >
      {listening ? "Listening..." : "🎤 Speak"}
    </button>
  );
}
