import React, { useState, useEffect } from 'react';
import './MainPage.css'; // Import the CSS file
import axios from 'axios';



const MainPage = () => {
  const [containers, setReturnedContainers] = useState(0);
  const [points, setPoints] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [name, setUserName] = useState('');

  const rewardCards = [
    { containerCount: 1, reward: 5 },
    { containerCount: 5, reward: 10 },
    { containerCount: 10, reward: 15 },
  ];

  useEffect(() => {
    // Retrieve the email from local storage
    const savedEmail = localStorage.getItem('userEmail');
    setUserEmail(savedEmail);

    const fetchData = async () => {
      try {
        if (savedEmail) {
          const response = await axios.get(`https://zerowaste-main.onrender.com/api/user/main/${savedEmail}`);
          const userData = response.data;
          setUserName(userData.name);
          setUserData(userData);
          setReturnedContainers(userData.containers);
          setPoints(userData.points);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="center-container2">
      <div className="main-wrapper">
        <h1 className="main-title">Welcome, {name}</h1>
        <h2 className="main-title">Your Rewards Status</h2>
        <div>
          <p>Current Container Amount: {containers}</p>
          <p>Points: {points}</p>
          <br />
        </div>

        <div className="reward-cards-container">
          {rewardCards.map((card, index) => (
            <RewardCard
              key={index}
              containerCount={card.containerCount}
              reward={card.reward}
              userData={userData}
            />
          ))}
        </div>
        <br />
      </div>
    </div>
  );
};

const RewardCard = ({ containerCount, reward }) => {
  const incentiveOptions = [
    { points: 25, incentive: '5% discount on next meal' },
    { points: 50, incentive: 'Free drink with your next purchase' },
    { points: 100, incentive: '10% off your entire order' },
    // Add more incentive options as needed
  ];

  const [showIncentives, setShowIncentives] = useState(false);

  const handleToggleIncentives = () => {
    setShowIncentives(!showIncentives);
  };

  return (
    <div className="reward-card">
      <p> Return {containerCount} Containers</p>
      <p>Get {reward} Points</p>
      <p onClick={handleToggleIncentives} className="toggle-incentives">
        {showIncentives ? 'Hide Incentives' : 'Show Incentives'}
      </p>
      {showIncentives && (
        <ul className="incentive-list">
          {incentiveOptions.map((option, index) => (
            <li key={index}>{`(${option.points} points) ${option.incentive}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MainPage;

