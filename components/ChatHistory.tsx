type Props = {
  history: string[];
};

export default function ChatHistory({ history }: Props) {
  return (
    <div className="bg-gray-100 rounded-md p-4 max-h-96 overflow-y-auto border border-gray-300 space-y-2">
      <h2 className="font-bold text-lg mb-2 text-gray-700">Chat History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        history.map((text, i) => (
          <div
            key={i}
            className="bg-white text-gray-800 p-3 rounded-lg shadow-sm max-w-[80%]"
          >
            {text}
          </div>
        ))
      )}
    </div>
  );
}
