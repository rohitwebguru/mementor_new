import React from 'react';

import telegramIcon from "../assets/boxes/telegram.png";
import bottomLogo from "../assets/logo/r1000logo.png";
import twitterIcon from "../assets/boxes/xlogo.png";
import musicIcon from "../assets/images/music1_360.png";
import musicStopIcon from "../assets/images/music2_360.png";
import music from "../assets/music/music.mp3";
import muteIcon from "../assets/boxes/telegram.png";
import footerVideo from "../assets/new_image/footer-video.mp4";


const Footer = () => {


  
  return (
    <footer className="footer">
      <div className="animation-container">
        <div className="planet planet1"></div>
        <div className="planet planet2"></div>
        <div className="asteroid asteroid1"></div>
        <div className="asteroid asteroid2"></div>
        {Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className={`star star${index + 1}`}></div>
        ))}
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={`shooting-star shooting-star${index + 1}`}></div>
        ))}
      </div>
      <div className="top-row">
        <div className="youtube-videos">
          <h3>Featured Videos</h3>
          <div className="videos">
            <iframe
              width="300"
              height="200"
              src="https://www.youtube.com/embed/0gOrvTzmPRY?"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <iframe
              width="300"
              height="200"
              src="https://www.youtube.com/embed/CoyvAyxX0aw"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="middle-row">
        <div className="column useful-links">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="#presale">Presale</a></li>
            <li><a href="#tokenomics">Tokenomics</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#staking">Staking</a></li>
            <li><a href="#whitepaper">Whitepaper</a></li>
          </ul>
        </div>
        <div className="column image-container">
          {/* <img src={bottomLogo} alt="Footer Image" className="footer-image" /> */}
          <video src={footerVideo} autoPlay loop muted></video>
        </div>
        <div className="column social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
          <a href="https://x.com/MemenatoR1000" previewlistener="true" className="my-button">
                  <img src={telegramIcon} style={{width:"100px", height:"100px"}}></img>
                </a>
            <a href="https://twitter.com" previewlistener="true">
                  <img src={twitterIcon} style={{width:"100px", height:"100px"}} className="my-button"></img>
                </a>
            
         </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Memenato R1000. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
