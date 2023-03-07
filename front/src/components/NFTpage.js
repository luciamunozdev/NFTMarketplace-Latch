import Navbar from "./Navbar";
import { useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState, useEffect } from "react";


export default function NFTPage() {

    const [data, updateData] = useState({});
    const [dataFetched, updateDataFetched] = useState(false);
    const [message, updateMessage] = useState("");
    const [currAddress, updateCurrAddress] = useState("0x");
    const [transferAddress, updateTransferAddress] = useState("0x");
    const [messageNFT, updateMessageNFT] = useState("");


    async function getNFTData(tokenId) {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
        //create an NFT Token
        const tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log(listedToken);

        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        console.log(item);
        updateData(item);
        updateDataFetched(true);
    }

    async function buyNFT(tokenId) {
        try {
            const ethers = require("ethers");
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            //Pull the deployed contract instance
            let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
            const salePrice = ethers.utils.parseUnits(data.price, 'ether')
            updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
            //run the executeSale function
            let transaction = await contract.executeSale(tokenId, { value: salePrice });
            await transaction.wait();

            alert('You successfully bought the NFT!');
            updateMessage("");
        }
        catch (e) {
            alert("Upload Error" + e)
        }
    }

    async function transfer(tokenId) {
        try {
            const ethers = require("ethers");
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            //updateCurrAddress(signer.address);
            console.log("address", currAddress)
            //Pull the deployed contract instance
            let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
            updateMessageNFT("Transferring the NFT... Please Wait (Upto 5 mins)")
            //run the executeSale function
            console.log("transfer address", transferAddress)
            console.log("owner", data.seller)
            console.log("tokenId", tokenId)
            let transaction = await contract.transferNFT(transferAddress, tokenId);
            await transaction.wait();

            alert('You successfully transferred the NFT!');
            updateMessageNFT("");
        }
        catch (e) {
            alert("Upload Error" + e)
        }
    }



    async function fetchNFTData(tokenId) {
        await getNFTData(tokenId);
        console.log("address:", currAddress)
        console.log("data", data)
    }

    const params = useParams();
    const tokenId = params.tokenId;


    async function getAddress() {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        updateCurrAddress(addr);
    }

    useEffect(() => {
        getAddress();
        fetchNFTData(tokenId);
    }, []);

    return (
        <div style={{ "min-height": "100vh" }}>
            <Navbar></Navbar>
            <div className="flex ml-20 mt-20">
                <img src={data.image} alt="" className="w-2/5" />
                <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        <strong style={{ color: "white" }}>Name:</strong> <span style={{ color: "#3F4596" }}>{data.name}</span>
                    </div>
                    <div>
                        <strong>Description: </strong> <span style={{ color: "#3F4596" }}>{data.description}</span>
                    </div>
                    <div>
                        <strong> Price:</strong> <span style={{ color: "#3F4596" }}>{data.price + " ETH"}</span>
                    </div>
                    <div>
                        <strong>Owner:</strong>  <span style={{ color: "#3F4596" }} >{data.seller}</span>
                    </div>
                    <div>
                        {currAddress != data.seller ?
                            <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                            : <div style={{ color: "#862A38", fontSize: "18px" }} >You are the owner of this NFT, you can't buy it</div>
                        }
                        <div style={{ color: "white", fontSize: "15px" }} >{message}</div>
                    </div>
                    <div>
                        {currAddress == data.seller ? (
                            <div>
                                <input type="text" style={{ color: "black", padding: "2px", borderRadius: '5px', fontSize: "18px" }}
                                    onChange={(e) => updateTransferAddress(e.target.value)} /> &nbsp;
                                <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded text-sm mr-5" onClick={() => transfer(tokenId)}>Transfer</button>
                            </div>
                        )
                            : <div style={{ color: "#862A38", fontSize: "18px" }} > You are not the owner of this NFT</div>
                        }
                        <div style={{ color: "white", fontSize: "15px" }} >{messageNFT}</div>
                    </div>


                </div>
            </div>
        </div>
    )
}