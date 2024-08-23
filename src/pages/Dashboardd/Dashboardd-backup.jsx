import React, { useState, useEffect } from 'react';
import { CiWallet } from "react-icons/ci";
import './Dashboard.css'; // Import Dashboard-specific CSS
import Navbar from './Navbar';



const Dashboard = () => {
  const [solPrice, setSolPrice] = useState(null);
  const [rayPrice, setRayPrice] = useState(null);
  const [solPriceChange, setSolPriceChange] = useState(null);
  const [rayPriceChange, setRayPriceChange] = useState(null);

  // Function to fetch Solana price
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



      <video
        className="dashboard-video"
        src="../assets/video/dapp.mp4"
        autoPlay
        muted
        loop
      ></video>





      <div className="dashboard-content">


      <Navbar style={{ zIndex: 5 }} />

        


        {/* New box with unique styling */}
        <div className="new-dashboard-box">
          <h2 className="newbox-text">.... R1000 Protocol intialized ....</h2>
          <h2 className="newbox-text">...</h2>
        </div>

        <div className="wallet-icon"> <CiWallet style={{ width: '30px', height: '30px' }}/></div>

        <div className="wallet-box">
        
        <p className="wallet-text"> Connect Wallet</p>
        </div>


       {/*} <div className="dashboard-header">
          <h1>DASHBOARD STATS</h1>
          <p>Work in Progress (WIP)</p>
          <p className='transparent-text'>.</p>
        </div> */}


      <div className="dashboard-box">
                  <div className="crypto-wallet-box">
                      <h3>Crypto Wallet</h3>
                      <div> .</div>

                      <div className="dashboard-section">
                          {/* Content for first section */}
                      </div>
                      <div className="dashboard-section">
                          {/* Content for second section */}
                      </div>
                      <div className="dashboard-section">
                          {/* Content for third section */}
                      </div>
                  </div>
                  </div>


        {/* LOWER BOX */}
        <div className="dashboard-box">
          <div className="coin-grid" >
            <div className="g-col-4-header"><u>From</u></div>
            <div className="g-col-4-header"><u>Price</u></div>
            <div className="g-col-4-header"><u>24 Hour Price Change</u></div>
            <div className="g-col-4-header"><u>Graph 1</u></div>
            <div className="g-col-4">SOL</div>
            <div className="g-col-4">${solPrice !== null ? solPrice.toFixed(2) : 'Loading...'}</div>
            <div className="g-col-4">{solPriceChange !== null ? `${solPriceChange.toFixed(2)}%` : 'Loading...'}</div>
            <div className="g-col-4">GRAPH 1</div>
            <div className="g-col-4-header"><u>From</u></div>
            <div className="g-col-4-header"><u>Price</u></div>
            <div className="g-col-4-header"><u>24 Hour Price Change</u></div>
            <div className="g-col-4-header"><u>Graph 2</u></div>
            <div className="g-col-4">RAY</div>
            <div className="g-col-4">${rayPrice !== null ? rayPrice.toFixed(2) : 'Loading...'}</div>
            <div className="g-col-4">{rayPriceChange !== null ? `${rayPriceChange.toFixed(2)}%` : 'Loading...'}</div>
            <div className="g-col-4">GRAPH 2</div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Dashboard;
