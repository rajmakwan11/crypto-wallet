// sendSol.js
import {
  Connection,
  Keypair,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { Buffer } from "buffer"; // ✅ Add this line

export async function sendSol(hexPrivateKey, to, amount) {
  const connection = new Connection("https://go.getblock.us/1f1ab4e8636e4acf9b680dac53e84b5c");
  const secretKey = Uint8Array.from(Buffer.from(hexPrivateKey, "hex"));
  const fromKeypair = Keypair.fromSecretKey(secretKey);
  const toPublicKey = new PublicKey(to);

  try {
    const latestBlockhash = await connection.getLatestBlockhash();

    const transaction = new Transaction({
      recentBlockhash: latestBlockhash.blockhash,
      feePayer: fromKeypair.publicKey,
    });

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPublicKey,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    transaction.sign(fromKeypair);

    const signature = await connection.sendRawTransaction(transaction.serialize(), {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    });

    const confirmation = await connection.confirmTransaction({
      signature,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    });

    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${confirmation.value.err}`);
    }

    console.log("✅ SOL Transaction confirmed:", signature);
    return signature;
  } catch (error) {
    console.error("❌ SOL Transaction failed:", error);
    throw error;
  }
}
