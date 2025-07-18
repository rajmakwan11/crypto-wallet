// backend/index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Keypair } = require('@solana/web3.js');
const { derivePath } = require('ed25519-hd-key');
const bip39 = require('@scure/bip39');
const { wordlist } = require('@scure/bip39/wordlists/english');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/derive-solana', (req, res) => {
  const { mnemonic } = req.body;

  if (!bip39.validateMnemonic(mnemonic, wordlist)) {
    return res.status(400).json({ error: 'Invalid mnemonic' });
  }

  try {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const solanaPath = "m/44'/501'/0'/0'";
    const derivedSeed = derivePath(solanaPath, seed).key;
    const keypair = Keypair.fromSeed(derivedSeed);

    const solanaWallet = {
      publicKey: keypair.publicKey.toBase58(),
      privateKey: Buffer.from(keypair.secretKey).toString('hex'),
    };

    return res.json(solanaWallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to derive Solana wallet' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
