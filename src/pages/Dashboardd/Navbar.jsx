import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/logo/r1000logo.png';
import navstacking from '../../assets/navpics/nav-staking.png'
import navdap from '../../assets/navpics/nav-dapp.png'
import navsniper from '../../assets/navpics/nav-r1000sniper.png'
import navboost from '../../assets/navpics/nav-boost.png'
import mainframe from '../../assets/navpics/mainframe.png'
import immortal from '../../assets/navpics/nav-immortalize.png'
import mooner from '../../assets/navpics/nav-mooners.png'
import nft from '../../assets/navpics/nav-nft.png'
import burning from '../../assets/navpics/nav-burning.png'
import charity from '../../assets/navpics/nav-charity.png'
import memenator from '../../assets/navpics/memenator.png'
import telegram from '../../assets/images/social.png'
import X from '../../assets/images/social1_360.png'
import musicIcon from "../../assets/images/music1_360.png";
import musicStopIcon from "../../assets/images/music2_360.png";
import music from "../../assets/music/music.mp3";
import whitepaper_pdf from '../../assets/whitepaper.pdf';
import connect from '../../assets/boxes/connect.png';
import PHwallet from '../../components/wallet';
import CustomCursor from '../../components/CustomCursor.js';
//  --- ---- ---  Social icons  --- ---- --- 
import { FaTwitter } from 'react-icons/fa';
import { FaTelegramPlane } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";

const Navbar = () => {

  const [musicStatus, setMusicStatus] = useState(false);
  const audioRef = useRef(null);
  const handleMusicButton = () => {
    if (musicStatus) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusicStatus(!musicStatus);
  }

  return (


    //  --- ---- --- Star of the Nav bar  --- ---- --- //



    <>

<CustomCursor/>

      <div className='top-box w-100'>
        <Link to={'/'} className="logo-container">
          <img src={logo} alt="Logo" className="logo" style={{ marginRight: '50px', width:'100px'  }} />
        </Link>
        <div class=" marquee-container m-0">
          <marquee  direction="left" scrollamount="3" behavior="loop" class="marquee">
           <span style={{fontSize:'28px'}}>R1000 Protocol Initiated</span> 
          </marquee>
        </div>

        <div >
          {/* <img src={connect} alt="nav-conect-wallet" style={{ width: '100%', objectFit:'contain' }} /> */}
          <div className="connect-overlay-box header-connect-button" style={{ border: 'none' }} >
              <div className="bottom" >
                <div className="btn-wrapper">
                  <button className="" style={{ display: "flex", alignItems: "center", justifyContent: 'center', padding: '0' }}>
                    <PHwallet />
                    <div class="lava" style={{ border: "5px", borderColor: "white" }}>
                    </div>
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
      <nav className="navbar">
        <audio ref={audioRef} src={music} />
        <ul className="nav-links d-flex flex-column align-items-center ">

          <li className="nav-item">
            <Link to="/dashboardd" className="nav-link"><img src={mainframe} alt="mainframe" className='nav-img' /></Link>
          </li>

          <li className="nav-item" style={{ marginLeft: '-66px' }}>
            <Link to="/coming-soon" className="nav-link"><img src={navstacking} alt="nav-staking" className='nav-img' /></Link>
          </li>

          <li className="nav-item">
            <Link to="/slot" style={{ marginRight: '23px' }} className="nav-link"><img src={memenator} alt="nav-memenator" className='nav-img' /></Link>
          </li>

          <li className="nav-item">
            <Link to="/coming-soon" className="nav-link"><img src={navsniper} alt="nav-sniper" className='nav-img' /></Link>
          </li>

          <li className="nav-item">
            <Link to="/coming-soon" className="nav-link"><img src={immortal} alt="nav-immortalize" className='nav-img' /></Link>
          </li>

          <li className="nav-item" style={{ marginLeft: '-38px' }}>
            <Link to="/coming-soon" className="nav-link"><img src={navboost} alt="nav-boost" className='nav-img' /></Link>
          </li>

          <li className="nav-item">
            <Link to="/coming-soon" className="nav-link"><img src={mooner} alt="nav-mooners" className='nav-img' /></Link>
          </li>

          <li className="nav-item">
            <Link to="/coming-soon" className="nav-link"><img src={nft} alt="nav-nft" className='nav-img' /></Link>
          </li>

          <li className="nav-item">
            <Link to="/coming-soon" className="nav-link"><img src={burning} alt="nav-burning" className='nav-img' /></Link>
          </li>

          <li className="nav-item">
            <Link to="/coming-soon" className="nav-link"><img src={charity} alt="nav-charity" className='nav-img' /></Link>
          </li>


          <li className="" style={{ borderTop: '1px solid white', width: '100%' }}>
            {/* <Link to="" style={{ marginLeft: '16px', borderTop:'1px solid white' }} className="nav-link "></Link> */}
          </li>
          <li className="nav-item"  >
            <Link to="/coming-soon" style={{ marginLeft: '16px' }} className="nav-link green-circle">RPC (Triton)</Link>
          </li>

          <li className="nav-item" >
            <Link to="/coming-soon" style={{ marginLeft: '16px' }} className="nav-link">Settings</Link>
          </li>

          <li className="nav-item">
            <a href={whitepaper_pdf} style={{ marginLeft: '16px' }} className="nav-link" target="_blank">Whitepaper</a>
          </li>


          <li className="nav-item">
            <a style={{ marginLeft: '16px' }} href="mailto:memenator1000@gmail.com?subject=Feedback%20on%20Memenator&body=Dear%20Memenator%20Team,%0D%0A%0D%0AI%20would%20like%20to%20provide%20the%20following%20feedback%20on%20Memenator:" className="nav-link"
            >
              Feedback
            </a>
          </li>


          <li className="nav-item mb-0" >
            <Link to="/coming-soon" style={{ marginLeft: '16px' }} className="nav-link" >R1000 V1</Link>
          </li>

        </ul>
        <div className="social-icons" >
          <a href="https://t.me/memenator" target="_blank" rel="noopener noreferrer"><img src={telegram} alt="TelegramIcon" /></a>
          <a href="https://x.com/MemenatoR1000" target="_blank" rel="noopener noreferrer"><img src={X} alt="TelegramIcon" /></a>
          <button id="muteButton">
            {musicStatus ? <img src={musicIcon} style={{ width: "50px", height: "40px" }} onClick={handleMusicButton}></img> : <img src={musicStopIcon} style={{ width: "50px", height: "40px" }} onClick={handleMusicButton}></img>}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
