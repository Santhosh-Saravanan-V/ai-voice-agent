import VoiceInput from '../../components/VoiceInput';

export default function AgentPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🎤 Voice Assistant</h2>
      <p className="mb-6">Speak your query, and the assistant will respond!</p>
      <VoiceInput />
    </div>
  );
}
