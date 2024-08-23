import logo from "../assets/logo/r1000logo.png";
import presaleImg from "../assets/navpics/nav-presale.png";
import memenatorImg from "../assets/navpics/nav-tokenomics.png";
import faqImg from "../assets/navpics/nav-faq.png";
import xButtonOnMobile from "../assets/boxes/xlogo.png"
import stakingMenu from "../assets/navpics/nav-staking.png";
import whitePaperImg from "../assets/navpics/nav-whitepaper.png";
import mobileLogo from "../assets/logo/mmtr-logo.jpg";
// import telegramIcon from "../assets/boxes/telegram.png";
import telegramIcon from "../assets/images/social.png";
// import twitterIcon from "../assets/boxes/twitter.png";
import twitterIcon from "../assets/images/social1_360.png";
import musicIcon from "../assets/images/music1_360.png";
import musicStopIcon from "../assets/images/music2_360.png";
import music from "../assets/music/music.mp3";
import muteIcon from "../assets/boxes/telegram.png";
import closeIcon from "../assets/boxes/xlogo.png"
import PHWallet from "./wallet";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import "../assets/index.css";
import { styled, css } from 'styled-components';
import whitePaperPDF from "../assets/whitepaper-unfinished.pdf";


function Header2({ handleScrollToFrequencyQuestion, handleScrollToPresale, handleScrollToTokenomics, handleScrollToDapp, handleScrollToRoadmap }) {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [musicStatus, setMusicStatus] = useState(false);
  const divRef = useRef(null);
  const divRef1 = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      audioRef.current.play();
      console.log("Audio is playing");
    } else {
      audioRef.current.pause();
      console.log("Audio is stopped");
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


  return (
    <>

      <Header className="fixed-header" >
        <div className="liquid"></div>
        <div className="header-wrap">
          <audio ref={audioRef} src={music} />
          <div className="left">
            <div
              previewlistener="true"
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src={logo}
                alt=""
                style={{width: '105px', borderRadius: '100%', position: 'absolute', top: '0'}}
              />
            </div>
          </div>
          <div className="center" style={{ marginTop: "10px" }}>
            <ul style={{ dispaly: 'flex', gap: '50px' }}>
              <li>
                <a href="#presale" onClick={() => { navigate("/"); handleScrollToPresale(); }}>
                  Presale
                </a>
              </li>
              <li>
                <a href="#dashboard" onClick={() => { navigate("/"); handleScrollToDapp(); }}>
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
          </div>
          <div className="right" style={{ marginTop: "10px" }}>
            <ul>
              <li>
                <a href="https://twitter.com" previewlistener="true">
                  <img src={twitterIcon} style={{ width: "50px", height: "40px" }} className="my-button"></img>
                </a>
              </li>
              <li>
                <a href="https://x.com/MemenatoR1000" previewlistener="true" className="my-button">
                  <img src={telegramIcon} style={{ width: "50px", height: "40px" }}></img>
                </a>
              </li>
              <li>
                <button id="muteButton">
                  {musicStatus ? <img src={musicStopIcon} style={{ width: "50px", height: "40px" }} onClick={handleMusicButton}></img> : <img src={musicIcon} style={{ width: "50px", height: "40px" }} onClick={handleMusicButton}></img>}

                </button>
              </li>
            </ul>
          </div>
          <div className="header-connect-button middle-button" style={{ height: "100%" }}>
            {/* <PHWallet /> */}
            <div className="connect-overlay-box" style={{ border: 'none' }} >
              <div className="bottom" >
                <div className="btn-wrapper">
                  <button className="" style={{ display: "flex", alignItems: "center", justifyContent: 'center', padding: '0' }}>
                    <PHWallet />
                    <div class="lava" style={{ border: "5px", borderColor: "white" }}>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="hamburger-mobile"
            style={{ zIndex: "3000", paddingRight: '20px' }}
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
        </div >

        <div className=" right-button">

        <div className="header-connect-button " style={{ height: "100%", width: 'fit-content' }}>
          {/* <PHWallet /> */}
          <div className="connect-overlay-box" style={{ border: 'none' }} >
            <div className="bottom" >
              <div className="btn-wrapper">
                <button className="" style={{ display: "flex", alignItems: "center", justifyContent: 'center', padding: '0' }}>
                  <PHWallet />
                  <div class="lava" style={{ border: "5px", borderColor: "white" }}>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
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

      </Header >
      <Overlay
        isMobileMenuOpen={isMobileMenuOpen}
        onClick={() => {
          setIsMobileMenuOpen(false);
          start();
        }}
      />
    </>
  );

}
const Header = styled.div`
  @media(max-width:768px){
  position: fixed;
  top: 0%;
  left: 0;
  width: 100%;
  z-index: 1000;
  }
  `;

//   const Menu = styled.div`
//   background: linear-gradient(rgb(131 63 63), transparent),
//     linear-gradient(to top left, rgb(47 144 120), transparent),
//     linear-gradient(to top right, rgb(94 94 160), transparent);
//   background-blend-mode: screen;
//   width: 100%;
//   height: 192px;
//   display: flex;
//   flex-wrap: wrap;
// `;

//   const Option = styled.div`
//   align-items: center;
//   border: 1px solid rgba(0, 0, 0, 0.25);
//   box-sizing: border-box;
//   cursor: pointer;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   -webkit-tap-highlight-color: transparent;
//   width: 50%;

// `;

//   const Roman = styled.div`
//   font-family: sans-serif;
//   font-size: 12px;
//   font-weight: 600;
// `;

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


const Maindiv = styled.div`
  // background-color: #333;
  color: white;
  padding: 10px 20px;

  // overflow:hidden;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 24px;
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

const Bar = styled.div`
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 4px 0;
  transition: all 0.3s;

  &.open:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.open:nth-child(2) {
    opacity: 0;
  }

  &.open:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;

const NavMenu = styled.nav`
  // display: ${(props) => (props.isMobileMenuOpen ? 'block' : 'none')};
  // display:'block';
  position: absolute;
  top: 100px;
  left: 36%;
  width: 100%;
  // background-color: #444;
  // padding: 20px 0;
  z-index: 1;

  @media (max-width: 768px) {
    position: absolute;
  top: 100px;
  left: 13%;
  width: 100%;
  // background-color: #444;
  // padding: 20px 0;
  z-index: 1;
  }
`;

// const Ul = styled.ul`
//   list-style: none;

//   top: 0px;
//   z-index:500;
// `;
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

const SocialDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SocialImg = styled.img`
  margin: 0 10px;
  width: 50px;
  height: 40px;
`;

const CustomSvg = styled.svg`
  stroke: #c62828;
  fill: #c62828;
  stroke-width: 0;
  height: 1.3em;
  width: 1.3em;
`;
export default Header2;