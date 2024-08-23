import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/dashboardnavbar.css'; // Import Navbar-specific CSS

//  --- ---- ---  Social icons  --- ---- --- 
import {FaTwitter} from 'react-icons/fa';
import { FaTelegramPlane } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";

const Navbar = () => {
  return (

    
    //  --- ---- --- Star of the Nav bar  --- ---- --- //

    <nav className="navbar">
      <div className="logo-container">

        {/* Logo image on the top of the nav */}
        <img src="../assets/logo/r1000logo.png" alt="Logo" className="logo"  style={{ marginRight: '50px' }}/>

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
<ul className="nav-links" style={{ marginLeft: '50px' }}>


  <li className="nav-item">
          <Link to="/" className="nav-link"><img src="../assets/dappnav/nav-staking.png" alt="nav-staking" style={{ maxWidth: 150, maxHeight: 75 }}/></Link>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link"><img src="../assets/dappnav/nav-memenator.png" alt="nav-memenator" style={{ maxWidth: 150, maxHeight: 75 }}/></Link>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link"><img src="../assets/dappnav/nav-r1000sniper.png" alt="nav-sniper" style={{ maxWidth: 150, maxHeight: 75 }}/></Link>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link"><img src="../assets/dappnav/nav-immortalize.png" alt="nav-immortalize" style={{ maxWidth: 150, maxHeight: 75 }}/></Link>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link"><img src="../assets/boxes/nav-boost.png" alt="nav-boost" style={{ maxWidth: 150, maxHeight: 75 }}/></Link>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link"><img src="../assets/dappnav/nav-mooners.png" alt="nav-mooners" style={{ maxWidth: 150, maxHeight: 75 }}/></Link>
        </li>





       {/*} <li className="nav-item">
          <Link to="/" className="nav-link"><img src="../assets/images/boxes/nav-presale.png" alt="nav-presale" style={{ maxWidth: 150, maxHeight: 75 }}/></Link>
        </li> 
        
                <li className="nav-item">
          <Link to="/" className="nav-link"><img src="../assets/images/boxes/nav-dapp.png" alt="nav-dapp" style={{ maxWidth: 150, maxHeight: 75 }}/></Link>
        </li>*/}


        <li className="nav-item">
          <Link to="/" className="nav-link"><img src="../assets/images/dappnav/nav-nft.png" alt="nav-nft" style={{ maxWidth: 150, maxHeight: 75 }}/></Link>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link"><img src="../assets/images/dappnav/nav-burning.png" alt="nav-burning" style={{ maxWidth: 150, maxHeight: 75 }}/></Link>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link"><img src="../assets/images/dappnav/nav-charity.png" alt="nav-charity" style={{ maxWidth: 150, maxHeight: 75 }}/></Link>
        </li>

      
        <li className="nav-item" style={{ marginLeft: '5px' }}>
        <Link to="/" className="nav-link green-circle">RPC (Triton)</Link>
        </li>

        <li className="nav-item" style={{ marginLeft: '30px' }}>
          <Link to="/" className="nav-link" style={{ marginLeft: '1px' }}>Settings</Link>
        </li>

        <li className="nav-item">
          <Link to="/whitepaper.pdf" className="nav-link" style={{ marginLeft: '20px' }} target="_blank">Whitepaper</Link>
        </li>


        <li className="nav-item">
  <a href="mailto:memenator1000@gmail.com?subject=Feedback%20on%20Memenator&body=Dear%20Memenator%20Team,%0D%0A%0D%0AI%20would%20like%20to%20provide%20the%20following%20feedback%20on%20Memenator:" className="nav-link" style={{ marginLeft: '20px' }}>
    Feedback
  </a>
</li>


        <li className="nav-item">
          <Link to="/" className="nav-link" style={{ marginLeft: '25px' }}>R1000 V1</Link>
        </li>

      </ul>

{/*  --- ---- --- Socail Icon Images - Nav Bar  items  --- ---- --- */}

      <div className="social-icons" style={{ marginRight: '80px' }}>

        {/* --- --- --- React-icons --- ---- --- *

        <a href="#" target="_blank" rel="noopener noreferrer"> <FaTelegramPlane /> </a>
        <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><LuInstagram /></a>
        */}


          {/* --- --- --- Social Icons Using Direct Images --- ---- --- */}

        <a href="https://t.me/memenator" target="_blank" rel="noopener noreferrer"><img src="../assets/images/boxes/telegram.png" alt="TelegramIcon" /></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><img src="../assets/images/boxes/xlogo.png" alt="TelegramIcon" /></a>
        <a href="https://x.com/MemenatoR1000" target="_blank" rel="noopener noreferrer"><img src="../assets/images/boxes/twitter.png" alt="TelegramIcon" /></a>
      </div>

    </nav>
  );
}

export default Navbar;
