import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Auth/customer_auth/Login';
import Signup from './Components/Auth/customer_auth/Signup';
import MainPage from './Components/MainPage/MainPage';
import Search from './Components/SearchPage/SearchPage';
import Footer from './Components/Footer/Footer';
import Vlogin from './Components/Auth/vendor_auth/Vlogin';
import Vsignup from './Components/Auth/vendor_auth/Vsignup';
import HomeAbout from './Components/About/HomeAbout';
import Navbar2 from './Components/MainPage/MainNavbar/Navbar2';



function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path='/' element={<><Navbar /><Home /></>} />
            <Route path="/login" element={<><Navbar /><Login /></>} />
            <Route path="/signup" element={<><Navbar /><Signup /></>} />
            <Route path="/vendor" element={<><Navbar /><Vlogin /></>} />
            <Route path="/vlogin" element={<><Navbar /><Vlogin /></>} />
            <Route path="/vsignup" element={<><Navbar /><Vsignup /></>} />
            <Route path="/main" element={<><Navbar2 /><MainPage /></>} />
            <Route path="/about-us" element={<><Navbar /><HomeAbout /></>} />
            {/* Corrected Route for "/search" */}
            <Route path="/search" element={<Search />} />
          </Routes>
          <Footer />
        </Router>
      </>
    );
  }

export default App;