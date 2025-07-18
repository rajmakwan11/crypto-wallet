// src/wallet/deriveWallet.js
import axios from 'axios';
import { HDNodeWallet } from 'ethers';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

export async function deriveWallets(mnemonic) {
  if (!bip39.validateMnemonic(mnemonic, wordlist)) {
    throw new Error('Invalid mnemonic.');
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic);

  // Ethereum derivation (allowed in frontend)
  const ethPath = "m/44'/60'/0'/0/0";
  const ethNode = HDNodeWallet.fromSeed(seed).derivePath(ethPath);

  const ethereumWallet = {
    address: ethNode.address,
    privateKey: ethNode.privateKey,
    publicKey: ethNode.publicKey,
  };

  // Solana derivation via backend
  let solanaWallet = null;
  try {
    const res = await axios.post('http://localhost:5000/api/derive-solana', {
      mnemonic,
    });
    solanaWallet = res.data;
  } catch (err) {
    console.error('Solana derivation failed:', err);
  }

  return {
    ethereumWallet,
    solanaWallet,
  };
}
