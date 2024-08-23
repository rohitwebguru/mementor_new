import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { toast, ToastContainer } from "react-toastify";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import Footer from './components/footer';
const root = ReactDOM.createRoot(document.getElementById("root"));
const endpoint = web3.clusterApiUrl("devnet");
root.render(
  <ConnectionProvider endpoint={endpoint} >
    <WalletProvider wallets={[]} autoConnect>
      <React.StrictMode>
        <App />
        {/* <Footer /> */}
        <ToastContainer autoClose={3000} draggableDirection="x"/>
      </React.StrictMode>
    </WalletProvider>
  </ConnectionProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
