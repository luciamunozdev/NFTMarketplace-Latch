import Navbar from "./Navbar";
import { useState } from 'react';
import React from 'react';
import clientAxios from '../config/axios'
import { setLatchPaired } from '../index.js';


export default function App() {
	const [paired, setPaired] = useState(false);
	const [hover, setHover] = useState(false);
	const [code, setCode] = React.useState('');

	const handlePair = async () => {
		setPaired(true);
	};
	const handleUnpair = async () => {
		setPaired(false);
	};
	const handleAction = async (code) => {
		if (paired) {
			handleUnpair();
		} else {
			handleSignMessage(code);
		}
	};
	let ClientSignature;
	let ClientWallet;
	async function getAddress() {
		let address = await window.ethereum.request({ method: 'eth_requestAccounts' })
		return address[0];
	}

	const handleSignMessage = async (code) => {
		try {
			const addr = await getAddress();
			ClientWallet = addr;
			const signature = await window.ethereum.send('personal_sign', ['Latch-Web3', addr]);
			ClientSignature = signature.result;
			try {
				const response = await clientAxios.post('/pair', {
					ClientWallet, code, ClientSignature
				});
				console.log(response.data);
				handlePair();
				setLatchPaired(true);
			} catch (error) {
				console.error(error);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleMouseEnter = () => {
		setHover(true);
	};

	const handleMouseLeave = () => {
		setHover(false);
	};

	const handleCodeChange = (e) => {
		setCode(e.target.value);
	}

	return (
		<div className="latchClass" style={{ "minHeight": "100vh" }}>
			<Navbar></Navbar>
			<div style={{
				height: "60vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				color: "#FFF",
			}}>
				< br />
				<label>
					<input type="text" value={code} onChange={handleCodeChange} style={{
						width: '200px',
						height: '30px',
						border: '1px solid gray',
						borderRadius: '5px',
						padding: '5px',
						color: 'black'
					}} />
				</label>
				<br />
				<button className="enableEthereumButton bg-blue-700 hover:bg-blue-800 text-white font-bold p-3 rounded text-sm mr-3"

					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onClick={() => handleAction(code)}>{paired ? "Unpair" : "Pair"}</button>
			</div>
		</div>
	);
}
