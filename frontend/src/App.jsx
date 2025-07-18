// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './pages/WelcomeScreen';
import CreateWallet from './pages/CreateWallet';
import ImportWallet from './pages/ImportWallet';
import GenerateWallet from './pages/GenerateWallet';
import Wallet from './pages/Wallet';
import History from './pages/History';
import Send from "./pages/Send";
import Receive from './pages/Receive';

import './App.css'

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/create" element={<CreateWallet />} />
      <Route path="/import" element={<ImportWallet />} />
      <Route path="/generate-wallet" element={<GenerateWallet />} />
      <Route path="/wallet" element={<Wallet></Wallet>}></Route>
      <Route path="/history" element={<History />} />
      <Route path="/send" element={<Send />} />
      <Route path="/receive" element={<Receive></Receive>}></Route>
    </Routes>
    </>
  )
}

export default App
