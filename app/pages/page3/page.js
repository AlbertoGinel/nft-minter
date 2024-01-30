"use client";
import "../../globals.css";
import React, { useState, useEffect } from "react";
import useMintNFT from "../../hooks/useMintNFT";
import { useWeb3Context } from "../../context/Web3Context";

function MyComponent() {
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address },
  } = useWeb3Context();

  const { mintNFT, listMintedTokens, getContractName } = useMintNFT();

  const [name, setName] = useState("");
  const [mintedTokens, setMintedTokens] = useState([]);
  const [contractName, setContractName] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchMintedTokens();
      fetchContractName();
    }
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleMint = async () => {
    try {
      await mintNFT(address, name);
      fetchMintedTokens(); // Update the list after minting
    } catch (error) {
      console.error("Failed to mint NFT:", error);
    }
  };

  const fetchMintedTokens = async () => {
    try {
      const result = await listMintedTokens();
      setMintedTokens(result);
    } catch (error) {
      console.error("Failed to fetch minted tokens:", error);
    }
  };

  const fetchContractName = async () => {
    try {
      const name = await getContractName();
      setContractName(name);
    } catch (error) {
      console.error("Failed to fetch contract name:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>{address}</div>
        <div>
          {!isAuthenticated ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={connectWallet}
            >
              Connect wallet
            </button>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={disconnect}
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">{getContractName}</h1>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={name}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3"
          />
        </label>
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleMint}
      >
        Mint NFT
      </button>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Minted Tokens:</h3>
        <ul>
          {mintedTokens?.map((token, index) => (
            <li
              key={index}
              className="border-b py-2 flex justify-between items-center"
            >
              <span>{`${token.id}: ${token.name}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyComponent;
