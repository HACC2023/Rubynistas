import React from 'react';
import '../../App.css';
import './About.css';

function About() {
    return (
        <div>
            <div className='vid-container'>
                <video src='../Assets/videos/vid.mp4' autoPlay loop muted />
                <h1>About Us</h1>
               
            </div>
        </div>
    );
}


  export default About;