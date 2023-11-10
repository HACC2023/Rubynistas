import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import './navbar.css';
import {GiWaveSurfer} from 'react-icons/gi';
import {Button} from '../Buttons/Button';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
    <nav className='navbar'>
        <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <GiWaveSurfer/> Zero Waste 
            </Link>
            <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fa-regular fa-circle-xmark' : 'fas fa-bars'} onClick={handleClick}></i>
            </div>
            <ul className={click ? 'nav-menu active': 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/about-us' className='nav-links' onClick={closeMobileMenu}>
                  About us
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/signup' className='nav-links-mobile' onClick={closeMobileMenu}>
                  Sign up
                </Link>
              </li>
            </ul>
            {button && (
            <Link to="/signup" >
              <button className="btn--outline">SIGN UP</button>
            </Link>
          )}
        </div>
    </nav>
    </>
  );
}

export default Navbar;

