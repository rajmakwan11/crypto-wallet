// src/pages/GenerateWallet.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deriveWallets } from '../wallet/deriveWallet';

export default function GenerateWallet() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const seed = localStorage.getItem('wallet_seed');
    if (!seed) {
      setError('No seed found. Please generate your wallet first.');
      return;
    }

    const generate = async () => {
      try {
        const data = await deriveWallets(seed);
        localStorage.setItem('eth_wallet', JSON.stringify(data.ethereumWallet));
        localStorage.setItem('sol_wallet', JSON.stringify(data.solanaWallet));
        navigate('/wallet'); // 👈 Navigate immediately after success
      } catch (err) {
        console.error('Error generating wallets:', err);
        setError('Failed to generate wallets.');
      }
    };

    generate();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0f24] text-red-500 flex items-center justify-center p-6 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white flex items-center justify-center text-lg">
      Generating wallets...
    </div>
  );
}
