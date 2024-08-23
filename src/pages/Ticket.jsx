"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import signAndSendTransaction from "./utils/signAndSendContract";
import createTransferTransaction from "./utils/createTransferTransaction";
import CustomCursor from '../components/CustomCursor.js';
import video from '../assets/images/dapp.mp4';
import Navbar from './Dashboardd/Navbar';
import Header2 from './Dashboardd/header2.js';
import './Dashboardd/dashboard.css';


const Ticket = () => {
  const router = useNavigate();
  const [selectedValue, setSelectedValue] = useState(0);
  const [userSOLBalance, setSOLBalance] = useState(0);
  const [state, setState] = useState();
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [loadingFile, setLoadingFile] = useState([]);
  const [address, setAddress] = useState("");
  const [sign, setSign] = useState(false);
  const [pro, setPro] = useState();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1440);

  const handleRadioChange = (event) => {
    const value = event.target.value;
    let parsedValue;

    if (value.includes(".")) {
      parsedValue = parseFloat(value);
    } else {
      parsedValue = parseInt(value, 10);
    }

    setSelectedValue(parsedValue);
  };

  // const fetchLoadingData = async () => {
  //   const response = await axios.post("/api/admin/landing/getLanding");
  //   setLoadingFile(response.data.allData);
  // };

  const wallet = useWallet();
  const { publicKey } = useWallet();

  const handleButtonClick = () => {
    if (!audioPlayed) {
      // Handle audio playing logic here
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const allData = await axios.post("/api/getSlotData");
  //     if (allData?.data?.allData.length > 0) {
  //       setState(allData?.data?.allData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  useEffect(() => {
    // fetchData();
    // fetchLoadingData();
  }, []);

  useEffect(() => {
    handleButtonClick();
  }, [audioPlayed]);

  const WalletContainer = () => { };

  const [isVisible, setVisible] = useState(false);

  const value = { isVisible, setVisible };

  const onError = useCallback((error) => {
    console.error(error);
  }, []);

  const endpoint = useMemo(() => "https://solana-api.projectserum.com", []);

  useEffect(() => {
    const getProvider = () => {
      if (typeof window !== "undefined" && "phantom" in window) {
        const provider = window.phantom?.solana;

        if (provider?.isPhantom) {
          return provider;
        }
      }

      window.open("https://phantom.app/", "_blank");
    };

    setPro(getProvider());
  }, []);



  const provider = pro;

  const walletAddress = async () => {
    try {
      const resp = await provider.connect();
      setAddress(resp.publicKey.toString());
      if (resp.publicKey) {
        const SOL = connection.getAccountInfo(resp.publicKey);
        SOL.then((res) => setSOLBalance(res?.lamports / LAMPORTS_PER_SOL));
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };
  useEffect(() => {
    walletAddress();
  }, []);
  const network = "https://api.devnet.solana.com";
  const connection = new Connection(network);

  const makePostRequest = async (address, selectedValue) => {
    try {
      if (selectedValue) {
        const form = new FormData();
        form.append("address", address);
        form.append("selectedValue", selectedValue);
        const response = await axios.post("/api/buyRoll", form);

        if (response.status === 200 || response.status === 201) {
          router("/");
        } else {
          console.error("POST request failed:", response.statusText);
        }
      } else {
        console.warn("Signature or selectedValue is missing.");
      }
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const datasend = async (event) => {
    event.preventDefault();

    if (userSOLBalance == null) {
      alert("Your balance is too low");
      return;
    }

    if (selectedValue <= 0) {
      alert("Please select a plan");
      return;
    }

    try {
      const transaction = await createTransferTransaction(
        provider.publicKey,
        connection,
        selectedValue
      );

      const signature = await signAndSendTransaction(provider, transaction);

      if (signature && selectedValue) {
        await makePostRequest(address, selectedValue);
      }

      if (signature) {
        setSign(true);
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1440);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navbarStyle = {
    display: isSmallScreen ? 'none' : 'flex',
    
  };
  
  const header2Style = {
    display: isSmallScreen ? 'block' : 'none',
    zIndex: 999,
  };
  return (
    <>
      <video
        className="dashboard-video"
        src={video}
        autoPlay
        muted
        loop
      ></video>
        <CustomCursor />
        <div className="dashboard-main-box">
          <Navbar style={navbarStyle} />
          <Header2 style={header2Style} />
        </div>
      <div className="container py-4 d-flex align-items-center justify-content-center" style={{ background: 'transparent', height: '100vh' }}>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="mb-4 d-flex align-items-center gap-3 justify-content-center">
            <button
              onClick={() => router.push('/')}
              className="btn btn-warning px-4 py-2 rounded font-weight-bold"
            >
              Home
            </button>
            <h4 className=" ticket-balance">
              Balance : {userSOLBalance ? userSOLBalance : 0}
            </h4>
            {address ? (
              <h5 className="mt-2">
                {address.substring(0, 5)}...{address.substring(address.length - 5)}
              </h5>
            ) : (
              <button className="ticket-balance " onClick={walletAddress}>
                Wallet
              </button>
            )}
          </div>
          <div className="text-center mb-4">
            <h2 className="display-4 font-weight-bold">Buy Roll</h2>
          </div>
          <form>
            <ul className="list-group w-75 mx-auto">
              <li className="list-group-item d-flex align-items-center">
                <input
                  id="list-radio-license"
                  type="radio"
                  value="0.1"
                  name="list-radio"
                  onChange={handleRadioChange}
                  className="form-check-input me-2"
                />
                <label htmlFor="list-radio-license" className="form-check-label">
                  $.10c-1 roll
                </label>
              </li>
              <li className="list-group-item d-flex align-items-center">
                <input
                  id="list-radio-125rolls"
                  type="radio"
                  value="1"
                  name="list-radio"
                  onChange={handleRadioChange}
                  className="form-check-input me-2"
                />
                <label htmlFor="list-radio-125rolls" className="form-check-label">
                  $1 - 125 rolls + 25 Free Rolls Bonus
                </label>
              </li>
              <li className="list-group-item d-flex align-items-center">
                <input
                  id="list-radio-150rolls"
                  type="radio"
                  value="10"
                  name="list-radio"
                  onChange={handleRadioChange}
                  className="form-check-input me-2"
                />
                <label htmlFor="list-radio-150rolls" className="form-check-label">
                  $10 - 150 rolls + 50 Free Rolls Bonus
                </label>
              </li>
              <li className="list-group-item d-flex align-items-center">
                <input
                  id="list-radio-750rolls"
                  type="radio"
                  value="50"
                  name="list-radio"
                  onChange={handleRadioChange}
                  className="form-check-input me-2"
                />
                <label htmlFor="list-radio-750rolls" className="form-check-label">
                  $50 - 750 rolls + 250 Free Rolls Bonus
                </label>
              </li>
              <li className="list-group-item d-flex align-items-center">
                <input
                  id="list-radio-1500rolls"
                  type="radio"
                  value="100"
                  name="list-radio"
                  onChange={handleRadioChange}
                  className="form-check-input me-2"
                />
                <label htmlFor="list-radio-1500rolls" className="form-check-label">
                  $100 - 1500 rolls + 500 Free Rolls Bonus
                </label>
              </li>
            </ul>
            <div className="text-center mt-4">
              <button
                type="submit"
                onClick={datasend}
                className="btn btn-primary px-5 py-2.5"
              >
                Buy
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Ticket;
