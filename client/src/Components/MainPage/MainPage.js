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
        <h1 className="main-title">Welcome, {name}!</h1>
        <p className="cca">Current Container Amount: {containers}</p>

        <div className="reward-status-card">
          <h2 className="main-title2">YOUR REWARD STATUS</h2>
          <div className="reward-status-content">
            <p className="points">{points}</p>
            <p className="point">POINTS</p>
          </div>
        </div>

<p className="reward-points">POINTS ADD UP TO REWARDS</p>
        <div className="reward-cards-container">
          {rewardCards.map((card, index) => (
            <RewardCard
              key={index}
              containerCount={card.containerCount}
              reward={card.reward}
              userData={userData}
              incentiveOptions={getIncentiveOptionsForCard(card)}
            />
          ))}
        </div>
        <br />
      </div>
    </div>
  );
};



const RewardCard = ({ containerCount, reward, userData, incentiveOptions }) => {
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

// Helper function to get incentive options based on the reward card
const getIncentiveOptionsForCard = (rewardCard) => {
  // You can customize this function based on your logic
  // For example, you can return different incentive options based on the rewardCard properties
  if (rewardCard.reward === 5) {
    return [
      { points: 10, incentive: '5% discount on next meal' },
      { points: 15, incentive: 'Free drink with your next purchase' },
      { points: 20, incentive: 'Free drink with your next purchase' },
    ];
  } else if (rewardCard.reward === 10) {
    return [
      { points: 10, incentive: '10% off your entire order' },
      { points: 20, incentive: 'Free dessert with your next meal' },
      { points: 30, incentive: 'Free dessert with your next meal' },
    ];
  } else {
    // Default case or additional logic
    return [
      { points: 15, incentive: 'Free appetizer with your next purchase' },
      { points: 30, incentive: '20% off your entire order' },
      { points: 45, incentive: '20% off your entire order' },
    ];
  }
};

export default MainPage;

