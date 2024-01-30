"use client";

import React from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useWeb3Context } from "../../context/Web3Context";
import { FaEthereum } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";

const BSCTChainID = 97;

export default function Home() {
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain, provider },
  } = useWeb3Context();

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
    </div>
  );
}
