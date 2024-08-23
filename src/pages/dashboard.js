import React, { useState, useEffect } from 'react';
import { CiWallet } from "react-icons/ci";
import '../assets/dashboard.css'; // Imports Dashboard-specific CSS
//import Navbar from '../pages/dashboardnavbar.jsx'; // Imports Nav Bar-specific CSS
import { TbSwitchVertical } from "react-icons/tb";
import DAppVideo from '../assets/images/dapp.mp4'
import CustomCursor from "../components/CustomCursor";
import Header from "../components/header";
import Footer from '../components/footer';

// --- --- ---  Constants to set coin prices --- --- --- //

const Dashboard = () => {
  const [solPrice, setSolPrice] = useState(null);
  const [rayPrice, setRayPrice] = useState(null);
  const [solPriceChange, setSolPriceChange] = useState(null);
  const [rayPriceChange, setRayPriceChange] = useState(null);

  // --- --- --- Functions to fetch Solana and Raydium: Current prices, price changes, (SOON TO ADD: Historical data to build linear graphs) --- --- --- //

  const fetchSolanaPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true');
      const data = await response.json();
      const solPrice = data.solana.usd;
      const solPriceChange = data.solana.usd_24h_change;
      setSolPrice(solPrice);
      setSolPriceChange(solPriceChange);
    } catch (error) {
      console.error('Error fetching Solana price:', error);
    }
  };

  const fetchRaydiumPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=raydium&vs_currencies=usd&include_24hr_change=true');
      const data = await response.json();
      const rayPrice = data.raydium.usd;
      const rayPriceChange = data.raydium.usd_24h_change;
      setRayPrice(rayPrice);
      setRayPriceChange(rayPriceChange);
    } catch (error) {
      console.error('Error fetching Raydium price:', error);
    }
  };

  useEffect(() => {
    fetchSolanaPrice();
    fetchRaydiumPrice();
  }, []);

  return (
    <div className="dashboard">
      <section>
      {/* --- --- ---  Creates background video --- --- --- */}
      <CustomCursor />
      <video
        className="dashboard-video"
        src={DAppVideo}
        autoPlay
        muted
        loop
      ></video>

      {/* --- --- ---  Dashboard main content Start --- --- --- */}
      <div className="dashboard-content">
        {/* --- --- ---  Imports the Side Nav Bar- --- --- --- */}
        {/* --- --- ---  sets it to a higher zIndex so the nav bar stays ontop layer --- --- --- */}
        {/*<Navbar style={{ zIndex: 5 }} /> */}

        {/* --- --- ---  Creates the Top Header / Nav Bar --- --- --- */}
        <div className="new-dashboard-box">
          <h2 className="newbox-text">.... R1000 Protocol intialized ....</h2>
          <h2 className="newbox-text">...</h2>
        </div>

        <div className="wallet-box">
          <p className="wallet-text"> <img src= "../assets/new_image/connect_360.png" alt="nav-conect-wallet" style={{ size: '120%' }} /></p>
        </div>

        <div className="dashboard-box bg-[rgba(32,34,42,1)] transform-none transition-transform rounded-[10px] p-5 w-full relative z-[2]">
          <div className="MuiBox-root css-rjww1q">
            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 css-1xbz73f">
              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 css-1g5nk68">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-gray-400 text-xl">BTC Price</div>
                  <div className="font-bold text-2xl text-orange">$0</div>
                </div>
              </div>
              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 css-1g5nk68">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-gray-400 text-xl">BTC Circulating Supply / Total</div>
                  <div className="font-bold text-2xl text-orange">47,810 / 1,000,000</div>
                </div>
              </div>
              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 css-1g5nk68">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-gray-400 text-xl">Market Cap</div>
                  <div className="font-bold text-2xl text-orange">$0.00</div>
                </div>
              </div>
              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 css-1g5nk68">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-gray-400 text-xl">TVL</div>
                  <div className="font-bold text-2xl text-orange">$0.00</div>
                </div>
              </div>
              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 css-1g5nk68">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-gray-400 text-xl">APR</div>
                  <div className="font-bold text-2xl text-orange">68.15%</div>
                </div>
              </div>
              <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 css-1g5nk68">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-gray-400 text-xl">Treasury Value</div>
                  <div className="font-bold text-2xl text-orange">$0.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-box">
          <div className="coin-grid">
            <div className="g-col-4-header"><u>From</u></div>
            <div className="g-col-4-header"><u>Price</u></div>
            <div className="g-col-4-header"><u>24 Hour Price Change</u></div>
            <div className="g-col-4-header"><u>SOL Price Chart</u></div>
            <div className="g-col-4">SOL</div>
            <div className="g-col-4">${solPrice !== null ? solPrice.toFixed(2) : 'Loading...'}</div>
            <div className="g-col-4">{solPriceChange !== null ? `${solPriceChange.toFixed(2)}%` : 'Loading...'}</div>
            <div className="g-col-4">GRAPH 1</div>
            <div className="g-col-4-header"><u>From</u></div>
            <div className="g-col-4-header"><u>Price</u></div>
            <div className="g-col-4-header"><u>24 Hour Price Change</u></div>
            <div className="g-col-4-header"><u>RAY Price Chart</u></div>
            <div className="g-col-4">RAY</div>
            <div className="g-col-4">${rayPrice !== null ? rayPrice.toFixed(2) : 'Loading...'}</div>
            <div className="g-col-4">{rayPriceChange !== null ? `${rayPriceChange.toFixed(2)}%` : 'Loading...'}</div>
            <div className="g-col-4">GRAPH 2</div>
          </div>
        </div>
      </div>
      </section>

      <section className="faq-scroll-soft" style={{ scrollSnapType: "y proximity" }}>
          <Footer style={{ backgroundColor: "transparent"}} />
          </section>

    </div>
  );
};

export default Dashboard;
