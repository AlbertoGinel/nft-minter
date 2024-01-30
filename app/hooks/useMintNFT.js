import { ethers } from "ethers";
import abi from "../abis/mint";
import { useWeb3Context } from "../context/Web3Context";
import { stringify } from "postcss";

function useMintNFT() {
  const { state } = useWeb3Context();
  const contractAddress = "0xE11e667E430A444D55a385eCB1245a12E266e228";
  const contract = new ethers.Contract(contractAddress, abi);

  const mintNFT = async (toAddress, name) => {
    try {
      // Check if the provider is injected (e.g., MetaMask)
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.enable(); // Request user's permission to connect
      }

      const transaction = await contract
        .connect(state.signer)
        .safeMint(toAddress, name);
      await transaction.wait();

      console.log("NFT successfully minted to", toAddress);
    } catch (error) {
      console.error("Failed to mint NFT:", error);
    }
  };

  const listMintedTokens = async () => {
    try {
      const result = await contract.connect(state.signer).listMintedTokens();

      const tokenIds = Array.from(result[0]);
      const tokenNames = result[1];

      const mintedTokens = tokenIds.map((id, index) => ({
        id: Number(id),
        name: tokenNames[index],
      }));

      console.log(mintedTokens);

      return mintedTokens;
    } catch (error) {
      console.error("Failed to fetch minted tokens:", error);
    }
  };

  const getContractName = async () => {
    try {
      const contractName = await contract.connect(state.signer).name();
      return contractName;
    } catch (error) {
      console.error("Failed to fetch contract name:", error);
    }
  };

  return { mintNFT, listMintedTokens, getContractName };
}

export default useMintNFT;
