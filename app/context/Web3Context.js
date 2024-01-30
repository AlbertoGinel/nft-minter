"use client";

// Imports necessary libraries
import { createContext, useContext } from "react";
import useWeb3Provider from "../hooks/useWeb3Provider";

// Creates a React context for managing Ethereum connection data
const Web3Context = createContext(null); // Creates an empty context object

// Defines the `Web3ContextProvider` component
const Web3ContextProvider = ({ children }) => {
  // Retrieves the Web3 connection information from the `useWeb3Provider` hook
  const { connectWallet, disconnect, state } = useWeb3Provider();
  // Retrieves connectWallet, disconnect, and state functions from the hook

  // Returns a React component that provides access to the Web3 context
  return (
    // Wraps the provided children in a context provider
    <Web3Context.Provider
      // Sets the context value to an object containing the Web3 connection info
      value={{
        connectWallet, // Provides access to the connectWallet function
        disconnect, // Provides access to the disconnect function
        state, // Provides access to the Web3 state object
        // Renders the provided children, passing the Web3 context to them
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

// Exports the `Web3ContextProvider` component
export default Web3ContextProvider;

// Exports a function for accessing the Web3 context
export const useWeb3Context = () => useContext(Web3Context);
// Provides a way to access the Web3 context from other components
