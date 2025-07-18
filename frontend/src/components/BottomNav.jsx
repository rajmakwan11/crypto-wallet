// src/components/BottomNav.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, Home } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0f24] border-t border-white/10 flex justify-around py-3">
      <button
        onClick={() => navigate('/wallet')}
        className={`flex flex-col items-center ${location.pathname === '/wallet' ? 'text-purple-500' : 'text-white'}`}
      >
        <Home size={24} />
      </button>
      <button
        onClick={() => navigate('/history')}
        className={`flex flex-col items-center ${location.pathname === '/history' ? 'text-purple-500' : 'text-white'}`}
      >
        <Clock size={24} />
      </button>
    </div>
  );
}
