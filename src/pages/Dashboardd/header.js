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
import "../../assets/index.css";
import { styled } from 'styled-components';

function Header({ handleScrollToFrequencyQuestion, handleScrollToPresale }) {
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


  const Header = styled.div`
  @media(max-width:768px){
  position: fixed;
  top: 0%;
  left: 0;
  width: 100%;
  z-index: 1000;
  }
  `;

  const Menu = styled.div`
  background: linear-gradient(rgb(131 63 63), transparent),
    linear-gradient(to top left, rgb(47 144 120), transparent),
    linear-gradient(to top right, rgb(94 94 160), transparent);
  background-blend-mode: screen;
  width: 100%;
  height: 192px;
  display: flex;
  flex-wrap: wrap;
`;

  const Option = styled.div`
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  width: 50%;

`;

  const Roman = styled.div`
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 600;
`;

  const Overlay = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  opacity: ${props => (props.isMobileMenuOpen ? 1 : 0)};
  visibility: ${props => (props.isMobileMenuOpen ? 'visible' : 'hidden')};
  transform: ${props => (props.isMobileMenuOpen ? 'translateX(0%)' : 'translateX(100%)')};
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
`;

  return (
    <>

      <Header className="d-sm-none d-block  fixed-header" >
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
                style={{ width: "65px", borderRadius: "100%", zIndex: "4000" }}
              />
            </div>
          </div>

          <div style={{ height: "100%" }}>
            <PHWallet />
          </div>

          <div
            className="hamburger-mobile"
            style={{ zIndex: "3000" }}
            ref={divRef1}
            onClick={async () => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >


            <ul>
              <li className="hamburger">
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
              </li>
            </ul>
          </div>
        </div>
      </Header>

      <div
        id="slide-in-div"
        style={{
          position: "fixed",
          width: "100%",
          height: isMobileMenuOpen ? '271px' : '271px',
          left: '0%',
          top: isMobileMenuOpen ? '-197px' : '-420px',
          // top: isMobileMenuOpen ? '244px' : '213px',
          zIndex: "1000",
          borderRadius: "5px",
          border: "1px, solid,rgba(255,255,255,0.4)",
          transform: isMobileMenuOpen ? 'translateY(100%)' : 'translateY(-100%)',
          transition: "transform .5s ease"
        }}
        className="mobile-show"
        ref={divRef}
      >

        <button
          className="mobile-menu"
          style={{
            width: "100%",
            display: "flex",
            background: '#d83a3a',
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/memenator");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <img alt="nav presale image" src={navstacking} style={{ height: "30px" }} />
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            background: '#c62828',
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            handleScrollToFrequencyQuestion();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <img alt="nav presale image" src={memenator} style={{ height: "30px" }} />
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            background: '#b71c1c',
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/coming-soon");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <img alt="nav presale image" src={navdap} style={{ height: "30px" }} />
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            textAlign: "center",
            background: '#a81d1d',
            alignContent: "center",
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/coming-soon");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <img alt="nav presale image" src={immortal} style={{ height: "30px" }} />
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            textAlign: "center",
            background: '#a81d1d',
            alignContent: "center",
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/coming-soon");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <img alt="nav presale image" src={navboost} style={{ height: "30px" }} />
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            textAlign: "center",
            background: '#a81d1d',
            alignContent: "center",
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/coming-soon");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <img alt="nav presale image" src={mooner} style={{ height: "30px" }} />
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            textAlign: "center",
            background: '#a81d1d',
            alignContent: "center",
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/coming-soon");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <img alt="nav presale image" src={nft} style={{ height: "30px" }} />
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            textAlign: "center",
            background: '#a81d1d',
            alignContent: "center",
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/coming-soon");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <img alt="nav presale image" src={burning} style={{ height: "30px" }} />
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            textAlign: "center",
            background: '#a81d1d',
            alignContent: "center",
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/coming-soon");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <img alt="nav presale image" src={charity} style={{ height: "30px" }} />
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            textAlign: "center",
            background: '#a81d1d',
            alignContent: "center",
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/coming-soon");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <Link to="/" style={{ margin: '0px' }} className="nav-link ">RPC (Triton)</Link>
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            textAlign: "center",
            background: '#a81d1d',
            alignContent: "center",
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/coming-soon");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <Link to="/" style={{ margin: '0px' }} className="nav-link">Settings</Link>
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            textAlign: "center",
            background: '#a81d1d',
            alignContent: "center",
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/coming-soon");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <Link to="/whitepaper.pdf" style={{ margin: '0px' }} className="nav-link" target="_blank">Whitepaper</Link>
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            textAlign: "center",
            background: '#a81d1d',
            alignContent: "center",
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <a href="mailto:memenator1000@gmail.com?subject=Feedback%20on%20Memenator&body=Dear%20Memenator%20Team,%0D%0A%0D%0AI%20would%20like%20to%20provide%20the%20following%20feedback%20on%20Memenator:" style={{ margin: '0px' }} className="nav-link"
          >
            Feedback
          </a>
        </button>
        <button
          className="mobile-menu"
          style={{
            width: "100%",
            textAlign: "center",
            background: '#a81d1d',
            alignContent: "center",
            display: "flex",
            justifyContent: "center"
          }}
          onClick={() => {
            navigate("/coming-soon");
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <Link to="/" style={{ margin: '0px' }} className="nav-link" >R1000 V1</Link>
        </button>




        <div className="d-flex justify-content-center right" style={{ background: '#961c1c' }}>
          <ul>
            <li>
              <a href="https://x.com/MemenatoR1000" previewlistener="true" className="my-button">
                <img src={telegramIcon} style={{ width: "71px", height: "60px" }}></img>
              </a>
            </li>
            <li>
              <a href="https://twitter.com" previewlistener="true">
                <img src={twitterIcon} style={{ width: "71px", height: "60px" }} className="my-button"></img>
              </a>
            </li>
            <li>
              <button id="muteButton">
                {musicStatus ? <img src={musicIcon} style={{ width: "71px", height: "60px" }} onClick={handleMusicButton}></img> : <img src={musicStopIcon} style={{ width: "71px", height: "60px" }} onClick={handleMusicButton}></img>}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Overlay isMobileMenuOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(false)} />
    </>

  );

}

export default Header;