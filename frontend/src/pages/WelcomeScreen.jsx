import { useNavigate } from 'react-router-dom';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const coins = Array.from({ length: 30 });

  return (
    <div className="relative min-h-screen bg-[#0a0f24] overflow-hidden flex items-center justify-center font-sans">
      {/* Falling coins */}
      {coins.map((_, i) => (
        <span
          key={i}
          className="absolute text-3xl animate-fall select-none"
          style={{
            top: `-${Math.random() * 100}px`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
        >
          {Math.random() < 0.33 ? '🪙' : Math.random() < 0.5 ? '₿' : 'Ξ'}
        </span>
      ))}

      {/* Center Card */}
      <div className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/20 p-8 md:p-10 rounded-2xl w-[90%] max-w-md text-center shadow-xl">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          🛡️ BlockVault
        </h1>
        <p className="text-gray-300 mt-2 text-sm">
          Your secure crypto wallet starts here.
        </p>

        <div className="mt-8 space-y-4">
          <button
            className="w-full btn btn-primary transition hover:scale-105"
            onClick={() => navigate('/create')}
          >
            🔐 Create New Wallet
          </button>
          <button
            className="w-full btn border border-white/20 text-white bg-transparent hover:bg-white hover:text-black transition hover:scale-105"
            onClick={() => navigate('/import')}
          >
            🔁 Import Wallet
          </button>
        </div>
      </div>
      {/* Flowing Gradient Bar */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-gradientMove opacity-30 blur-2xl z-0"></div>

    </div>
    
  );
}
