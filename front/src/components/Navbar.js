import fullLogo from '../full_logo.png';
import {
  BrowserRouter as Router,
  Link,

} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import clientAxios from '../config/axios'
import { getLatchPaired } from '../index.js';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();

  const [connected, toggleConnect] = useState(true);
  const location = useLocation();
  const [currAddress] = useState('0x');
  const [latchPaired, setLatchPaired] = useState(false);

  async function getAddress() {
    let address = await window.ethereum.request({ method: 'eth_requestAccounts' })

    return address[0];
  }

  function updateButton() {
    const ethereumButton = document.querySelector('.enableEthereumButton');
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x13881') {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      })
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
        updateButton();

        console.log("here1");
        window.location.replace(location.pathname)
      });
    // send the address to the backend
    try {
      const response = await clientAxios.post('/connect', {
        address: await getAddress(),
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }


  useEffect(() => {
    let val = window.ethereum.isConnected();
    if (val) {
      toggleConnect(val);
      updateButton();

      setLatchPaired(getLatchPaired());
      console.log("here2");
      console.log(latchPaired);


    }

    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.replace(location.pathname)
    })
  });

  return (
    <div className="">
      <nav className="w-screen">
        <ul className='flex items-end justify-between py-4 bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/">
              <img src={fullLogo} alt="" width={120} height={130} className="inline-block -mt-2" />
              <div className='inline-block font-bold text-xl ml-3'>
                NFT Marketplace
              </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-3 text-lg'>
              {location.pathname === "/" ?
                <li className='border-b-2 hover:pb-0 p-2'>
                  <Link to="/">Marketplace</Link>
                </li>
                :
                <li className='hover:border-b-2 hover:pb-0 p-2'>
                  <Link to="/">Marketplace</Link>
                </li>
              }
              {location.pathname === "/sellNFT" ?
                <li className='border-b-2 hover:pb-0 p-2'>
                  <Link to="/sellNFT">List My NFT</Link>
                </li>
                :
                <li className='hover:border-b-2 hover:pb-0 p-2'>
                  <Link to="/sellNFT">List My NFT</Link>
                </li>
              }
              {location.pathname === "/profile" ?
                <li className='border-b-2 hover:pb-0 p-2'>
                  <Link to="/profile">Profile</Link>
                </li>
                :
                <li className='hover:border-b-2 hover:pb-0 p-2'>
                  <Link to="/profile">Profile</Link>
                </li>
              }
              <li>
                <button className="enableEthereumButton bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded text-sm " onClick={connectWebsite}>{connected ? "Connected" : "Connect Wallet"}</button>
              </li>

              {location.pathname === "/latch" ?
                <li className="enableLatchButton bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded text-sm">
                  <Link to="/latch">Latch</Link>
                </li>
                :
                <li className="enableLatchButton bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded text-sm">
                  <Link to="/latch">Latch</Link>
                </li>
              }
              {latchPaired ? (
                <li className="enableUnpairButton bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded text-sm">
                  <div onClick={() => navigate("/unpair")}>
                    Unpair
                  </div>
                </li>

              ) : null}

            </ul>
          </li>
        </ul>
      </nav>
      <div className='text-white text-bold text-right mr-10 text-sm'>
        {currAddress !== "0x" ? "Connected to" : "Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0, 15) + '...') : ""}
      </div>
    </div>
  );
}

export default Navbar;