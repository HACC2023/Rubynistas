import React from 'react';
import '../../App.css';
import {Button} from './Buttons/Button';
import './HeroSection.css';
//import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='../Assets/videos/video-1.mp4' autoPlay loop muted />
      <h1>Zero Waste <br/> Reuseable Containers</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
    
        >
          GET STARTED <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;