import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import Web3ContextProvider from "./context/Web3Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio NFT",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <Web3ContextProvider>{children}</Web3ContextProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
