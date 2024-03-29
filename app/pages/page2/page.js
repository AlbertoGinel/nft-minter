"use client";

import { useMemo, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useWeb3Context } from "../../context/Web3Context";
import { MdCheck, MdError } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import useGreet from "../../hooks/useGreet";
import Link from "next/link";
import useGreeting from "../../hooks/useGreeting";

const BSCTChainID = 97;

export default function Home() {
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain },
  } = useWeb3Context();

  const { lastGreeter, lastMessage } = useGreeting();
  // Retrieves greeting information from the `useGreeting` hook
  const { greet, loading } = useGreet();
  // Retrieves greeting function and loading state from the `useGreet` hook

  //input
  const [newMessage, setNewMessage] = useState("");

  // Creates a memoized function to check if the current network is BSCT
  const correctNetwork = useMemo(() => {
    return currentChain === BSCTChainID;
  }, [currentChain]);

  // Handles form submission by sending the new message to the `greet` function
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    if (newMessage.trim() === "") return; // Prevents sending an empty message

    greet(newMessage); // Sends the new message to the greeting contract
  };

  return (
    <div>
      <Head>
        <title>Next + Ethers dApp</title>
      </Head>
      <HStack
        width="full"
        as="header"
        height="80px"
        px={4}
        alignItems="center"
        bg="gray.100"
      >
        <HStack as="nav" width="full" justifyContent="space-between">
          <HStack>
            {!isAuthenticated ? (
              <Button
                onClick={connectWallet}
                variant="solid"
                bg="blue.400"
                colorScheme="blue"
                gap={2}
                color="white"
              >
                <Icon as={FaEthereum} />
                Connect wallet
              </Button>
            ) : (
              <Button
                onClick={disconnect}
                variant="solid"
                bg="red.400"
                colorScheme="red"
                color="white"
                gap={2}
              >
                <Icon as={BiLogOut} />
                Disconnect
              </Button>
            )}
          </HStack>
        </HStack>
      </HStack>
      {isAuthenticated &&
        (correctNetwork ? (
          <VStack ml={4} mt={4} spacing={4} alignItems="flex-start">
            <Text>
              Last message: {lastMessage ? lastMessage : "Loading..."}
            </Text>
            <HStack>
              <Text>Last greeter: </Text>
              <Link
                href={
                  lastGreeter
                    ? `https://testnet.bscscan.com/address/${lastGreeter}`
                    : ""
                }
                target="_blank"
                passHref
              >
                <Text as="a" _hover={{ textDecoration: "underline" }}>
                  {lastGreeter
                    ? lastGreeter.toLowerCase() === address?.toLowerCase()
                      ? "You"
                      : lastGreeter
                    : "Loading..."}
                </Text>
              </Link>
            </HStack>
            <Box
              onSubmit={handleSubmit}
              as="form"
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Input
                type="text"
                placeholder="Enter new message..."
                variant="flushed"
                colorScheme="blue"
                name="message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button
                type="submit"
                variant="solid"
                bg="green.400"
                colorScheme="green"
                color="white"
                gap={2}
                isLoading={loading}
              >
                <Icon as={MdCheck} />
                Submit
              </Button>
            </Box>
          </VStack>
        ) : (
          <HStack spacing={2} ml={4} mt={4}>
            <Icon as={MdError} color="red.400" />
            <Text color="red.400">Please switch to BSC Testnet</Text>
          </HStack>
        ))}
    </div>
  );
}
