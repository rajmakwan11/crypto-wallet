// src/components/WalletOverview.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEthBalance, getSolBalance } from '../api/fetchBalance';
import TransactionHistory from "../components/TransactionHistory";


export default function WalletOverview() {
  const [ethBalance, setEthBalance] = useState(0);
  const [solBalance, setSolBalance] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);
  const navigate = useNavigate();

  const ethWallet = JSON.parse(localStorage.getItem('eth_wallet'));
  const solWallet = JSON.parse(localStorage.getItem('sol_wallet'));
  console.log(solWallet);
  console.log(ethWallet);

  useEffect(() => {
    const fetchBalances = async () => {
      const eth = await getEthBalance(ethWallet.address);
      const sol = await getSolBalance(solWallet.publicKey);

    //   console.log(eth)
    //   console.log(sol);

      setEthBalance(eth);
      setSolBalance(sol);

      // Example static USD prices; you can fetch real-time from CoinGecko later
      const ETH_USD = 3200;
      const SOL_USD = 150;

      const total = eth * ETH_USD + sol * SOL_USD;
      setTotalUSD(total.toFixed(2));
    };

    fetchBalances();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white/5 p-6 rounded-2xl shadow-xl space-y-6 border border-white/10">
        <h2 className="text-3xl font-bold text-center">Your Wallet Overview</h2>

        <div className="text-center">
          <p className="text-gray-300">Total Balance</p>
          <h1 className="text-4xl font-bold">${totalUSD}</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-[#1c2333] p-4 rounded-xl">
            <p className="text-gray-400">Ethereum</p>
            <p className="font-semibold">{ethBalance.toFixed(4)} ETH</p>
          </div>
          <div className="bg-[#1c2333] p-4 rounded-xl">
            <p className="text-gray-400">Solana</p>
            <p className="font-semibold">{solBalance.toFixed(4)} SOL</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button onClick={() => navigate('/send')} className="flex-1 bg-blue-500 hover:bg-blue-600 py-2 rounded-xl">Send</button>
          <button onClick={() => navigate('/receive')} className="flex-1 bg-green-500 hover:bg-green-600 py-2 rounded-xl">Receive</button>
          <button onClick={() => navigate('/history')} className="flex-1 bg-gray-700 hover:bg-gray-800 py-2 rounded-xl">History</button>
        </div>

        <button onClick={() => navigate('/')} className="w-full bg-white/10 text-sm text-gray-400 hover:text-white py-2 rounded-xl mt-4">Back to Home</button>
      </div>
    </div>
  );
}
