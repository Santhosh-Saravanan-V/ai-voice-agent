'use client';

import { useState, useRef } from 'react';
import { transcribeAudio } from '../lib/assemblyai';

export default function VoiceInput() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks: Blob[] = [];

  const startRecording = async () => {
    setTranscript('');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.start();
    setIsRecording(true);

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      setLoading(true);
      const text = await transcribeAudio(audioBlob);
      setTranscript(text);
      setLoading(false);
    };
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="text-center mt-10">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-6 py-3 rounded-lg shadow-md text-white ${
          isRecording ? 'bg-red-600' : 'bg-blue-600'
        }`}
      >
        {isRecording ? ' Stop Recording' : ' Start Talking'}
      </button>

      {loading && <p className="mt-4 text-gray-700">pls wait transcribing your voice...</p>}

      {transcript && (
        <p className="mt-6 text-lg text-gray-800">
          <span className="font-semibold">You said:</span> “{transcript}”
        </p>
      )}
    </div>
  );
}
