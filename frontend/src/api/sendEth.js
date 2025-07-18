// sendEth.js
import { ethers } from "ethers";

export async function sendEth(privateKey, to, amount) {
  const provider = new ethers.JsonRpcProvider("https://go.getblock.us/591906cab2084a1eb4a35e903eaeeaaa");
  const wallet = new ethers.Wallet(privateKey, provider);

  try {
    const tx = await wallet.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    });

    console.log("Transaction sent:", tx.hash);
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt.blockNumber);
    return tx.hash;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}
