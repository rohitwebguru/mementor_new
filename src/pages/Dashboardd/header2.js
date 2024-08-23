import logo from "../../assets/logo/r1000logo.png";
import presaleImg from "../../assets/navpics/nav-presale.png";
import memenatorImg from "../../assets/navpics/nav-tokenomics.png";
import faqImg from "../../assets/navpics/nav-faq.png";
import xButtonOnMobile from "../../assets/boxes/xlogo.png"
import stakingMenu from "../../assets/navpics/nav-staking.png";
import whitePaperImg from "../../assets/navpics/nav-whitepaper.png";
import mobileLogo from "../../assets/logo/mmtr-logo.jpg";
// import telegramIcon from "../assets/boxes/telegram.png";
import telegramIcon from "../../assets/images/social.png";
// import twitterIcon from "../assets/boxes/twitter.png";
import twitterIcon from "../../assets/images/social1_360.png";
import musicIcon from "../../assets/images/music1_360.png";
import musicStopIcon from "../../assets/images/music2_360.png";
import music from "../../assets/music/music.mp3";
import muteIcon from "../../assets/boxes/telegram.png";
import closeIcon from "../../assets/boxes/xlogo.png"
import navstacking from '../../assets/navpics/nav-staking.png'
import navdap from '../../assets/navpics/nav-dapp.png'
import navboost from '../../assets/navpics/nav-boost.png'
import immortal from '../../assets/navpics/nav-immortalize.png'
import mooner from '../../assets/navpics/nav-mooners.png'
import nft from '../../assets/navpics/nav-nft.png'
import burning from '../../assets/navpics/nav-burning.png'
import charity from '../../assets/navpics/nav-charity.png'
import memenator from '../../assets/navpics/memenator.png'
import PHWallet from "../../components/wallet";
import { useNavigate, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import "./index.css";
import { styled } from 'styled-components';


function Header2({ handleScrollToFrequencyQuestion, handleScrollToPresale }) {
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



  return (
    <>

      <Header className="fixed-header" >
        <div className="d-flex header-wrap">
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
                style={{ width: "65px", borderRadius: "100%", zIndex: "4000" }}
              />
            </div>
          </div>

          <div style={{ height: "100%" }}>
            <PHWallet />
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
        </div>
        <SciFiUI>
          <Ul>
            <li className="mobile-menu"
              style={{
                top: '0px',
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
              }} onClick={() => { navigate("/slot"); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              <Img style={{ height: "30px" }} src={navstacking} alt="Pre-sale" />
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
              }} className="mobile-menu" onClick={() => { navigate('/coming-soon'); setIsMobileMenuOpen(!isMobileMenuOpen); }} >
              <Img style={{ height: "30px" }} src={memenator} alt="Tokenomics" />
            </li>
            <li
              style={{
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
              }} className="mobile-menu" onClick={() => { navigate("/coming-soon"); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              <Img style={{ height: "30px" }} src={navdap} alt="FAQ" />
            </li>
            <li
              style={{
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
              }} className="mobile-menu" onClick={() => { navigate("/coming-soon"); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              <Img style={{ height: "30px" }} src={immortal} alt="Staking" />
            </li>
            <li
              style={{
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
              }} className="mobile-menu" onClick={() => { navigate("/coming-soon"); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              <Img style={{ height: "30px" }} src={navboost} alt="Whitepaper" />
            </li>
            <li
              style={{
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
              }} className="mobile-menu" onClick={() => { navigate("/coming-soon"); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              <Img style={{ height: "30px" }} src={mooner} alt="Whitepaper" />
            </li>
            <li
              style={{
                top: '300px',
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
              }} className="mobile-menu" onClick={() => { navigate("/coming-soon"); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              <Img style={{ height: "30px" }} src={nft} alt="Whitepaper" />
            </li>
            <li
              style={{
                top: '350px',
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
              }} className="mobile-menu" onClick={() => { navigate("/coming-soon"); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              <Img style={{ height: "30px" }} src={burning} alt="Whitepaper" />
            </li>
            <li
              style={{
                top: '400px',
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
              }} className="mobile-menu" onClick={() => { navigate("/coming-soon"); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              <Img style={{ height: "30px" }} src={charity} alt="Whitepaper" />
            </li>
            <li
              style={{
                top: '450px',
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
              }} className="mobile-menu" onClick={() => { navigate("/coming-soon"); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              <Link to="/" style={{ margin: '0px' }} className="nav-link ">RPC (Triton)</Link>
            </li>
            <li
              style={{
                top: '500px',
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
              }} className="mobile-menu" onClick={() => { navigate("/coming-soon"); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              <Link to="/" style={{ margin: '0px' }} className="nav-link">Settings</Link>
            </li>
            <li
              style={{
                top: '550px',
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
              }} className="mobile-menu" onClick={() => { navigate("/coming-soon"); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              <Link to="/whitepaper.pdf" style={{ margin: '0px' }} className="nav-link" target="_blank">Whitepaper</Link>
            </li>
            <li
              style={{
                top: '600px',
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
              }} className="mobile-menu" onClick={() => { navigate("/"); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              <a href="mailto:memenator1000@gmail.com?subject=Feedback%20on%20Memenator&body=Dear%20Memenator%20Team,%0D%0A%0D%0AI%20would%20like%20to%20provide%20the%20following%20feedback%20on%20Memenator:" style={{ margin: '0px' }} className="nav-link">
                Feedback
              </a>
            </li>
            <li
              style={{
                top: '650px',
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
      </Header>
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

const Img = styled.img`
 hieght:21px;
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Ul = styled.ul`
  list-style: none;
     top: 0px; 
    z-index: 999;
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

const SocialImg = styled.img`
  margin: 0 10px;
  width: 50px;
  height: 40px;
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

const Li = styled.li`
  transform: skew(45deg) scaleY(-3);
  box-shadow: 0 3px 0 5px rgba(33, 33, 33, 1) inset;
  position: absolute;
  display: flex;
  align-items:center;
  justify-content:center;
  width: 200px;
  height: 50px;
  color: white !important;
  line-height: 50px;
  border: 1px solid #860709;
  // background: #860709;
  text-align: center;
  font-size: 1.6em;
  cursor: pointer;
  transition: all 300ms ease-in-out;

  &:hover {
    transform: scale(1.08);
    font-size: 1.8em;
    z-index: 99;
  }

  &:nth-child(1) {
    top: 0;
    // left: -500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-500%')};
    background: rgba(320, 0, 0, 0.3);
  }

  &:nth-child(2) {
    top: 50px;
    // left: 500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '500%')};;
    background: rgba(290, 20, 60, 0.3);
  }

  &:nth-child(3) {
    top: 100px;
    // left: -500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-500%')};;
    background: rgba(255, 34, 34, 0.3)
  }

  &:nth-child(4) {
    top: 150px;
    // left: 500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '500%')};;
    background: rgba(220, 42, 42, 0.3)
  }

  &:nth-child(5) {
    top: 200px;
    // left: -500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-500%')};;
    background: rgba(178, 42, 42, 0.3)
  }

  &:nth-child(6) {
    top: 250px;
    // left: 500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '500%')};;
    background: rgba(165, 42, 42, 0.3)
  }

  &:nth-child(7) {
    top: 300px;
    // left: -500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-500%')};;
  }

  &:nth-child(8) {
    top: 350px;
    // left: -500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-500%')};;
  }

  &:nth-child(9) {
    top: 400px;
    // left: -500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-500%')};;
  }

  &:nth-child(10) {
    top: 450px;
    // left: -500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-500%')};;
  }

  &:nth-child(11) {
    top: 500px;
    // left: -500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-500%')};;
  }

  &:nth-child(12) {
    top: 550px;
    // left: -500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-500%')};;
  }

  &:nth-child(13) {
    top: 600px;
    // left: -500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-500%')};;
  }

  &:nth-child(14) {
    top: 650px;
    // left: -500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-500%')};;
  }

  &:nth-child(15) {
    top: 700px;
    // left: -500%;
    left: ${(props) => (props.isMobileMenuOpen ? '0px' : '-500%')};;
  }

  // .scifiUI:hover & {
  //   left: 0;
  // }
`;

const SocialDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const CustomSvg = styled.svg`
  stroke: #c62828;
  fill: #c62828;
  stroke-width: 0;
  height: 1.3em;
  width: 1.3em;
`;

export default Header2;