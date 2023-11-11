import React from 'react';
import '../../App.css';
//import Cards from '../Cards';
import HeroSection from '../Hero/HeroSection';
//import Footer from '../Footer/Footer';
import Cards from '../Containers/Cards';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards/>
    </>
  );
}

export default Home;