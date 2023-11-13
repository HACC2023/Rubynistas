import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import './navbar2.css';
import {GiWaveSurfer} from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
//import {Button} from '../Buttons/Button';

function Navbar2() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();

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


  const handleLogout = async () => {
    try {
      // Perform necessary cleanup tasks, e.g., invalidate tokens
      // Simulate a delay to mimic an asynchronous operation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear local storage or cookies
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');

      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout failure, show an error message, etc.
      alert('Logout failed. Please try again.');
    }
  };

  window.addEventListener('resize', showButton);

  return (
    <>
    <nav className='navbar2'>
        <div className='navbar2-container'>
            <Link to='/' className='navbar2-logo' onClick={closeMobileMenu}>
            <GiWaveSurfer/> Zero Waste 
            </Link>
            <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fa-regular fa-circle-xmark' : 'fas fa-bars'} onClick={handleClick}></i>
            </div>
            <ul className={click ? 'nav-menu2 active': 'nav-menu2'}>
              <li className='nav-item2'>
                <Link to='/account' className='nav-links2' onClick={closeMobileMenu}>
                  Account
                </Link>
              </li>
              <li className='nav-item2'>
                <Link to='/locations' className='nav-links2' onClick={closeMobileMenu}>
                  Locations
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                  Logout
                </Link>
              </li>
            </ul>
            {button && (
            <button to='/login' className="logout2" onClick={handleLogout}>Logout</button>
          )}
        </div>
    </nav>
    </>
  );
}

export default Navbar2;

