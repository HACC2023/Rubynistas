import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Auth/customer_auth/Login';
import Signup from './Components/Auth/customer_auth/Signup';
import MainPage from './Components/Main/MainPage';
import Search from './Components/SearchPage/SearchPage';
import Footer from './Components/Footer/Footer';
import Vlogin from './Components/Auth/vender_auth/Vlogin';
import Vsignup from './Components/Auth/vender_auth/Vsignup';
import About from './Components/About/About';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<><Navbar /><Home /></>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/signup" element={<><Navbar /><Signup /></>} />
          <Route path="/vender" element={<><Navbar /><Vlogin /></>} />
          <Route path="/vlogin" element={<><Navbar /><Vlogin /></>} />
          <Route path="/vsignup" element={<><Navbar /><Vsignup /></>} />
          {/* Exclude Navbar / Search on /main route */}
          <Route path="/main" element={<MainPage />} />
          <Route path="/search" exact Component={Search} />
          <Route path="/about-us" exact Component={About} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
