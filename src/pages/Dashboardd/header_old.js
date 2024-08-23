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
import PHWallet from "../../components/wallet";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import "../../assets/index.css";

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
  const handleMusicButton = ()=>{
    if (musicStatus) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusicStatus(!musicStatus);
  }
  // const togglePlay = () => {
    
  //   setMusicStatus(!musicStatus);
  // };
  // function Header({ handleScrollToPresale }) {
  //   const navigate = useNavigate();
  //   const divRef = useRef(null);
  //   const divRef1 = useRef(null);
  //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //   useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (
  //         divRef.current &&
  //         !divRef.current.contains(event.target) &&
  //         divRef1.current &&
  //         !divRef1.current.contains(event.target)
  //       ) {
  //         setIsMobileMenuOpen(false);
  //       }
  //     };
  
  //     document.addEventListener("mousedown", handleClickOutside);
  
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);
  //   const toggleSlideIn =()=>{
  //     const slideInDiv = document.getElementById('slide-in-div');
  //     slideInDiv.classList.toggle('active');
  // }

  return (
    <>
      <header className="fixed-header" >
        <div className="header-wrap">
          <audio ref={audioRef} src={music}/>
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
          <div className="center" style={{ marginTop: "10px" }}>
            <ul>
              <div
                className="my-button"
                previewlistener="true"
                onClick={() => {
                  navigate("/");
                  handleScrollToPresale();
                }}
              >
                <img src={presaleImg} style={{width:"160px"}}/>
                {/* <li>Presale</li> */}
              </div>
              <div
                className="my-button"
                previewlistener="true"
                onClick={() => {
                  navigate("/memenator");
                }}
              >
                <img src={memenatorImg} style={{width:"160px"}}/>
                {/* <li>MEMENATOR</li> */}
              </div>
              <div
                className="my-button"
                previewlistener="true"
                onClick={() => {
                  navigate("/");
                  handleScrollToFrequencyQuestion();
                }}
              >
                <img src={faqImg} style={{width:"160px"}}/>
                {/* <li>FAQ</li> */}
              </div>
              <div className="my-button" onClick={() => navigate("/")} previewlistener="true">
                <img src={stakingMenu} style={{width:"160px"}}/>
                {/* <li>AI Stacking</li> */}
              </div>
              <div className="my-button" onClick={() => navigate("/")} previewlistener="true">
                <img src={whitePaperImg} style={{width:"160px"}}/>
                {/* <li>WHITEPAPER</li> */}
              </div>
            </ul>
          </div>
          <div className="right" style={{ marginTop: "10px" }}>
            <ul>
              <li>
                <a href="https://twitter.com" previewlistener="true">
                  <img src={twitterIcon} style={{width:"50px", height:"40px"}} className="my-button"></img>
                </a>
              </li>
              <li>
                <a href="https://x.com/MemenatoR1000" previewlistener="true" className="my-button">
                  <img src={telegramIcon} style={{width:"50px", height:"40px"}}></img>
                </a>
              </li>
              <li>
                <button id="muteButton">
                  {musicStatus?<img src={musicIcon} style={{width:"50px", height:"40px"}} onClick={handleMusicButton}></img>:<img src={musicStopIcon} style={{width:"50px", height:"40px"}} onClick={handleMusicButton}></img>}
                  
                </button>
              </li>
            </ul>
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
                    stroke="currentColor"
                    fill="none"
                    stroke-width="0"
                    viewBox="0 0 15 15"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
                  </svg>
                )}
              </li>
            </ul>
          </div>
        </div>
      </header>
      
        <div
          id="slide-in-div"
          style={{
            position: "fixed",
            width: "100%",
            height: "700px",
            left: '100%',
            backgroundColor: "rgba(0,0,0,1)",
            zIndex: "1000",
            borderRadius: "5px",
            border: "1px, solid,rgba(255,255,255,0.4)",
            transform: isMobileMenuOpen ? 'translateX(-100%)' : '',
            transition: "transform .5s linear",
            top: '8%'
          }}
          className="mobile-show"
          ref={divRef}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "40px",
              alignItems:"center"
            }}
          >
            <img
              alt="mobileIMG"
              style={{ width: "70px", height: "70px", borderRadius: "40px" }}
              src={mobileLogo}
            />
            {/* kcg */}
            <img alt = "xButton" src={xButtonOnMobile} style={{width:"40px", height:"40px"}} onClick={async () => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}/>
          </div>
          <button
            className="mobile-menu"
            style={{
              width: "100%",
              borderRadius: "15px",
              marginTop: "15px",
              paddingBottom: "3px",
              display:"flex",
              justifyContent:"center"
            }}
            onClick={() => {
              navigate("/");
              setIsMobileMenuOpen(!isMobileMenuOpen);
              handleScrollToPresale();
            }}
          >
            <img alt="nav presale image" src={presaleImg} style={{height:"30px"}}/>
          </button>
          <button
            className="mobile-menu"
            style={{
              width: "100%",
              borderRadius: "15px",
              marginTop: "15px",
              paddingBottom: "3px",
              display:"flex",
              justifyContent:"center"
            }}
            onClick={() => {
              navigate("/memenator");
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            <img alt="nav presale image" src={memenatorImg} style={{height:"30px"}}/>
          </button>
          <button
            className="mobile-menu"
            style={{
              width: "100%",
              borderRadius: "15px",
              marginTop: "15px",
              paddingBottom: "3px",
              display:"flex",
              justifyContent:"center"
            }}
            onClick={() => {
              handleScrollToFrequencyQuestion();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            <img alt="nav presale image" src={faqImg} style={{height:"30px"}}/>
          </button>
          <button
            className="mobile-menu"
            style={{
              width: "100%",
              borderRadius: "15px",
              marginTop: "15px",
              paddingBottom: "3px",
              display:"flex",
              justifyContent:"center"
            }}
            onClick={() => {
              navigate("/");
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            <img alt="nav presale image" src={stakingMenu} style={{height:"30px"}}/>
          </button>
          <button
            className="mobile-menu"
            style={{
              width: "100%",
              borderRadius: "15px",
              marginTop: "15px",
              marginBottom: "15px",
              textAlign: "center",
              alignContent: "center",
              paddingBottom: "3px",
              display:"flex",
              justifyContent:"center"
            }}
            onClick={() => {
              navigate("/");
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
             <img alt="nav presale image" src={whitePaperImg} style={{height:"30px"}}/>
          </button>
        </div>
      
    </>
  );
}
export default Header;
