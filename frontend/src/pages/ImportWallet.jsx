import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

export default function ImportWallet() {
  const [seed, setSeed] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImport = () => {
    const normalized = seed.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!bip39.validateMnemonic(normalized, wordlist)) {
      setError('❌ Invalid seed phrase. Please enter a valid 12 or 24-word mnemonic.');
      return;
    }

    localStorage.setItem('wallet_seed', normalized);
    navigate('/generate-wallet');
  };

  return (
    <div className="min-h-screen bg-[#0a0f24] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg p-8 space-y-6 text-white">
        <h2 className="text-3xl font-bold text-center">🔐 Import Your Wallet</h2>
        <p className="text-center text-white/60">Enter your 12 or 24-word recovery phrase to restore your wallet.</p>

        <textarea
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          rows={4}
          placeholder="e.g. harvest jungle matrix bullet travel..."
          className="w-full bg-black/10 text-white placeholder-white/40 p-4 rounded-xl border border-white/10 focus:ring-2 focus:ring-yellow-400 outline-none transition"
        />

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          onClick={handleImport}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl transition duration-200"
        >
          🔁 Restore Wallet
        </button>
      </div>
    </div>
  );
}
  