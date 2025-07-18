import { useState } from "react";
import { sendEth } from "../api/sendEth";
import { sendSol } from "../api/sendSol";

export default function Send() {
  const [network, setNetwork] = useState("eth");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async () => {
  setStatus("Sending...");
  try {
    if (network === "eth") {
      const { privateKey } = JSON.parse(localStorage.getItem("eth_wallet"));
      const txHash = await sendEth(privateKey, to, amount);
      setStatus(`✅ ETH Sent! Tx Hash: ${txHash}`);
    } else {
      const { privateKey } = JSON.parse(localStorage.getItem("sol_wallet"));
      const sig = await sendSol(privateKey, to, parseFloat(amount));
      setStatus(`✅ SOL Sent! Tx Sig: ${sig}`);
    }
  } catch (err) {
    console.error("❌ Send error:", err);

    // Handle specific Solana simulation error
    if (
      err.message?.includes("insufficient funds for rent") ||
      err.message?.includes("Simulation failed")
    ) {
      setStatus("❌ Not enough SOL to complete the transaction. Please add more SOL to your wallet.");
    } else {
      // Show fallback for all other errors
      setStatus(`❌ Error: ${err.message}`);
    }
  }
};


  return (
    <div className="min-h-screen bg-[#0a0f24] text-white p-6 flex flex-col items-center">
      <div className="max-w-md w-full bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-center">Send Crypto</h2>

        <label className="block mb-2">Select Network</label>
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-black/20"
        >
          <option value="eth">Ethereum</option>
          <option value="sol">Solana</option>
        </select>

        <label className="block mb-2">Recipient Address</label>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="0x... or Sol address"
          className="w-full mb-4 p-2 rounded bg-black/20"
        />

        <label className="block mb-2">Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full mb-6 p-2 rounded bg-black/20"
        />

        <button
          onClick={handleSend}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          Send
        </button>

        <p className="mt-4 text-sm text-gray-300 break-all">{status}</p>
      </div>
    </div>
  );
}
