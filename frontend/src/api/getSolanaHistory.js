// src/api/getSolanaHistory.js

const SOLANA_API = "https://go.getblock.us/1f1ab4e8636e4acf9b680dac53e84b5c";

export async function getSolanaHistory(address) {
  try {
    // 1. Get recent transaction signatures
    const res = await fetch(SOLANA_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getSignaturesForAddress",
        params: [address, { limit: 5 }],
      }),
    });

    const { result: signatures } = await res.json();
    console.log("Signatures:", signatures);

    if (!Array.isArray(signatures)) {
      console.error("Invalid signature response:", signatures);
      return [];
    }

    // 2. For each signature, get full transaction details
    const detailedTxs = await Promise.all(
      signatures.map(async ({ signature }) => {
        const txRes = await fetch(SOLANA_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getTransaction",
            params: [signature, { encoding: "json" }],
          }),
        });

        const { result: tx } = await txRes.json();
        console.log("Full tx for", signature, ":", tx);
        if (!tx) return null;

        // Compute received/sent amounts (if available)
        const preBalance = tx.meta?.preBalances?.[0] || 0;
        const postBalance = tx.meta?.postBalances?.[0] || 0;
        const amount = (postBalance - preBalance) / 1e9;

        return {
          signature,
          amount,
          timestamp: new Date((tx.blockTime || 0) * 1000).toLocaleString(),
        };
      })
    );

    // 3. Filter out null or malformed txs
    return detailedTxs.filter(Boolean);
  } catch (err) {
    console.error("Solana GetBlock history fetch error:", err);
    return [];
  }
}
