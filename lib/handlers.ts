import { getAIResponse } from "./response";

export function handleTextMessage(
  input: string,
  addToHistory: (msg: string) => void,
  resetInput: () => void
) {
  if (input.trim()) {
    addToHistory("🗣️ You: " + input);
    const reply = getAIResponse(input);
    addToHistory("🤖 Bot: " + reply);
    resetInput();
  }
}

export function handleVoiceMessage(
  transcript: string,
  addToHistory: (msg: string) => void
) {
  addToHistory("🗣️ You (voice): " + transcript);
  const reply = getAIResponse(transcript);
  addToHistory("🤖 Bot: " + reply);
}
