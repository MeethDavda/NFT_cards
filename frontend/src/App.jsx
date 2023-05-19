import { useState, useEffect } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { ethers } from "ethers";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import NFTAddress from "../contractsData/NFT-address.json";
import NFT from "../contractsData/NFT.json";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Create_NFT from "./components/Create_NFT";
import MyNFT from "./components/MyNFT";

function App() {
  const [account, setAccount] = useState(null);
  const [marketplace, setMarketplace] = useState(null);

  const [nft, setNft] = useState(null);
  const [provider, setProvider] = useState("");
  const [signer, setSigner] = useState("");

  // console.log(marketplace, "nft");

  const web3Handler = async () => {
    // console.log("pressed");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);

    const provider = new ethers.providers.Web3Provider(window.ethereum); //ethereum spelling was wrong lol

    const signer = provider.getSigner();

    setProvider(provider);
    setSigner(signer);
    loadContracts(signer);
  };

  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);

    const nft = new ethers.Contract(NFTAddress.address, NFT.abi, signer);
    // console.log(marketplace, "nft");
    setNft(nft);
  };

  return (
    <div className="m-0">
      <BrowserRouter>
        <Navbar web3Handler={web3Handler} account={account} />
        <Routes>
          <Route
            element={<Home marketplace={marketplace} nft={nft} />}
            path="/"
          />
          <Route
            element={<Create_NFT marketplace={marketplace} nft={nft} />}
            path="/create"
          />
          <Route element={<MyNFT />} path="/mynft" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
