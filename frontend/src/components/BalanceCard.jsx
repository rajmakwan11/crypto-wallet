// src/components/BalanceCard.jsx
export default function BalanceCard({ icon, name, symbol, balance, price, change }) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <img src={icon} alt={name} className="w-8 h-8" />
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-gray-400 text-sm">{balance} {symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-semibold">${price}</p>
        <p className={`text-sm ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </p>
      </div>
    </div>
  );
}
