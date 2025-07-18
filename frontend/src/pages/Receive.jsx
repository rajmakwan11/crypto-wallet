import QRCode from "react-qr-code";

export default function Receive() {
  const ethWallet = JSON.parse(localStorage.getItem("eth_wallet"));
  const solWallet = JSON.parse(localStorage.getItem("sol_wallet"));

  const ethAddress = ethWallet?.address || "0x...";
  const solAddress = solWallet?.publicKey || "Solana..."; // <-- Changed here

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white p-6 flex flex-col items-center">
      <div className="max-w-md w-full bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-center">Receive Crypto</h2>

        <div className="mb-6 text-center">
          <p className="mb-2 font-semibold">Ethereum Address</p>
          <div className="flex justify-center">
            <QRCode value={ethAddress} size={128} bgColor="#0a0f24" fgColor="#ffffff" />
          </div>
          <p className="mt-2 break-all text-xs text-gray-300">{ethAddress}</p>
        </div>

        <div className="mb-6 text-center">
          <p className="mb-2 font-semibold">Solana Address</p>
          <div className="flex justify-center">
            <QRCode value={solAddress} size={128} bgColor="#0a0f24" fgColor="#ffffff" />
          </div>
          <p className="mt-2 break-all text-xs text-gray-300">{solAddress}</p>
        </div>
      </div>
    </div>
  );
}
