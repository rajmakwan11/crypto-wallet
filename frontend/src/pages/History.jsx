import TransactionHistory from "../components/TransactionHistory";

export default function History() {
  const ethWallet = JSON.parse(localStorage.getItem('eth_wallet'));
  const solWallet = JSON.parse(localStorage.getItem('sol_wallet'));

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white/5 p-6 rounded-2xl shadow-xl space-y-6 border border-white/10">
        <h2 className="text-3xl font-bold text-center">Transaction History</h2>

        <TransactionHistory
          solAddress={solWallet?.publicKey}
          ethAddress={ethWallet?.address}
        />
      </div>
    </div>
  );
}
