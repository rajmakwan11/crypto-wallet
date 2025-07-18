// src/components/ReceiveModal.jsx
export default function ReceiveModal({ onClose, address }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-[#0a0f24] rounded-xl p-6 w-full max-w-md text-white space-y-4 text-center">
        <h3 className="text-xl font-bold">Receive Crypto</h3>
        <p className="text-sm text-gray-300">Your wallet address:</p>
        <p className="break-words bg-[#1a1a1a] p-3 rounded">{address}</p>
        <button onClick={onClose} className="mt-4 px-6 py-2 bg-purple-600 rounded">Close</button>
      </div>
    </div>
  );
}
