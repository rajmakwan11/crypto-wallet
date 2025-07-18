// src/api/getEthereumHistory.js
export async function getEthereumHistory(address) {
  try {
    const res = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=YourApiKey`);
    const data = await res.json();
    if (data.status !== "1" || !Array.isArray(data.result)) {
      return []; // safe fallback
    }
    return data.result.slice(0, 5); // top 5 txns
  } catch (err) {
    console.error("Ethereum history fetch error", err);
    return [];
  }
}
