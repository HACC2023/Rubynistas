import React from 'react';
import '../../App.css';
import './About.css';

function About() {
    return (
        <div>
            <div className='img-container'>
                
                <img src='../Assets/images/1.jpg' alt = '1' />
                <img src='../Assets/images/2.jpg' alt = '2'/>
                <img src='../Assets/images/3.jpg' alt = '3'/>
                <img src='../Assets/images/4.jpg' alt = '4'/>
            </div>
            
            <div className='info-container'>
                <h1>Full Cycle Takeout is a pilot program of Zero Waste O’ahu.</h1>
                <p>This program started as an idea tossed around between friends after being inspired by other programs like this around the world. In October 2020, Zero Waste Oʻahu was awarded the NOAA Marine Debris Prevention Grant—which enabled this idea to come to life! 
                    We look forward to working in collaboration with restaurants, customers, and other community partners in developing waste-free takeout for Oʻahu.</p>
            </div>

            <div className='info-container-lightblue'>
                <div className='info-container-left'>
                    <div className='top'>
                        <h1>Our environment is our responsibility.</h1>
                        <p>Single-use takeout containers and food wrappers account for up to one-third of the debris found on Hawai’i’s shorelines!! Offering  a reusable takeout container system helps to address this issue (and many others) while also cultivating circular and zero waste economies.</p>
                    </div>
                    <div className='bottom'>
                        <h1>Product stewardship and community building are at the heart of Full Cycle Takeout’s mission. </h1>
                        <p>We’ve worked closely with community partners to design a waste-free takeout model that fits our local needs. We are excited to offer a program that will reduce costs for local restaurants by creating less rubbish to dispose of (yep, that costs $) and minimizing the amount of single-use items our restaurants have to purchase. </p>
                    </div>
                </div>

                <div className='info-container-right'>
                    <img src='../Assets/images/5.jpg' alt = '5' />
                </div>
                
            </div>
                
        </div>
    );
}


  export default About;