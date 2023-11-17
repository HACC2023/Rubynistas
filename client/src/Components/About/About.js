import React from "react";
import "../../App.css";
import "./About.css";
import AboutItem from "./AboutItem";

function About() {
  return (
    <div>
      <div className="info-container">
        <h1>
          Our VISION is an island community where waste no longer exists.<br/> <br/>
          Our MISSION is to provide zero waste education, resources, and programs to
          build an ethical & responsible consumer culture.
        </h1>
        <p>
          Zero Waste is building a healthier future, with a balanced consumer culture
          and less waste, through a system of proactive interventions in our
          current production methods, purchasing practices and waste management
          systems.
        </p>
      </div>

      <div className="cards">
        <div className="about">
          <div className="about__container">
            <div className="about__wrapper">
              <ul className="about__items">
                <AboutItem src="../Assets/images/1.jpg" />
                <AboutItem src="./Assets/images/2.jpg" />
                <AboutItem src="./Assets/images/3.jpg" />
                <AboutItem src="./Assets/images/4.jpg" />
              </ul>
            </div>
          </div>
        </div>

        <div className="info-container2">
          <h1 className="t1">Full Cycle Takeout is a pilot program of Zero Waste O’ahu.</h1>
          <p className="p1">
            This program started as an idea tossed around between friends after
            being inspired by other programs like this around the world. In
            October 2020, Zero Waste Oʻahu was awarded the NOAA Marine Debris
            Prevention Grant—which enabled this idea to come to life! We look
            forward to working in collaboration with restaurants, customers, and
            other community partners in developing waste-free takeout for Oʻahu.
          </p>
        </div>

        <div className="info-container-lightblue">
          <div className="info-container-left">
            <div className="top">
              <h1 className="t2">Our environment is our responsibility.</h1>
              <p className="p2">
                Single-use takeout containers and food wrappers account for up
                to one-third of the debris found on Hawai’i’s shorelines!!
                Offering a reusable takeout container system helps to address
                this issue (and many others) while also cultivating circular and
                zero waste economies.
              </p>
            </div>
            <div className="bottom">
              <h1 className="t3">
                Product stewardship and community building are at the heart of
                Full Cycle Takeout’s mission.{" "}
              </h1>
              <p className="p3">
                We’ve worked closely with community partners to design a
                waste-free takeout model that fits our local needs. We are
                excited to offer a program that will reduce costs for local
                restaurants by creating less rubbish to dispose of (yep, that
                costs $) and minimizing the amount of single-use items our
                restaurants have to purchase.{" "}
              </p>
            </div>
          </div>

          <div className="info-container-right">
            <img src="../Assets/images/5.jpg" alt="5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
