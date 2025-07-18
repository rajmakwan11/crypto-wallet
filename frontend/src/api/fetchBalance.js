// src/api/fetchBalances.js

export async function getEthBalance(address) {
  const ETH_RPC = "https://go.getblock.us/591906cab2084a1eb4a35e903eaeeaaa"; // ETH RPC

  try {
    const response = await fetch(ETH_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [address, "latest"]
      })
    });

    const json = await response.json();
    if (json.error) {
      console.error("ETH Balance Error Response:", json);
      return 0;
    }

    const balanceWei = parseInt(json.result, 16);
    return balanceWei / 1e18;
  } catch (err) {
    console.error("ETH Fetch Error:", err);
    return 0;
  }
}

export async function getSolBalance(publicKey) {
  const SOL_RPC = "https://go.getblock.us/1f1ab4e8636e4acf9b680dac53e84b5c"; // use public RPC instead of GetBlock

  try {
    const response = await fetch(SOL_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [publicKey]
      })
    });

    const json = await response.json();
    if (json.error) {
      console.error("Solana Balance Error Response:", json);
      return 0;
    }

    const balanceLamports = json.result?.value;
    return balanceLamports / 1e9;
  } catch (err) {
    console.error("Solana Fetch Error:", err);
    return 0;
  }
}
