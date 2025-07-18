import { useEffect, useState } from "react";
import { getSolanaHistory } from "../api/getSolanaHistory";
import { getEthereumHistory } from "../api/getEthereumHistory";

export default function TransactionHistory({ solAddress, ethAddress }) {
  const [solHistory, setSolHistory] = useState([]);
  const [ethHistory, setEthHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const [solTxs, ethTxs] = await Promise.all([
          solAddress ? getSolanaHistory(solAddress) : [],
          ethAddress ? getEthereumHistory(ethAddress) : []
        ]);
        setSolHistory(solTxs);
        setEthHistory(ethTxs.slice(0, 5));
      } catch (err) {
        console.error("Transaction fetch error:", err);
        setError("Failed to fetch transaction history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [solAddress, ethAddress]);

  if (loading) return <p className="text-gray-400">Loading transactions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (solHistory.length === 0 && ethHistory.length === 0) {
    return <p className="text-gray-400">No transactions found.</p>;
  }

  return (
    <div className="bg-[#0a0f24] text-white p-4 rounded-xl space-y-6">
      <h2 className="text-xl font-bold">Recent Transactions (Top 5)</h2>

      {solHistory.length > 0 && (
        <div>
          <h3 className="text-lg text-purple-400">Solana</h3>
          <ul className="space-y-3 text-sm">
            {solHistory.map((tx) => (
              <li key={tx.signature} className="border-b border-gray-700 pb-2">
                <p>
                  {tx.amount > 0 ? "⬇️ Received" : "⬆️ Sent"}:{" "}
                  <span className="font-semibold text-green-400">
                    {Math.abs(tx.amount)} SOL
                  </span>
                </p>
                <p className="text-gray-400 text-xs">🕒 {tx.timestamp}</p>
                <a
                  href={`https://solscan.io/tx/${tx.signature}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline"
                >
                  View on Solscan
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {ethHistory.length > 0 && (
        <div>
          <h3 className="text-lg text-yellow-400">Ethereum</h3>
          <ul className="space-y-3 text-sm">
            {ethHistory.map((tx) => (
              <li key={tx.hash} className="border-b border-gray-700 pb-2">
                <p>
                  🔁 TxHash:{" "}
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    className="text-blue-400 underline"
                    rel="noreferrer"
                  >
                    {tx.hash.slice(0, 30)}...
                  </a>
                </p>
                <p className="text-gray-400 text-xs">
                  Value: {Number(tx.value) / 1e18} ETH
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
