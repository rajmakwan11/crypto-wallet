

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

export default function CreateWallet() {
  const [seedPhrase, setSeedPhrase] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('wallet_seed');
    if (saved) {
      setSeedPhrase(saved);
    } else {
      const newSeed = generateMnemonic(wordlist);
      setSeedPhrase(newSeed);
      localStorage.setItem('wallet_seed', newSeed);
    }
  }, []);

  const handleContinue = () => {
    navigate('/generate-wallet');
  };

  const seedWords = seedPhrase.split(' ');

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl px-6 sm:px-10 py-10 space-y-10">
        
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">🔐 Secure Your Wallet</h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            This is your 12-word secret phrase. Save it in a secure place — it’s your only way to recover your wallet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full max-w-3xl mx-auto mt-6">
  {seedWords.map((word, index) => (
    <div
      key={index}
      className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-white text-sm flex items-center gap-2 shadow border border-white/10 break-words"
    >
      <span className="font-bold text-gray-400">{index + 1}.</span>
      <span className="font-mono text-base">{word}</span>
    </div>
  ))}
</div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            className="btn btn-primary px-10 py-3 rounded-xl text-base tracking-wide hover:scale-105 transition-transform"
          >
            I’ve saved it → Continue
          </button>
        </div>
      </div>
    </div>
  );
}
