export const startListening = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Your browser doesn't support Speech Recognition")
      return reject("Speech Recognition not supported")
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
recognition.onresult = (event: any) => {

      const transcript = event.results[0][0].transcript
      resolve(transcript)
    }

    recognition.onerror = (event: any) => {
      reject(event.error)
    }

    recognition.start()
  })
}

export const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  speechSynthesis.speak(utterance)
}
