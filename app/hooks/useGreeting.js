// Importing necessary React hooks and the custom hook for the Greeting contract
import { useEffect, useState } from "react";
import useGreetingContract from "./useGreetingContract";

// Custom hook for managing Greeting-related functionality
const useGreeting = () => {
  // Retrieve the Greeting contract instance using the custom hook
  const contract = useGreetingContract();

  // State variables to store the last message and greeter
  const [lastMessage, setLastMessage] = useState(null);
  const [lastGreeter, setLastGreeter] = useState(null);

  // Effect to fetch and update the last message and last greeter when the contract changes
  useEffect(() => {
    // Check if the contract is available
    if (!contract) return;

    // Variable to track whether the component is still mounted
    let mounted = true;

    // Asynchronous function to get the last message from the contract
    const getLastMessage = async () => {
      try {
        const response = await contract.getMessage();

        // Update the state only if the component is still mounted
        if (mounted) {
          setLastMessage(response);
        }
      } catch {}
    };

    // Asynchronous function to get the last greeter from the contract
    const getLastGreeter = async () => {
      try {
        const response = await contract.getLastGreeter();

        // Update the state only if the component is still mounted
        if (mounted) {
          setLastGreeter(response);
        }
      } catch {}
    };

    // Fetch the last message and last greeter when the component is mounted
    if (mounted) {
      getLastMessage();
      getLastGreeter();
    }

    // Cleanup function to mark the component as unmounted when it is unmounted
    return () => {
      mounted = false;
    };
  }, [contract]);

  // Return the last message and last greeter as part of the hook's public API
  return { lastMessage, lastGreeter };
};

// Export the useGreeting hook for use in other components
export default useGreeting;
