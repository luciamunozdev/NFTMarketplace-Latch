import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SellNFT from './components/SellNFT';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import NFTPage from './components/NFTpage';
import Latch from './components/Latch';
import Unpair from './components/Unpair';

let latchPair = false;

export function setLatchPaired(bool) {
  latchPair = bool;
}

export function getLatchPaired() {
  return latchPair;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Marketplace />}/>
        <Route path="/sellNFT" element={<SellNFT />}/> 
        <Route path="/nftPage/:tokenId" element={<NFTPage />}/>        
        <Route path="/profile" element={<Profile />}/> 
        <Route path="/latch" element={<Latch />}/>
        <Route path="/unpair" element={<Unpair />}/>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
