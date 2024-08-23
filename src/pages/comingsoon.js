import React, { useState, useEffect } from 'react';
import Navbar from './Dashboardd/Navbar.jsx';
import Header2 from './Dashboardd/header2.js';
import CustomCursor from '../components/CustomCursor.js';
import video from '../assets/images/dapp.mp4';
import './Dashboardd/dashboard.css';

export default function ComingSoon({ text }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1440);
  const [animatedText, setAnimatedText] = useState("");

  useEffect(() => {
    let newText = "";
    for (let i = 0; i < text.length; i += 1) {
      newText += `<i>${text.charAt(i)}</i>`;
    }
    setAnimatedText(newText);

    const wrappedChars = document.getElementsByTagName("i");
    let j = 0;

    function addEffect() {
      setTimeout(() => {
        wrappedChars[j].className = "fly-in-out";
        j += 1;
        if (j < wrappedChars.length) {
          addEffect();
        }
      }, 100);
    }

    addEffect();
  }, [text]);

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

  return (
    <>
      <CustomCursor />
      <video className="dashboard-video" src={video} autoPlay muted loop></video>
      <div className="dashboard-main-box">
        <Navbar style={navbarStyle} />
        <Header2 style={header2Style} />
      </div>
      <div className="intro v-center" style={{display:'flex', height:'100vh', justifyContent:'center', alignItems:'center', }}>
        <p className="typer" dangerouslySetInnerHTML={{ __html: animatedText }} />
      </div>
    </>
  );
}



