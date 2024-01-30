// Importing necessary React hooks and the custom hook for the Greeting contract
import { useState } from "react";
import useGreetingContract from "./useGreetingContract";

// Custom hook for managing the greeting functionality
const useGreet = () => {
  // Get the Greeting contract instance using the custom hook
  const contract = useGreetingContract();
  // State variable to track the loading state during the greet operation
  const [loading, setLoading] = useState(false);

  // Asynchronous function to send a greeting message to the contract
  const greet = async (message) => {
    // Check if the contract instance is available
    if (!contract) return;

    // Set loading state to true to indicate the start of the greeting transaction
    setLoading(true);

    try {
      // Call the greet function on the contract with the provided message
      const transaction = await contract.greet(message);

      // Wait for the transaction to be mined and confirmed
      await transaction.wait();
    } catch {
      // Handle any errors during the greeting transaction (optional)
    } finally {
      // Set loading state to false regardless of success or failure
      setLoading(false);
    }
  };
  // Return the greet function and loading state as part of the hook's public API
  return { greet, loading };
};

// Export the useGreet hook for use in other components
export default useGreet;
