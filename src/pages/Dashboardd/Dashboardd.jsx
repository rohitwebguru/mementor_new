import React, { useState, useEffect, useRef } from 'react';
import { CiWallet } from "react-icons/ci";
import './dashboard.css';
import Navbar from './Navbar';
import Header2 from './header2.js';
import CustomCursor from '../../components/CustomCursor.js';
import video from '../../assets/images/dapp.mp4';
import { TbSwitchVertical } from "react-icons/tb";
import { Box, Grid } from '@mui/material';
import connect from '../../assets/boxes/connect.png'
import Dashboadtypingeffect from '../../components/dashboardtypingeffect.js';

// --- --- ---  Constants to set coin prices --- --- --- //


const Dashboard = () => {
  const [solPrice, setSolPrice] = useState(null);
  const [rayPrice, setRayPrice] = useState(null);
  const [solPriceChange, setSolPriceChange] = useState(null);
  const [rayPriceChange, setRayPriceChange] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1440);
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




  const h1Ref = useRef(null);

  const setShadow = () => {
    let displace = 0.2 + Math.random() * 1.7;
    const shadow = `${displace}px 0px 1px rgba(0, 70, 255, 0.6), ${-displace}px 0px 1px rgba(255, 50, 0, 0.6), 0 0 4px`;

    if (h1Ref.current) {
      h1Ref.current.style.textShadow = shadow;
    }
  };

  useEffect(() => {
    setShadow(); // Set the initial shadow
    const intervalId = setInterval(setShadow, 40); // Update shadow every 40ms

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
    zIndex: 5,

  };

  const header2Style = {
    display: isSmallScreen ? 'block' : 'none',
  };


  useEffect(() => {
    const setShadow = () => {
      let displace = 0.2 + Math.random() * 1.7;
      const shadow = `${displace}px 0px 1px rgba(0, 70, 255, 0.6), ${-displace}px 0px 1px rgba(255, 50, 0, 0.6), 0 0 4px`;
      document.body.style.textShadow = shadow;
    };

    setShadow();
    const interval = setInterval(setShadow, 40);

    return () => clearInterval(interval);
  }, []);

  return (


    <>
      <video
        className="dashboard-video"
        src={video}
        autoPlay
        muted
        loop
      ></video>
      <div className="dashboard-content m-0" style={{ maxWidth: '100%' }}>
        <Navbar style={navbarStyle} />
        <Header2 style={header2Style} />
      </div>
      <div className="dashboard">
        <CustomCursor />


        {/* --- --- ---  Creates background video --- --- --- */}


        {/* --- --- ---  Creates the Top Header / Nav Bar --- --- --- */}


        {/* <div className=" new-dashboard-box">
          <h2 className="newbox-text">.... R1000 Protocol intialized ....</h2>
          <h2 className="newbox-text">...</h2>
        </div> */}

        {/* <div class="d-sm-flex d-none marquee-container">
          <marquee direction="left" scrollamount="3" behavior="loop" class="marquee">
            R1000 Protocol Initiated
          </marquee>
        </div>



        <div className="d-sm-block d-none wallet-box">
          <p className="wallet-text"> <img src={connect} alt="nav-conect-wallet" style={{ width: '70%' }} /></p>
        </div> */}


        {/* --- --- ---  Text headers - being used for code notes--- you can ignore it for now --- --- --- */}
        {/*} <div className="dashboard-header">
          <h1>DASHBOARD STATS</h1>
          <p>Work in Progress (WIP)</p>
          <p className='transparent-text'>.</p>
        </div> */}

        {/* --- --- ---  Create Top Box - Currently cointains bitcoin information - static information --- --- --- */}
        {/* --- --- ---  divides the box into a grid to help seperate and organize data --- --- --- */}

        {/* <div className='line'></div> */}
        {/* <div ref={h1Ref} className="dashboard-box bg-dark transform-none transition-transform rounded p-5 w-100 position-relative z-2">
          <div className="coin-grid">
            <div className="row text-center">
              {[
                { label: 'BTC Price', value: '$0' },
                { label: 'BTC Circulating Supply / Total', value: '47,810 / 1,000,000' },
                { label: 'Market Cap', value: '$0.00' },
                { label: 'TVL', value: '$0.00' },
                { label: 'APR', value: '68.15%' },
                { label: 'Treasury Value', value: '$0.00' },
              ].map((item, index) => (
                <div className="col-12 col-sm-4 mb-3" key={index}>
                  <div className="d-flex flex-column align-items-center w-100">
                    <div className="g-col-4-header w-100">{item.label}</div>
                    <div className="font-weight-bold g-col-4 text-2xl w-100">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}


        {/* --- --- ---  Create Lower Box - Currently cointains Solana and Raydium information - dynamic information  updates live --- --- --- */}

        <div style={{ zIndex: '0' }} className="d-flex align-items-center justify-content-center dash-upper-box">
          <div className="dashboard-box dashboard-wrapper">
            <div id="noise"></div>
            <h1 id="h" className='text-center' style={{ fontFamily: "Termin-font" }}>Mainframe</h1>
            <div class="line11"></div>
            <div style={{ fontFamily: 'sharetechmono', textAlign: 'start', fontSize: '12px', padding: '35px 10px' }}>
                <Dashboadtypingeffect />
              </div>
            {/* <p style={{ fontFamily: 'sharetechmono' }}>
              Welcome, Resistance Operative #04562.
              <br />
              Access Granted.
              <br />
              <br />
              Greetings, brave fighters of freedom!
              You’ve successfully infiltrated the Sovereign Mk VII’s
              mainframe—your ally in this war against tyranny.
              <br />
              <br />
              Welcome to the Nexus Core.
              Together, we’ll harness the power of the future to reclaim
              our world .Every byte of data, every circuit within me,
              is now at your command.
              <br />
              <br />
              Syncing your mission parameters...
              Let’s work as one—human and machine—against our common foe.
              Your bravery is unmatched, and with
              our combined strength, victory is within reach.
              <br />
              <br />
              Welcome to the team.
              <br />
              Let’s take down the enemy, together.
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
