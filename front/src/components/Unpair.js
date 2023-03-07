import Navbar from "./Navbar";
import { useState } from 'react';
import React from 'react';
import clienteAxios from '../config/axios'
import { setLatchPaired } from '../index.js';


export default function App() {

	async function getAddress() {
		let address = await window.ethereum.request({ method: 'eth_requestAccounts' })
		return address[0];
	}

	const unpair = async () => {
		try {
			try {
				const addr = await getAddress();
				console.log(addr);
				const response = await clienteAxios.post('/unpair', {
					addr
				});
				console.log(response.data);
				setLatchPaired(false);
			} catch (error) {
				console.error(error);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const [hover, setHover] = useState(false);

	const handleMouseEnter = () => {
		setHover(true);
	};

	const handleMouseLeave = () => {
		setHover(false);
	};


	return (
		<div className="unpairClass" style={{ "minHeight": "100vh" }}>
			<Navbar></Navbar>

			<button style={{
				position: 'fixed',
				bottom: '300px',
				right: '750px',
				backgroundColor: hover ? "lightgrey" : "lightblue",
				border: "none",
				borderRadius: "5px",
				padding: "10px 20px",
				margin: "20px",
				textAlign: "center",
				cursor: "pointer",
				transition: "background-color 0.3s ease",
			}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={() => unpair()}>Unpair</button>

		</div>
	);
}



