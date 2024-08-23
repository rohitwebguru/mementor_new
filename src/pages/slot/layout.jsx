import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { ContextProvider } from '../../context'
// import { config } from '../../config'
import { cookieToInitialState } from 'wagmi'
import { useCallback, useMemo } from "react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  CoinbaseWalletAdapter,
  PhantomWalletAdapter,
  CloverWalletAdapter,
  SolflareWalletAdapter,
  SolongWalletAdapter,

  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Suspense } from 'react'

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
require("@solana/wallet-adapter-react-ui/styles.css");
import { WalletError } from "@solana/wallet-adapter-base";
import { useAutoConnect } from "../../context/autoConnectProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slot Machine",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { autoConnect, setAutoConnect } = useAutoConnect();

  // const initialState = cookieToInitialState(config, ''); 
  // console.log(initialState,"statatatt")
  const network = WalletAdapterNetwork.Devnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new SolongWalletAdapter({ network }),
      new TorusWalletAdapter(),
      // new LedgerWalletAdapter(),
      // new SlopeWalletAdapter(),
    ],
    [network],
  );
    const onError = useCallback((error: WalletError) => {
   
    console.error(error);
  }, []);
  const endpoint = useMemo(() => "https://solana-api.projectserum.com", []);

  return (
    <>
     <Suspense>
     {/* <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        onError={onError}
        autoConnect={autoConnect}
      >   */}
      {/* <WalletModalProvider>   */}
    {/* // <ContextProvider initialState={initialState}> */}
    {/* <WalletMultiButton className="btn btn-ghost mr-4" /> */} 

    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    {/* </WalletModalProvider> */}
      {/* </WalletProvider>   */}
  {/* // </ContextProvider> */}
    {/* </WalletModalProvider> */}
    {/* </ConnectionProvider> */}
    </Suspense>
    </>
  );
}
