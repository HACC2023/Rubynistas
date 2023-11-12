import React, { useState } from 'react';
import './MainPage.css'; // Import the CSS file
import axios from 'axios'; // Import Axios for making HTTP requests

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


const MainPage = () => {
  const [returnedContainers, setReturnedContainers] = useState(0);
  const [points, setPoints] = useState(0);


  const rewardCards = [
    { containerCount: 1, reward: 5 },
    { containerCount: 5, reward: 10 },
    { containerCount: 10, reward: 15 },
    // Add more reward cards as needed
  ];


  return (
    <div className="center-container2">
      <div className="main-wrapper">
        <h1 className="main-title">Welcome, </h1>
        <h2 className="main-title"> Your Rewards Status </h2>
        <div>
          <p>Returned Containers: {returnedContainers}</p>
          <p>Points: {points}</p>
          <br />
        </div>

        <div className="reward-cards-container">
          {rewardCards.map((card, index) => (
            <RewardCard
              key={index}
              containerCount={card.containerCount}
              reward={card.reward}
            />
          ))}
        </div>
        <br />
      </div>
    </div>
  );
};

export default MainPage;

