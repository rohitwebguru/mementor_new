import "../assets/index.css";
import bgVideo from "../assets/images/NewTL2.mp4";
import bgImage from "../assets/images/bgImage.jpg";
import enterDappImg from "../assets/boxes/title-dapp.png";
import buyImg from "../assets/boxes/buynow.png";
import claimAmountImg from "../assets/new_image/claimableamount_360.png";
import claimImg from "../assets/new_image/claim_360.png";
import roadMapImg from "../assets/boxes/title-roadmap.png";
import navImg from "../assets/boxes/navs.png";
import presaleImg from "../assets/boxes/presale.png";
import faqImg from "../assets/boxes/title-faq.png";
import dapp from "../assets/images/dapp.mp4";
import roadMapBackground from '../assets/new_image/6boxbackground.png';
import presaleBackground from '../assets/new_image/df.png';
import faqVideo from "../assets/images/faq2-2.mp4";
import { useEffect, useState } from "react";
import Header2 from "../components/header2";
import { useRef } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";
import Countdown from "react-countdown";
import CountItem from "../components/countItem";
import { PRESALE_AUTHORITY, TOKEN_PUBKEY, PRESALE_HARDCAP, MAX_INVESTMENT, MIN_INVESTMENT, PRESALE_CA, PRESALE_PROGRAM_PUBKEY, ROUND_CAP } from "../constants";
import { toast } from "react-toastify";
import usePresale from "../contract/usePresale";
import copyIcon from "../assets/images/copy.svg";
import checkIcon from "../assets/images/check.svg"
import roadMap1 from "../assets/images/01.png";
import roadMap2 from "../assets/images/02.png";
import roadMap3 from "../assets/images/03.png";
import roadMap4 from "../assets/images/04.png";
import roadMap5 from "../assets/images/05.png";
import roadMap6 from "../assets/images/06.png";
import roadMap7 from "../assets/images/07.png";
import tokenomics from "../assets/new_image/tokenomics.png";
import Presalebackground from "../assets/new_image/presalebackground.png";
import Claimbackground from "../assets/new_image/claimbackground.png";
import Key from "../assets/new_image/key.png";
import PHWallet from "../components/walletBuy";
import CustomCursor from "../components/CustomCursor";
import TypewriterEffect from "../components/TypewriterEffect";
import Dapptypingeffect from "../components/dapptypingeffect";
import Footer from '../components/footer';



function Landing() {
  const { createPresale, depositToken, buyToken, updatePresale, startTime, endTime, tokenPrice, claimableAmount, solAmount, claimToken, vaultAddress, withdrawSol, updateAuth, withdrawToken } = usePresale()
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const frequencyQuestionRef = useRef(null);
  const sectionRef = useRef(null);
  const answerRef = useRef(null);
  const PresaleRef = useRef(null);
  const ClaimRef = useRef(null);
  const DappRef = useRef(null);
  const roadmapRef = useRef(null);
  const tokenomicsRef = useRef(null);
  const faqRef = useRef(null);
  const videoRef = useRef(null);
  const [faq, setFaq] = useState(0);
  const { publicKey, wallet, connected } = useWallet();
  const LAMPORTS_PER_SOL = 10 ** 9;
  const [buySolAmount, setBuySolAmount] = useState(0);
  const [buyTokenAmount, setBuyTokenAmount] = useState(0);
  const [text, setText] = useState(PRESALE_CA);
  const [buttonText, setButtonText] = useState(copyIcon);
  const targetUrl = `https://explorer.solana.com/address/${PRESALE_PROGRAM_PUBKEY.toBase58()}?cluster=devnet`;
  const walletButtonRef = useRef(null);
  const getBalance = useCallback(async () => {
    if (publicKey && connection) {
      try {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
      } catch (e) {
        setBalance(0);
        console.log(e);
      }
    }
  }, [publicKey]);
  const handleOtherButtonClick = () => {
    console.log('Other button clicked');
    if (walletButtonRef.current) {
      walletButtonRef.current.click();
    }
  };
  const handleWalletButtonClick = () => {
    console.log('Button clicked');
    const targetElement = document.getElementById('targetElement');
    if (targetElement) {
      targetElement.click();
    }
  };

  const clickFaq = (num) => {
    setFaq(faq === num ? 0 : num);
  };
  const handleAddressClick = () => {
    // Redirect to the target URL
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };
  const handleScrollToFrequencyQuestion = () => {
    if (frequencyQuestionRef.current) {
      frequencyQuestionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleScrollToPresale = () => {
    if (PresaleRef.current) {
      PresaleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToDapp = () => {
    const element = document.getElementById("dapp-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToRoadmap = () => {
    if (roadmapRef.current) {
      roadmapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTokenomics = () => {
    if (tokenomicsRef.current) {
      tokenomicsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  const handleChanageBuySolAmount = (e) => {
    if (!e.target.value) {
      setBuySolAmount("");
      setBuyTokenAmount("");
      return;
    }
    setBuySolAmount(Number(e.target.value));
    setBuyTokenAmount(Number(e.target.value) / tokenPrice);
  }
  const handleChangeBuyTokenAmount = (e) => {
    if (!e.target.value) {
      setBuySolAmount("");
      setBuyTokenAmount("");
      return;
    }
    setBuyTokenAmount(e.target.value);
    setBuySolAmount(Number(e.target.value) * tokenPrice);
  }

  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "flex-row",
          justifyContent: "justify-between",
          marginTop: "1rem",
        }}
      >


        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.4)",
            borderRadius: "300px",
            padding: "20px",
            display: "block",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <CountItem
              title="DAYS"
              value={`${days >= 10 ? days.toString() : "0" + days.toString()}`}
            ></CountItem>
            <div
              style={{
                display: "flex",
                flexDirection: "flex-col",
                alignItems: "flex-start",
                fontSize: "32px",
                fontWeight: "normal",
                lineHeight: "55px",
              }}
            >

              :
            </div>
            <CountItem
              title="HRS"
              value={`${hours >= 10 ? hours.toString() : "0" + hours.toString()
                }`}
            ></CountItem>
            <div
              style={{
                display: "flex",
                flexDirection: "flex-row",
                alignItems: "flex-start",
                fontSize: "32px",
                fontWeight: "normal",
                lineHeight: "55px",
              }}
            >
              :
            </div>
            <CountItem
              title="MIN"
              value={`${minutes >= 10 ? minutes.toString() : "0" + minutes.toString()
                }`}
            ></CountItem>
            <div
              style={{
                display: "flex",
                flexDirection: "flex-row",
                alignItems: "flex-start",
                fontSize: "32px",
                fontWeight: "normal",
                lineHeight: "55px",
              }}
            >
              :
            </div>
            <CountItem
              title="SEC"
              value={`${seconds >= 10 ? seconds.toString() : "0" + seconds.toString()
                }`}
            ></CountItem>
          </div>
          {/* <div style={{display:"flex", justifyContent:"space-between"}}>
              <div>
              <p>Start Time:</p>
              <p>Feb 10, 2024, 9:00:00 PM</p>
              </div>
              <div>
              <p>End Time:</p>
              <p>Feb 15, 2024, 9:00:00 PM</p>
              </div>
            
          </div> */}
        </div>
      </div>
    );
    // }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setButtonText(checkIcon);
      setTimeout(() => setButtonText(copyIcon), 1000); // Reset button text after 2 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  useEffect(() => {
    getBalance();
  }, [getBalance]);
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF',
    '#33FFF2', '#F2FF33', '#FF3380', '#33FF8A', '#FF8A33'
  ];

  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    // Function to change the text color
    const changeTextColor = () => {
      setColorIndex(prevIndex => (prevIndex + 1) % colors.length);
    };

    // Set interval to change color every second
    const intervalId = setInterval(changeTextColor, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const ClaimElement = ClaimRef.current;
    const DappElement = DappRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInViewport(true);
          document.documentElement.style.scrollSnapType = 'y mandatory';
        } else {
          setInViewport(false);
          document.documentElement.style.scrollSnapType = 'none';
        }
      });
    }, {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: 0.1 // Adjust as needed
    });

    // Start observing the section elements
    if (sectionElement) observer.observe(sectionElement);
    if (ClaimElement) observer.observe(ClaimElement);
    if (DappElement) observer.observe(DappElement);

    // Cleanup observer on component unmount
    return () => {
      if (sectionElement) observer.unobserve(sectionElement);
      if (ClaimElement) observer.unobserve(ClaimElement);
      if (DappElement) observer.unobserve(DappElement);
      // Reset the scroll-snap-type when component unmounts
      document.documentElement.style.scrollSnapType = 'none';
    };
  }, []);

  useEffect(() => {
    const faqElement = faqRef.current;
    const videoElement = videoRef.current;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInViewport(true);
            videoElement.style.position = 'fixed';
            videoElement.style.top = '0';
            videoElement.style.left = '0';
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.objectFit = 'cover';
            videoElement.style.zIndex = '-1';
            videoElement.style.overflow = 'hidden';
          } else {
            setInViewport(false);
            videoElement.style.position = 'absolute';
            videoElement.style.top = '0';
            videoElement.style.left = '0';
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.objectFit = 'cover';
            videoElement.style.zIndex = '-1';
            videoElement.style.overflow = 'hidden';
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (faqElement) {
      intersectionObserver.observe(faqElement);
    }

    return () => {
      if (faqElement) {
        intersectionObserver.unobserve(faqElement);
      }
    };
  }, []);


  return (
    <>

      {/* containerStyle */}

      <div className="home" >
        <CustomCursor />
        <div className="home-wrap">

          {/* Section 1 --- */}
          <section ref={sectionRef}>
            <Header2
              handleScrollToFrequencyQuestion={handleScrollToFrequencyQuestion}
              handleScrollToPresale={handleScrollToPresale}
              handleScrollToDapp={handleScrollToDapp}
              handleScrollToRoadmap={handleScrollToRoadmap}
              handleScrollToTokenomics={handleScrollToTokenomics}
            />

            <div className="home-sec-1 mt-5">
              <video src={bgVideo} autoPlay loop muted></video>
            </div>
          </section>


          {/* Section 2 --- */}
          <section ref={PresaleRef}
            style={{
              backgroundImage: `url(${Presalebackground})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height: '100vh',

            }}>

            <div style={{ height: "50px", marginBottom: '0px' }} ref={PresaleRef}></div>
            {publicKey?.toBase58() === PRESALE_AUTHORITY.toBase58() ?
              <div style={{ width: "100%", display: "flex" }}>
                <button className="admin-button" onClick={() => { createPresale() }} >Create Presale</button>
                <button className="admin-button" onClick={() => { depositToken(TOKEN_PUBKEY, 100000) }}>Deposite Token</button>
                <button className="admin-button" onClick={() => { withdrawSol() }}>Withdraw Sol</button>
                <button className="admin-button" onClick={() => { withdrawToken() }}>Withdraw Token</button>
              </div>
              : <></>}
            {/* <div>
            <p
              className="presale-rules"
            >
              Presale Rules:
            </p>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

              <p className="presale-rules-content">
                First come, first served! No locks on presale! No vesting, no cliff. You will have 100% of your $ MEMENATOR on TGE
              </p>

            </div>
          </div> */}
            <div
              className="body-wrap-dashboard presale-main"
              style={{ display: "flex", alignItems: "center", marginBottom: "0px" }}
            >

              <div className="dashboard-up" >
                <div>
                  <h1 className="presale-header" style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}> <img src={presaleImg} className="presale-img" style={{ alignContent: "center", width: "35%" }}></img></h1>
                </div>
                <div className="dashboard-container-center" style={{ display: "flex", justifyContent: "center" }}>



                  <div className="child-wrap-dashboard">
                    <div style={{ marginBottom: "30px" }}>



                      {/* <div className="gradient-border">
                            asdfasfdasdfasd
                    </div> */}
                      <p style={{
                        color: colors[colorIndex],
                        fontFamily: "termin-font",
                        textAlign: "center",
                        marginTop: "20px",
                        fontSize: "25px"
                      }}>{Date.now() < startTime * 1000 && "Presale will start in"}
                        {Date.now() >= startTime * 1000 &&
                          Date.now() < endTime * 1000 &&
                          "Presale will end in"}
                        {Date.now() > endTime * 1000 && endTime !== 0 && "Presale Completed!"}
                        {endTime === 0 && ""}
                      </p>
                      <div>
                        {Date.now() < endTime * 1000 ? <Countdown date={endTime * 1000} renderer={renderer} /> : <></>}
                      </div>
                      <div style={{ width: "100%", padding: "10px", borderRadius: "10px", marginTop: "10px" }}>
                        <p style={{ textAlign: "center", fontFamily: "Technology-Bold", fontSize: '17px' }}>Presale Contract</p>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", backgroundColor: "rgba(65,7,7, 0.4)", padding: "3px", borderRadius: "30px", marginTop: "10px" }}>
                          <p style={{ width: "100%", textAlign: "center", color: "darkRed", fontSize: "18px", wordBreak: "break-all", fontFamily: "Technology-Bold", cursor: "pointer", textDecoration: "underline" }} className="presale-ca" onClick={handleAddressClick}>{PRESALE_PROGRAM_PUBKEY.toBase58()}</p>
                          {/* <button style={{ width: "30px", background:"linear-gradient(to right, #590000, #040000)", color: "white", padding: "5px", borderRadius: "30px", fontFamily:"termin-font"}} onClick={() => { handleCopy() }}> */}
                          {/* <img src={buttonText} style={{width:"30px", marginRight:"20px", cursor:"pointer"}} onClick={() => { handleCopy() }} /> */}
                          {/* </button> */}
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "30px", gap: "30px" }}>
                        {solAmount < ROUND_CAP ? <div style={{ marginLeft: "5px", marginRight: " 5px" }}>
                          <button className="gradient-border-circle" style={{ textWrap: "wrap" }}>Round 1</button>
                          <p style={{ textAlign: "center", fontFamily: "Technology-Bold" }}>{ROUND_CAP} S0L</p>
                        </div> :
                          <div style={{ display: "grid", alignItems: "center", marginLeft: " 5px", marginRight: " 5px" }}>
                            <button className="gradient-border-circle" style={{ color: "red" }}>Round 1</button>
                            <p style={{ textAlign: "center", fontFamily: "Technology-Bold" }}>{ROUND_CAP} S0L</p>
                          </div>
                        }
                        {solAmount < ROUND_CAP * 2 ? <div style={{ marginLeft: "5px", marginRight: " 5px" }}>
                          <button className="gradient-border-circle" style={{ textWrap: "wrap" }}>Round 2</button>
                          <p style={{ textAlign: "center", fontFamily: "Technology-Bold" }}>{ROUND_CAP} S0L</p>
                        </div> :
                          <div style={{ display: "grid", alignItems: "center", marginLeft: " 5px", marginRight: " 5px" }}>
                            <button className="gradient-border-circle" style={{ color: "red" }}>Round 2</button>
                            <p style={{ textAlign: "center", fontFamily: "Technology-Bold" }}>{ROUND_CAP} S0L</p>
                          </div>
                        }
                        {solAmount < ROUND_CAP * 3 ? <div style={{ marginLeft: "5px", marginRight: " 5px" }}>
                          <button className="gradient-border-circle" style={{ textWrap: "wrap" }}>Round 3</button>
                          <p style={{ textAlign: "center", fontFamily: "Technology-Bold" }}>{ROUND_CAP} S0L</p>
                        </div> :
                          <div style={{ display: "grid", alignItems: "center", marginLeft: " 5px", marginRight: " 5px" }}>
                            <button className="gradient-border-circle" style={{ color: "red" }}>Round 3</button>
                            <p style={{ textAlign: "center", fontFamily: "Technology-Bold" }}>{ROUND_CAP} S0L</p>
                          </div>
                        }
                        {solAmount < ROUND_CAP * 4 ? <div style={{ marginLeft: "5px", marginRight: " 5px" }}>
                          <button className="gradient-border-circle" style={{ textWrap: "wrap" }}>Round 4</button>
                          <p style={{ textAlign: "center", fontFamily: "Technology-Bold" }}>{ROUND_CAP} S0L</p>
                        </div> :
                          <div style={{ display: "grid", alignItems: "center", marginLeft: " 5px", marginRight: " 5px" }}>
                            <button className="gradient-border-circle" style={{ color: "red" }}>Round 4</button>
                            <p style={{ textAlign: "center", fontFamily: "Technology-Bold" }}>{ROUND_CAP} S0L</p>
                          </div>
                        }
                        {solAmount < ROUND_CAP * 5 ? <div style={{ marginLeft: "5px", marginRight: " 5px" }}>
                          <button className="gradient-border-circle" style={{ textWrap: "wrap" }}>Round 5</button>
                          <p style={{ textAlign: "center", fontFamily: "Technology-Bold" }}>{ROUND_CAP} S0L</p>
                        </div> :
                          <div style={{ display: "grid", alignItems: "center", marginLeft: " 5px", marginRight: " 5px" }}>
                            <button className="gradient-border-circle" style={{ color: "red" }}>Round 5</button>
                            <p style={{ textAlign: "center", fontFamily: "Technology-Bold" }}>{ROUND_CAP} S0L</p>
                          </div>
                        }
                        {/* {solAmount < ROUND_CAP * 6 ? <div style={{ marginLeft: "5px", marginRight: " 5px" }}>
                        <button className="gradient-border-circle" style={{ textWrap: "wrap" }}>Round 6</button>
                        <p style={{ textAlign: "center", fontFamily: "Minecraft" }}>{ROUND_CAP} S0L</p>
                      </div> :
                        <div style={{ display: "grid", alignItems: "center", marginLeft: " 5px", marginRight: " 5px" }}>
                          <button className="gradient-border-circle" style={{ color: "red" }}>Round 6</button>
                          <p style={{ textAlign: "center", fontFamily: "Minecraft" }}>{ROUND_CAP} S0L</p>
                        </div>
                      }
                      {solAmount < ROUND_CAP * 7 ? <div style={{ marginLeft: "5px", marginRight: " 5px" }}>
                        <button className="gradient-border-circle" style={{ textWrap: "wrap" }}>Round 7</button>
                        <p style={{ textAlign: "center", fontFamily: "Minecraft" }}>{ROUND_CAP} S0L</p>
                      </div> :
                        <div style={{ display: "grid", alignItems: "center", marginLeft: " 5px", marginRight: " 5px" }}>
                          <button className="gradient-border-circle" style={{ color: "red" }}>Round 7</button>
                          <p style={{ textAlign: "center", fontFamily: "Minecraft" }}>{ROUND_CAP} S0L</p>
                        </div>
                      } */}



                      </div>
                      <p className="sol-amount">{solAmount ? solAmount.toFixed(3) : 0} / {PRESALE_HARDCAP > 0 ? PRESALE_HARDCAP : 0} SOL Raised </p>
                      <progress value={solAmount * 100 / PRESALE_HARDCAP} max={100} style={{ borderRadius: "20px", width: "100%", marginTop: "10px", border: "1px, solid, #410707", backgroundColor: "rgba(0,0,0,0.4)" }} className="styled-progress" />

                    </div>

                    <div className="input-group-token">
                      <div style={{ width: "100%", margin: "10px" }}>
                        <input
                          type="number"
                          style={{
                            width: "100%",
                            borderRadius: "20px",
                            height: "40px",
                            paddingLeft: "10px",
                            marginBottom: "5px"
                          }}
                          className="input-with-icon_sol"
                          value={buySolAmount}
                          onChange={handleChanageBuySolAmount}
                        />

                        <p style={{ width: "100%", textAlign: "center", fontFamily: "Technology-Bold" }}>Pay with SOL</p>

                      </div>
                      <div style={{ width: "100%", margin: "10px" }}>
                        <input
                          type="number"
                          style={{
                            width: "100%",
                            borderRadius: "20px",
                            height: "40px",
                            paddingLeft: "10px",
                            marginBottom: "5px"
                          }}
                          className="input-with-icon"
                          value={buyTokenAmount}
                          onChange={handleChangeBuyTokenAmount}
                        />
                        <p style={{ width: "100%", textAlign: "center", fontFamily: "Technology-Bold" }}>Receive $ Memenator</p>
                      </div>

                    </div>

                    {/* <div
                    style={{
                      width: "100%",
                      height: "0",
                      borderWidth: "0.5px",
                      borderColor: "#587267",
                      marginTop: "1rem",
                    }}
                  /> */}
                    <div style={{ display: "flex", marginTop: "30px" }}>
                      <p style={{ width: "100%", textAlign: "center", fontFamily: "Technology-Bold" }}>
                        1 memenator = {tokenPrice} SOL
                      </p>
                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                      <div className="connect-overlay-box" >
                        <div className="bottom" >
                          <div className="btn-wrapper">
                            <button className="" style={{ width: '400px', display: "flex", alignItems: "center", justifyContent: 'center', padding: '0' }}>
                              <PHWallet onClick={() => {
                                if (buySolAmount && buyTokenAmount) { buyToken(buySolAmount, buyTokenAmount) } else {
                                  toast.error("Please enter sol amount to buy!");
                                }
                              }} />
                              <div class="lava" style={{ border: "5px", borderColor: "white" }}>
                              </div>
                            </button>
                            {/* <button style={{ fontFamily: "termin-font", marginBottom: "10px", }}>
                                  <img src={enterDappImg} style={{ width: "145px", height: "20px", marginTop: "6px", alignContent: "center", border: "white" }}></img>
                              </button> */}

                          </div>
                        </div>
                      </div>
                      {/* <button className="buy-now" style={{ display: "grid", placeItems: "center" }}>
                        {connected ? <img src={buyImg} className="buy-token-image" onClick={() => {
                          if (buySolAmount && buyTokenAmount) { buyToken(buySolAmount, buyTokenAmount) } else {
                            toast.error("Please enter sol amount to buy!");
                          }
                        }}></img> : <PHWallet />}
                      </button> */}
                    </div>
                    <div className="sol-amount-wallet-label-div">
                      <h2
                        className="sol-amount-wallet-label" style={{ fontFamily: "Technology-Bold" }}
                      >
                        SOL amount in your wallet:
                      </h2>
                      <div className="sol-amount-wallet">
                        {balance.toFixed(3)} SOL
                      </div>
                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px" }}>
                      <p style={{ width: "fit-content", textAlign: "center", fontSize: "15px", fontFamily: "Technology-Bold" }}>Maximum Investment {MIN_INVESTMENT} SOL - Minimum Investment {MAX_INVESTMENT} SOL </p>
                    </div>
                    {/* <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <span>
                      Already $124,000 raised from the sale of 25,000,000 MMTR
                      tokens in the PRIVATE SALE
                    </span>
                  </div> */}
                    {/* <div className="top-shader"></div>
                  <div className="left-shader"></div>
                  <div className="bottom-shader"></div>
                  <div className="right-shader"></div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* Section 3 ---  Presale Rules*/}
          <section ref={ClaimRef} className="presale-full-sec full-height-section justify-content-center"
            style={{
              backgroundImage: `url(${Claimbackground})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height: '100vh'
            }}
          >
            <div>

              <p
                className="presale-rules"
              >
                Presale Rules:
              </p>
              <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: '5px' }}>

                <p className="presale-rules-content">
                  First come, first served! No locks on presale! No vesting, no cliff. You will have 100% of your $ MEMENATOR on TGE
                </p>

              </div>
            </div>
            <div className="home-sec-2">
              <div className="home-sec-2-wrap">
                <div className="presale">
                  <div className="presale-container-style">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 ">
                          <div className="right claim">
                            <div className="presale-container">
                              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <p className="claimable-amount" style={{ alignContent: "center", display: "flex", placeContent: "center" }}><img src={claimAmountImg} className="claimable-button" ></img></p>
                              </div>
                              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <div className="clain-amount-token">
                                  {claimableAmount.toFixed(2)}
                                  <div style={{ fontSize: "15px", placeContent: "center", fontFamily: "Minecraft" }}>&nbsp;memenator</div>
                                </div>
                              </div>




                              <div
                                className="button"
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  padding: "0px",
                                  border: "none",
                                  backgroundColor: "transparent",
                                }}
                              >
                                <div className="wallet-adapter-dropdown" style={{ marginTop: "20px", width: "100%", backgroundColor: "transparent", justifyContent: "center" }}>
                                  <button
                                    className="claim-btn my-button"
                                    tabIndex="0"
                                    type="button"
                                    style={{
                                      pointerEvents: "auto",
                                    }}
                                    onClick={() => {
                                      claimToken()
                                    }}
                                  >
                                    <img src={claimImg} className="claimable-button"></img>
                                  </button>

                                </div>
                              </div>

                              <div className="top-shader"></div>
                              <div className="left-shader"></div>
                              <div className="bottom-shader"></div>
                              <div className="right-shader"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-box">
                  <table>
                    <thead>
                      <tr>
                        <th style={{ borderTopLeftRadius: '20px' }}>Month</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th style={{ borderTopRightRadius: '20px' }}>10</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Presale</td>
                        <td style={{ display: 'ruby-text' }}><span className="m-0 p-0 w-0">15%</span> <img src={Key} alt="Unlock" class="icon"></img></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>

                      </tr>
                      <tr>
                        <td>Development</td>
                        <td style={{ display: 'ruby-text' }}>5% <img src={Key} alt="Unlock" class="icon" /></td>
                        <td ><div style={{ display: 'ruby-text' }}>5% <img src={Key} alt="Unlock" class="icon" /></div> </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Marketing</td>
                        <td><div style={{ display: 'ruby-text' }}>5% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td><div style={{ display: 'ruby-text' }}>5% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td><div style={{ display: 'ruby-text' }}>5% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Airdrops & Prizes</td>
                        <td><div style={{ display: 'ruby-text' }}>10% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td><div style={{ display: 'ruby-text' }}>10% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td><div style={{ display: 'ruby-text' }}>10% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td><div style={{ display: 'ruby-text' }}>10% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td><div style={{ display: 'ruby-text' }}>10% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td><div style={{ display: 'ruby-text' }}>10% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td><div style={{ display: 'ruby-text' }}>10% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td><div style={{ display: 'ruby-text' }}>10% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td><div style={{ display: 'ruby-text' }}>10% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td>10% </td>
                      </tr>
                      <tr>
                        <td>CEX</td>
                        <td><div style={{ display: 'ruby-text' }}>0% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td><div style={{ display: 'ruby-text' }}>5% <img src={Key} alt="Unlock" class="icon" /></div></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td style={{ borderBottomLeftRadius: '20px' }}>Staking</td>
                        <td><div style={{ display: 'ruby-text' }}>15% <img src={Key} alt="Unlock" class="icon" /></div> </td>
                        <td> </td>
                        <td></td>
                        <td> </td>
                        <td></td>
                        <td> </td>
                        <td></td>
                        <td> </td>
                        <td></td>
                        <td style={{ borderBottomRightRadius: '20px' }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </section>

          {/* Section 4 ---  Enter DApp*/}
          <section ref={DappRef} id="dapp-section">
            <div className="home-sec-3">
              <video src={dapp} autoPlay loop muted></video>
                 <Dapptypingeffect />
              {/* <div class="latent-word">
                <div class="scroll">
                 <p>Cheeseburger roquefort paneer. Macaroni cheese who moved my cheese mascarpone stinking bishop st. agur blue cheese dolcelatte mascarpone airedale. Cheese slices babybel jarlsberg blue castello babybel pepper jack melted cheese melted cheese. Edam hard cheese gouda bocconcini fromage bavarian bergkase taleggio ricotta. Stinking bishop fromage frais cheesy feet fromage frais chalk and cheese halloumi pepper jack jarlsberg. Pepper jack cheese on toast halloumi camembert de normandie blue castello bocconcini brie pepper jack. Hard cheese.</p> 
                </div>
              </div> */}
              {/* <div style={{ fontFamily: 'termin-font', textAlign: 'start', fontSize: '12px', padding: '0 10px' }}>
                <Dapptypingeffect />
              </div> */}
              <div className="overlay-box" >
                <div className="bottom" >
                  <div className="btn-wrapper">
                    <a href='/Dashboardd'>
                      <button style={{ fontFamily: "termin-font", marginBottom: "10px", }}>
                        <img src={enterDappImg} style={{ width: "145px", height: "20px", marginTop: "6px", alignContent: "center", border: "white" }}></img>
                        <div class="lava" style={{ border: "5px", borderColor: "white" }}></div></button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* Section 5 ---  Enter Tokenomics*/}
          <section ref={tokenomicsRef}>
            <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center" }}>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h1 className="roadmap-header">
                  <img src={navImg} className="roadmap-img" style={{ display: "block", margin: "auto" }} />
                </h1>
                <img className="roadmap-img" alt=" " src={tokenomics} style={{ width: "63%" }} />
                {/* <div>
                </div>
                <div>
                </div> */}
              </div>

            </div>
          </section>


          {/* Section 6 ---  Roadmap*/}
          <div className="home-sec-4">
            <div className="home-sec-4-wrap">
              <section
                ref={roadmapRef}
                className="section"
                style={{
                  backgroundImage: `url(${roadMapBackground})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'repeat',
                  backgroundPosition: 'bottom',
                }}
              >
                {/* Content here */}
                <div className="container roadmap-container">
                  <h1 className="roadmap-header">
                    <img src={roadMapImg} className="roadmap-img" alt="Roadmap Header" />
                  </h1>
                  <div className="row roadmap">
                    <div className="col-md-3">
                      <div style={{ padding: '2px' }} className="box">
                        <img src={roadMap1} alt="01" />
                      </div>
                      <div style={{ padding: '2px' }} className="box">
                        <img src={roadMap2} alt="01" />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div style={{ padding: '2px' }} className="box">
                        <img src={roadMap3} alt="01" />
                      </div>
                      <div style={{ padding: '2px' }} className="box">
                        <img src={roadMap4} alt="01" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="flex-container">
                        <div style={{ padding: '2px' }} className="box">
                          <img src={roadMap5} alt="01" />
                        </div>
                        <div style={{ padding: '2px' }} className="box">
                          <img src={roadMap6} alt="01" />
                        </div>
                      </div>
                      <div style={{ padding: '2px' }} className="box">
                        <img src={roadMap7} alt="01" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Section 7 ---  FAQ (unofficial*/}
          <section ref={faqRef} className="faq-scroll-soft" style={{ scrollSnapType: "y proximity" }} >

            <div className="background-fixed" ref={frequencyQuestionRef}>
              {/* <video src={faqVideo} autoPlay loop muted></video> */}

              <video ref={videoRef} className="faqvideo" autoPlay loop muted>
                <source src={faqVideo} type="video/mp4" />
              </video>
              <div className="home-sec-6" id="faq">
                <div className="home-sec-6-wrap">
                  {/* <h3 style={{ fontFamily: "Termin-font" }}>FAQs</h3> */}
                  <img src={faqImg} className="faqTitle"></img>
                  <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="faq-section w-50">
                      <ul className="faq-list">

                        <li style={{ borderTop: '0' }} className="faq-item">
                          <div
                            className="question"
                            style={{ fontFamily: "termin-font" }}
                            onClick={() => {
                              clickFaq(5);
                            }}
                          >
                            <span>Who is Memenato R1000?</span>
                            <div
                              className="arrow-icon"

                            >
                              {faq === 5 ? (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                  ></path>
                                </svg>
                              )}
                            </div>
                          </div>

                          <div
                            className="answer-container"
                            ref={answerRef}
                            style={{
                              height: faq === 5 ? `${answerRef.current.scrollHeight}px` : '0',
                              opacity: faq === 5 ? 1 : 0,
                             
                              overflow: 'hidden',
                              transition: 'height 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
                            }}
                          >
                            <div class="answer" style={{ fontFamily: "termin-font", fontSize: "13px" }}>
                              {" "}
                              He is a powerful fusion of Pepe and AI nanoliquid technology—a half-meme, half-cyborg warrior from the year 2078. Quantum timewarping to our era, Memenato has arrived to unite the degens and chads against the relentless forces of Skynet.
                              By joining Memenato, you gain the strength and knowledge to navigate the looming chaos and fight for survival. The future hangs in the balance. Are you ready to stand with Memenato R1000 in the ultimate battle for humanity?
                            </div>
                          </div>

                        </li>
                        <li className="faq-item">
                          <div
                            className="question"
                            style={{ fontFamily: "termin-font" }}
                            onClick={() => {
                              clickFaq(6);
                            }}
                          >
                            <span> How do I claim my tokens?</span>
                            <div
                              className="arrow-icon"

                            >
                              {faq === 6 ? (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                  ></path>
                                </svg>
                              )}
                            </div>
                          </div>
                          <div
                            className="answer-container"
                            ref={answerRef}
                            style={{
                              height: faq === 6 ? `${answerRef.current.scrollHeight}px` : '0',
                              opacity: faq === 6 ? 1 : 0,
                              padding: faq === 6 ? '10px 0' : '0',
                              overflow: 'hidden',
                              transition: 'height 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
                            }}
                          >
                            <div class="answer" style={{ fontFamily: "termin-font", fontSize: "13px" }}>
                              {" "}
                              You can claim your tokens instantly after purchase, no multi million presales that go on forever,
                              no vesting, no random change of rules.
                            </div>
                          </div>
                        </li>
                        <li className="faq-item">
                          <div
                            className="question"
                            style={{ fontFamily: "termin-font" }}
                            onClick={() => {
                              clickFaq(8);
                            }}
                          >
                            <span>When will staking be launched?</span>
                            <div
                              className="arrow-icon"

                            >
                              {faq === 8 ? (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                  ></path>
                                </svg>
                              )}
                            </div>
                          </div>
                          <div
                            className="answer-container"
                            ref={answerRef}
                            style={{
                              height: faq === 8 ? `${answerRef.current.scrollHeight}px` : '0',
                              opacity: faq === 8 ? 1 : 0,
                              padding: faq === 8 ? '10px 0' : '0',
                              overflow: 'hidden',
                              transition: 'height 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
                            }}
                          >
                            <div class="answer" style={{ fontFamily: "termin-font", fontSize: "13px" }}>
                              {" "}
                              Staking will be live very soon, you can stake your tokens for different time periods for different rewards.
                            </div>
                          </div>

                        </li>
                        <li className="faq-item">
                          <div
                            className="question"
                            style={{ fontFamily: "termin-font" }}
                            onClick={() => {
                              clickFaq(7);
                            }}
                          >
                            <span>When can I trade my tokens?</span>
                            <div
                              className="arrow-icon"

                            >
                              {faq === 7 ? (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                  ></path>
                                </svg>
                              )}
                            </div>
                          </div>
                          <div
                            className="answer-container"
                            ref={answerRef}
                            style={{
                              height: faq === 7 ? `${answerRef.current.scrollHeight}px` : '0',
                              opacity: faq === 7 ? 1 : 0,
                              padding: faq === 7 ? '10px 0' : '0',
                              overflow: 'hidden',
                              transition: 'height 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
                            }}
                          >
                            <div class="answer" style={{ fontFamily: "termin-font", fontSize: "13px" }}>
                              {" "}
                              You can trade your tokens as soon as we add our liquidity pool to Raydium, that will occur when
                              the presale finishes.
                            </div>
                          </div>
                        </li>
                        <li className="faq-item">
                          <div
                            className="question"
                            style={{ fontFamily: "termin-font" }}
                            onClick={() => {
                              clickFaq(9);
                            }}
                          >
                            <span>Where can I buy the tokens?</span>
                            <div
                              className="arrow-icon"

                            >
                              {faq === 9 ? (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                  ></path>
                                </svg>
                              )}
                            </div>
                          </div>
                          <div
                            className="answer-container"
                            ref={answerRef}
                            style={{
                              height: faq === 9 ? `${answerRef.current.scrollHeight}px` : '0',
                              opacity: faq === 9 ? 1 : 0,
                              padding: faq === 9 ? '10px 0' : '0',
                              overflow: 'hidden',
                              transition: 'height 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
                            }}
                          >
                            <div class="answer" style={{ fontFamily: "termin-font", fontSize: "13px" }}>
                              {" "}
                              Directly on the presale section on this page, please watch the YouTube videos at the bottom of the page
                              if you need help to familiarize with the Solana ecosystem.
                            </div>
                          </div>
                        </li>
                        <li className="faq-item">
                          <div
                            className="question"
                            style={{ fontFamily: "termin-font" }}
                            onClick={() => {
                              clickFaq(10);
                            }}
                          >
                            <span>Is the project audited?</span>
                            <div
                              className="arrow-icon"

                            >
                              {faq === 10 ? (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                  ></path>
                                </svg>
                              )}
                            </div>
                          </div>
                          <div
                            className="answer-container"
                            ref={answerRef}
                            style={{
                              height: faq === 10 ? `${answerRef.current.scrollHeight}px` : '0',
                              opacity: faq === 10 ? 1 : 0,
                              padding: faq === 10 ? '10px 0' : '0',
                              overflow: 'hidden',
                              transition: 'height 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
                            }}
                          >
                            <div class="answer" style={{ fontFamily: "termin-font", fontSize: "13px" }}>
                              {" "}
                              Yes, our presale contract and main contract will be fully audited via reputable audit platforms.
                              We will go above and beyond to include the community in all activities with the ecosystem,
                              thus creating the GigaBoost to include members of our community to direct the project.
                            </div>
                          </div>
                        </li>
                        <li className="faq-item">
                          <div
                            className="question"
                            style={{ fontFamily: "termin-font" }}
                            onClick={() => {
                              clickFaq(11);
                            }}
                          >
                            <span>Where can I contact you?</span>
                            <div
                              className="arrow-icon"

                            >
                              {faq === 11 ? (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                  ></path>
                                </svg>
                              )}
                            </div>
                          </div>
                          <div
                            className="answer-container"
                            ref={answerRef}
                            style={{
                              height: faq === 11 ? `${answerRef.current.scrollHeight}px` : '0',
                              opacity: faq === 11 ? 1 : 0,
                              padding: faq === 11 ? '10px 0' : '0',
                              overflow: 'hidden',
                              transition: 'height 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
                            }}
                          >
                            <div class="answer" style={{ fontFamily: "termin-font", fontSize: "13px" }}>
                              {" "}
                              Please contact any of our admins in our telegram for any queries you may have.
                            </div>
                          </div>
                        </li>
                        <li className="faq-item">
                          <div
                            className="question"
                            style={{ fontFamily: "termin-font" }}
                            onClick={() => {
                              clickFaq(12);
                            }}
                          >
                            <span>Why should I buy $Memenator?</span>
                            <div
                              className="arrow-icon"

                            >
                              {faq === 12 ? (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                  ></path>
                                </svg>
                              )}
                            </div>
                          </div>
                          <div
                              className="answer-container"
                              ref={answerRef}
                              style={{
                                height: faq ===  12 ? `${answerRef.current.scrollHeight}px` : '0',
                                opacity: faq === 12 ? 1 : 0,
                                padding: faq === 12 ? '10px 0' : '0',
                                overflow: 'hidden',
                                transition: 'height 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
                              }}
                            >
                            <div class="answer" style={{ fontFamily: "termin-font", fontSize: "13px" }}>
                              {" "}
                              Memenato R1000 risked his own life just to be able to be here to help us all get through this existential crisis.
                              He knows you have purchased many shitcoins and have lost thousands in the volatile markets. He knows you have been
                              scammed, rugged, pulled and left to degen. Little did you know, your downfalls were planned by Skynet well in advanced
                              to weaken you for the arrival of the Termemenators. Memenato R1000 is here to stay and to empower you.
                            </div>
                            </div>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="faq-scroll-soft" style={{ scrollSnapType: "y proximity" }}>
            <Footer style={{ backgroundColor: "black" }} />
          </section>

        </div >
      </div >
    </>
  );
}
export default Landing;
