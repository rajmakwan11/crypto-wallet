// src/components/SendModal.jsx
export default function SendModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-[#0a0f24] rounded-xl p-6 w-full max-w-md text-white space-y-4">
        <h3 className="text-xl font-bold">Send Crypto</h3>
        <select className="w-full p-2 rounded bg-[#1a1a1a] text-white">
          <option>Ethereum</option>
          <option>Solana</option>
        </select>
        <input placeholder="Receiver Address" className="w-full p-2 rounded bg-[#1a1a1a] text-white" />
        <input placeholder="Amount" className="w-full p-2 rounded bg-[#1a1a1a] text-white" />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
          <button className="px-4 py-2 bg-purple-600 rounded">Send</button>
        </div>
      </div>
    </div>
  );
}
