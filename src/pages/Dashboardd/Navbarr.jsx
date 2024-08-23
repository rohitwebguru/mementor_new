import React from 'react';
import { Link } from 'react-router-dom';
import './dashnavbar.css';
import logo from '../../assets/logo/r1000logo.png';
import navstacking from '../../assets/navpics/nav-staking.png'
import navdap from '../../assets/navpics/nav-dapp.png'
import navboost from '../../assets/navpics/nav-boost.png'
import immortal from '../../assets/navpics/nav-immortalize.png'
import mooner from '../../assets/navpics/nav-mooners.png'
import nft from '../../assets/navpics/nav-nft.png'
import burning from '../../assets/navpics/nav-burning.png'
import charity from '../../assets/navpics/nav-charity.png'
import memenator from '../../assets/navpics/memenator.png'
import telegram from '../../assets/images/social.png'
import X from '../../assets/images/social1_360.png'
import music from '../../assets/images/music1_360.png'
import CustomCursor from "../../components/CustomCursor";
//  --- ---- ---  Social icons  --- ---- --- 
import { FaTwitter } from 'react-icons/fa';
import { FaTelegramPlane } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";

const Dashnavbar = () => {
  return (


    //  --- ---- --- Star of the Nav bar  --- ---- --- //

    <nav className="dashboard-navbar" 
    style={{   width: "250px", /* Width of the sidebar */
      height: "100%",
      position: "absolute",
      top: "-15px",
      left: "0vw",
      /* background-color: rgba(0, 0, 0, 0.89); */
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      padding: "20px 0",
      zIndex: "5"}}>


      <div className="dashboard-logo-container" >

        {/* Logo image on the top of the nav */}
        <img src={logo} alt="Logo" className="dashboard-logo" style={{ marginRight: '0px', opacity: "0" }} />

        {/* --- ---- --- Nav Bar Heading Text version - Use this if you want to stop using images for the nav items --- ---- --- }

                  <h1 className="site-title">Memenator Dashboard</h1> */}
        {/*<h1 className="site-title"><img src="../assets/images/boxes/buynow.png" alt="nav-buynow" /></h1> 
                </div>
                <ul className="nav-links" style={{ marginLeft: '50px' }}>

                  {/* Text Nav Items 
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Staking</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">AI Tools</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Memenator</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Rewards</Link>
                  </li> */}


        {/*  --- ---- --- Image Nav Bar  items  --- ---- --- */}

      </div>
      <ul className="dashboard-nav-links" style={{ marginLeft: '0px' }}>

        <li className="dashboard-nav-item">
          <Link to="/" className="dashboard-nav-link"><img src={navstacking} alt="nav-staking" className='nav-img' /></Link>
        </li>

        <li className="dashboard-nav-item">
          <Link to="/" className="dashboard-nav-link"><img src={memenator} alt="nav-memenator" className='nav-img' /></Link>
        </li>

        <li className="dashboard-nav-item">
          <Link to="/" className="dashboard-nav-link"><img src={navdap} alt="nav-sniper" className='nav-img' /></Link>
        </li>

        <li className="dashboard-nav-item">
          <Link to="/" className="dashboard-nav-link"><img src={immortal} alt="nav-immortalize" className='nav-img' /></Link>
        </li>

        <li className="dashboard-nav-item">
          <Link to="/" className="dashboard-nav-link"><img src={navboost} alt="nav-boost" className='nav-img' /></Link>
        </li>

        <li className="dashboard-nav-item">
          <Link to="/" className="dashboard-nav-link"><img src={mooner} alt="nav-mooners" className='nav-img' /></Link>
        </li>

        <li className="dashboard-nav-item">
          <Link to="/" className="dashboard-nav-link"><img src={nft} alt="nav-nft" className='nav-img' /></Link>
        </li>

        <li className="dashboard-nav-item">
          <Link to="/" className="dashboard-nav-link"><img src={burning} alt="nav-burning" className='nav-img' /></Link>
        </li>

        <li className="dashboard-nav-item">
          <Link to="/" className="dashboard-nav-link"><img src={charity} alt="nav-charity" className='nav-img' /></Link>
        </li>


        <li className="dashboard-nav-item" style={{ marginLeft: '60px' }}>
          <Link to="/" className="dashboard-nav-link green-circle">RPC (Triton)</Link>
        </li>

        <li className="dashboard-nav-item" style={{ marginLeft: '80px' }}>
          <Link to="/" className="dashboard-nav-link">Settings</Link>
        </li>

        <li className="dashboard-nav-item" style={{ marginLeft: '80px' }}>
          <Link to="/whitepaper.pdf" className="dashboard-nav-link"  target="_blank">Whitepaper</Link>
        </li>


        <li className="dashboard-nav-item" style={{ marginLeft: '80px' }}>
          <a href="mailto:memenator1000@gmail.com?subject=Feedback%20on%20Memenator&body=Dear%20Memenator%20Team,%0D%0A%0D%0AI%20would%20like%20to%20provide%20the%20following%20feedback%20on%20Memenator:" className="nav-link" 
          >
            Feedback
          </a>
        </li>


        <li className="dashboard-nav-item">
          <Link to="/" className="dashboard-nav-link" style={{ marginLeft: '80px' }}>R1000 V1</Link>
        </li>

      </ul>
      <div className="dashboard-social-icons" style={{ marginLeft: '-275px' }}>
        <a href="https://t.me/memenator" target="_blank" rel="noopener noreferrer"><img src={telegram} alt="TelegramIcon" /></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><img src={X} alt="TelegramIcon" /></a>
        <a href="https://x.com/MemenatoR1000" target="_blank" rel="noopener noreferrer"><img src={music} alt="TelegramIcon" /></a>
      </div>

    </nav>
  );
}

export default Dashnavbar;
