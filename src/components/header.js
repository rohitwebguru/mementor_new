import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/navbars.css";

// Import images and music
import logo from "../assets/logo/r1000logo.png";
import presaleImg from "../assets/navpics/nav-presale.png";
import memenatorImg from "../assets/navpics/nav-tokenomics.png";
import faqImg from "../assets/navpics/nav-faq.png";
import stakingMenu from "../assets/navpics/nav-staking.png";
import whitePaperImg from "../assets/navpics/nav-whitepaper.png";
import mobileLogo from "../assets/logo/mmtr-logo.jpg";
import telegramIcon from "../assets/images/social.png";
import twitterIcon from "../assets/images/social1_360.png";
import musicIcon from "../assets/images/music1_360.png";
import musicStopIcon from "../assets/images/music2_360.png";
import music from "../assets/music/music.mp3";
import muteIcon from "../assets/boxes/telegram.png";
import walletIcon from "../assets/new_image/connect_362.png";
import closeIcon from "../assets/boxes/xlogo.png";
import PHWallet from "./wallet";
import Modal from "./modal.js";
import {styled} from 'styled-components';
import whitePaperPDF from "../assets/whitepaper-unfinished.pdf";

const Navbar = ({ handleScrollToFrequencyQuestion, handleScrollToPresale, handleScrollToTokenomics, handleScrollToDapp, handleScrollToRoadmap }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true); // Set to true to start playing by default
  const audioRef = useRef(new Audio(music));
  const [isModalOpen, setIsModalOpen] = useState(false);
 const [musicStatus, setMusicStatus] = useState(false);
  const divRef = useRef(null);
  const divRef1 = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        divRef.current &&
        !divRef.current.contains(event.target) &&
        divRef1.current &&
        !divRef1.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleMusicButton = () => {
    if (musicStatus) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusicStatus(!musicStatus);
  }



  const start = () => {
    let audio = new Audio("/futuristic.mp3");

    audio.play()
      .then(() => {
        console.log("Audio is playing");
        setTimeout(() => {
          audio.pause();
          console.log('Audio is paused');
        }, 2000);
      })
      .catch(error => {
        console.error("Error playing audio:", error);
      });
  }

  useEffect(() => {
    // Automatically play music when the component mounts
    if (isMusicPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        // Optionally handle the case where autoplay is blocked
      });
    }

    // Cleanup on unmount
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, [isMusicPlaying]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Nav className="navbar-main">
        {/* Liquid Background */}
        <div className="liquid"></div>

        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" />
        </div>



        {/* Menu Items */}
        <ul className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <li>
            <a href="#presale" onClick={() => { navigate("/"); handleScrollToPresale(); }}>
              Presale
            </a>
          </li>
          <li>
            <a href="./dashboard" onClick={() => { navigate("/"); handleScrollToDapp(); }}>
              R1000 DApp
            </a>
          </li>
          <li>
            <a href="#tokenomics" onClick={() => { navigate("/"); handleScrollToTokenomics(); }}>
              Tokenomics
            </a>
          </li>
          <li>
            <a href="#roadmap" onClick={() => { navigate("/"); handleScrollToRoadmap(); }}>
              Roadmap
            </a>
          </li>
          <li>
            <a href="#faq" onClick={() => { navigate("/"); handleScrollToFrequencyQuestion(); }}>
              FAQ
            </a>
          </li>
          <li>
            <a href={whitePaperPDF} target="_blank" rel="noopener noreferrer">Whitepaper</a>
          </li>
        </ul>
        <button className="connect-wallet-button" onClick={openModal}>
          <img src={walletIcon} alt="Wallet" />
        </button>
        <div className="right-items">
          {/* Social Icons */}
          <a href="https://t.me/memenator" target="_blank" rel="noopener noreferrer" className="social-link">
            <img src={telegramIcon} alt="Telegram" />
          </a>
          <a href={"https://x.com/MemenatoR1000"} target="_blank" rel="noopener noreferrer" className="social-link">
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <button onClick={toggleMusic}>
            <img src={isMusicPlaying ? musicIcon : musicStopIcon} alt="Music" />
          </button>
        </div>

        <div
            className="hamburger-mobile"
            style={{ zIndex: "3000", paddingRight:'20px' }}
            ref={divRef1}
            onClick={async () => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            <Hamburger
              onClick={async () => {
                await start();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="custom-svg"
                  stroke="#c62828"
                  fill="#c62828"
                  strokeWidth="0"
                  viewBox="0 0 15 15"
                  height="1.3em"
                  width="1.3em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="custom-svg"
                  stroke="#c62828"
                  fill="#c62828"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1.3em"
                  width="1.3em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
                </svg>
              )}
            </Hamburger>

          </div>
      <SciFiUI>
          <Ul isMobileMenuOpen={isMobileMenuOpen}>
            <li
              style={{
                top: '0',
                left: isMobileMenuOpen ? '0px' : '-500%',
                background: 'rgba(320, 0, 0, 0.3)',
                transform: isMobileMenuOpen ? 'skew(0)' : 'skew(45deg) scaleY(-3)',
                boxShadow: isMobileMenuOpen ? '0 0 25px #860709, 0 1px 5px rgba(60, 60, 60, 1)' : '0 3px 0 5px rgba(33, 33, 33, 1) inset',
                position: isMobileMenuOpen ? 'initial' : 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobileMenuOpen ? '300px' : '200px',
                height: '50px',
                color: isMobileMenuOpen ? 'rgba(255, 255, 255, 1)' : 'white',
                bordercolor: isMobileMenuOpen ? '#860709' : 'none',
                lineHeight: '50px',
                border: '1px solid #860709',
                textAlign: 'center',
                fontSize: '1.6em',
                cursor: 'pointer',
                transition: 'all 300ms ease-in-out'
              }}
              onClick={() => {
                navigate("/");
                handleScrollToPresale();
                setIsMobileMenuOpen(false);
              }}
            >
              <img style={{ height: '28px' }} src={presaleImg} alt="Pre-sale" />
            </li>
            <li
              style={{
                top: '50px',
                left: isMobileMenuOpen ? '0px' : '500%',
                background: 'rgba(320, 0, 0, 0.3)',
                transform: isMobileMenuOpen ? 'skew(0)' : 'skew(45deg) scaleY(-3)',
                boxShadow: isMobileMenuOpen ? '0 0 25px #860709, 0 1px 5px rgba(60, 60, 60, 1)' : '0 3px 0 5px rgba(33, 33, 33, 1) inset',
                position: isMobileMenuOpen ? 'initial' : 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobileMenuOpen ? '300px' : '200px',
                height: '50px',
                color: isMobileMenuOpen ? 'rgba(255, 255, 255, 1)' : 'white',
                bordercolor: isMobileMenuOpen ? '#860709' : 'none',
                lineHeight: '50px',
                border: '1px solid #860709',
                textAlign: 'center',
                fontSize: '1.6em',
                cursor: 'pointer',
                transition: 'all 300ms ease-in-out'
              }} onClick={() => { navigate("/memenator"); setIsMobileMenuOpen(false); }} >
              <Img src={memenatorImg} alt="Tokenomics" />
            </li>
            <li style={{
              top: '100px',
              left: isMobileMenuOpen ? '0px' : '-500%',
              background: 'rgba(320, 0, 0, 0.3)',
              transform: isMobileMenuOpen ? 'skew(0)' : 'skew(45deg) scaleY(-3)',
              boxShadow: isMobileMenuOpen ? '0 0 25px #860709, 0 1px 5px rgba(60, 60, 60, 1)' : '0 3px 0 5px rgba(33, 33, 33, 1) inset',
              position: isMobileMenuOpen ? 'initial' : 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isMobileMenuOpen ? '300px' : '200px',
              height: '50px',
              color: isMobileMenuOpen ? 'rgba(255, 255, 255, 1)' : 'white',
              bordercolor: isMobileMenuOpen ? '#860709' : 'none',
              lineHeight: '50px',
              border: '1px solid #860709',
              textAlign: 'center',
              fontSize: '1.6em',
              cursor: 'pointer',
              transition: 'all 300ms ease-in-out'
            }} onClick={() => { handleScrollToFrequencyQuestion(); setIsMobileMenuOpen(false); }}>
              <Img src={faqImg} alt="FAQ" />
            </li>
            <li style={{
              top: '150px',
              left: isMobileMenuOpen ? '0px' : '500%',
              background: 'rgba(320, 0, 0, 0.3)',
              transform: isMobileMenuOpen ? 'skew(0)' : 'skew(45deg) scaleY(-3)',
              boxShadow: isMobileMenuOpen ? '0 0 25px #860709, 0 1px 5px rgba(60, 60, 60, 1)' : '0 3px 0 5px rgba(33, 33, 33, 1) inset',
              position: isMobileMenuOpen ? 'initial' : 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isMobileMenuOpen ? '300px' : '200px',
              height: '50px',
              color: isMobileMenuOpen ? 'rgba(255, 255, 255, 1)' : 'white',
              bordercolor: isMobileMenuOpen ? '#860709' : 'none',
              lineHeight: '50px',
              border: '1px solid #860709',
              textAlign: 'center',
              fontSize: '1.6em',
              cursor: 'pointer',
              transition: 'all 300ms ease-in-out'
            }} onClick={() => { navigate("/"); setIsMobileMenuOpen(false); }}>
              <Img style={{ width: '150px' }} src={stakingMenu} alt="Staking" />
            </li>
            <li style={{
              top: '200px',
              left: isMobileMenuOpen ? '0px' : '-500%',
              background: 'rgba(320, 0, 0, 0.3)',
              transform: isMobileMenuOpen ? 'skew(0)' : 'skew(45deg) scaleY(-3)',
              boxShadow: isMobileMenuOpen ? '0 0 25px #860709, 0 1px 5px rgba(60, 60, 60, 1)' : '0 3px 0 5px rgba(33, 33, 33, 1) inset',
              position: isMobileMenuOpen ? 'initial' : 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isMobileMenuOpen ? '300px' : '200px',
              height: '50px',
              color: isMobileMenuOpen ? 'rgba(255, 255, 255, 1)' : 'white',
              bordercolor: isMobileMenuOpen ? '#860709' : 'none',
              lineHeight: '50px',
              border: '1px solid #860709',
              textAlign: 'center',
              fontSize: '1.6em',
              cursor: 'pointer',
              transition: 'all 300ms ease-in-out'
            }} onClick={() => { navigate("/"); setIsMobileMenuOpen(false); }}>
              <Img src={whitePaperImg} alt="Whitepaper" />
            </li>
            <li style={{
              top: '250px',
              left: isMobileMenuOpen ? '0px' : '500%',
              background: 'rgba(320, 0, 0, 0.3)',
              transform: isMobileMenuOpen ? 'skew(0)' : 'skew(45deg) scaleY(-3)',
              boxShadow: isMobileMenuOpen ? '0 0 25px #860709, 0 1px 5px rgba(60, 60, 60, 1)' : '0 3px 0 5px rgba(33, 33, 33, 1) inset',
              position: isMobileMenuOpen ? 'initial' : 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isMobileMenuOpen ? '300px' : '200px',
              height: '50px',
              color: isMobileMenuOpen ? 'rgba(255, 255, 255, 1)' : 'white',
              bordercolor: isMobileMenuOpen ? '#860709' : 'none',
              lineHeight: '50px',
              border: '1px solid #860709',
              textAlign: 'center',
              fontSize: '1.6em',
              cursor: 'pointer',
              transition: 'all 300ms ease-in-out'
            }} className="social-div">
              <a href="https://x.com/MemenatoR1000"> <SocialImg src={telegramIcon} className="my-button" alt="Telegram Icon" /></a>
              <a href="https://twitter.com"><SocialImg src={twitterIcon} className="my-button" alt="Twitter Icon" /></a>
              <button id="muteButton">
                {musicStatus ? <img src={musicIcon} style={{ width: "50px", height: "40px" }} onClick={handleMusicButton}></img> : <img src={musicStopIcon} style={{ width: "50px", height: "40px" }} onClick={handleMusicButton}></img>}
              </button>
            </li>
          </Ul>
        </SciFiUI>
      </Nav>
        <Overlay
        isMobileMenuOpen={isMobileMenuOpen}
        onClick={() => {
          setIsMobileMenuOpen(false);
          start();
        }}
      />
      {/* Wallet Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PHWallet />
      </Modal>
    </>

  );
};


const Nav = styled.div`
  @media(max-width:768px){
  position: fixed;
  top: 0%;
  left: 0;
  width: 100%;
  z-index: 1000;
  }
  `;

const Overlay = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 499;
  opacity: ${props => (props.isMobileMenuOpen ? 1 : 0)};
  visibility: ${props => (props.isMobileMenuOpen ? 'visible' : 'hidden')};
  transform: ${props => (props.isMobileMenuOpen ? 'translateX(0%)' : 'translateX(100%)')};
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  // position: absolute;
  //   top: -82px;
  //   left: 60%;

    // @media (max-width:768px){
    // left: 78%;
    // }
`;

const Ul = styled.ul`
  list-style: none;
     top: 0px; 
    z-index: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    left:0%;
    flex-direction: column;
`;

const SciFiUI = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  position:relative; 
`;

const Img = styled.img`
  width: 250px;
`;

const SocialImg = styled.img`
  margin: 0 10px;
  width: 50px;
  height: 40px;
`;

export default Navbar;
