// Importing necessary dependencies and modules
import { Contract } from "ethers";
import { useMemo } from "react";
import { useWeb3Context } from "../context/Web3Context";
import ABI from "../abis/Greeting.json";

// The Ethereum address of the Greeting contract
const address = "0xf22063aC68185A967eb71a2f5b877336b64bF9E1";

// Custom hook for interacting with the Greeting contract
const useGreetingContract = () => {
  // Access the Web3 context to retrieve the state, including the signer
  const { state } = useWeb3Context();

  // Memoize the contract instance to prevent unnecessary re-creations
  return useMemo(
    // Create a new Contract instance if a signer is available, otherwise return null
    () => (state.signer ? new Contract(address, ABI, state.signer) : null),
    // Update the contract instance whenever the signer changes
    [state.signer]
  );
};

// Export the useGreetingContract hook for use in other components
export default useGreetingContract;
