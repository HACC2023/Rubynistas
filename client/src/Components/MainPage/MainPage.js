import React, { useState, useEffect } from 'react';
import './MainPage.css';
import axios from 'axios';

const MainPage = () => {
  const [containers, setReturnedContainers] = useState(0);
  const [points, setPoints] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [name, setUserName] = useState('');

  const rewardCards = [
    { containerCount: 1, reward: 15 },
    { containerCount: 5, reward: 30 },
    { containerCount: 10, reward: 50 },
  ];

  useEffect(() => {
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

  const redeemPoints = async (reward) => {
    try {
      if (points >= reward.reward) {
        const newPoints = points - reward.reward;
        setPoints(newPoints);
  
        // Update points directly in the database
        if (userEmail) {
          await axios.post('https://zerowaste-main.onrender.com/api/user/api/main/${redeem-points}', {
            userEmail: userEmail,
            pointsToRedeem: reward.reward,
          });
  
          // Assuming the server responds with updated user data, you can set it in the state
          const updatedUserData = await axios.get(`https://zerowaste-main.onrender.com/api/user/main/${userEmail}`);
          setUserData(updatedUserData.data);
        }

      } else {
        alert("Not enough points to redeem this reward!");
      }
    } catch (error) {
      console.error('Error redeeming points:', error);
    }
  };


  return (
    <div className="center-container2">
      <div className="main-wrapper">
        <h1 className="main-title">Welcome, {name}!</h1>

        <div className="reward-status-card">
          <h2 className="main-title2">YOUR REWARD STATUS</h2>
          <div className="reward-status-content">
            <p className="points">{points}</p>
            <p className="point">POINTS</p>
          </div>
        </div>
        <p className="cca">CURRENT CONTAINER AMOUNT: {containers}</p>

        <p className="reward-points">POINTS ADD UP TO REWARDS</p>
        <div className="reward-cards-container">
          {rewardCards.map((card, index) => (
            <RewardCard
              key={index}
              containerCount={card.containerCount}
              reward={card.reward}
              userData={userData}
              incentiveOptions={getIncentiveOptionsForCard(card)}
              onRedeem={() => redeemPoints(card)}
            />
          ))}
        </div>
        <br />
      </div>
    </div>
  );
};

const RewardCard = ({ containerCount, reward, userData, incentiveOptions, onRedeem }) => {
  const [showIncentives, setShowIncentives] = useState(false);

  const handleToggleIncentives = () => {
    setShowIncentives(!showIncentives);
  };

  return (
    <div className="reward-card">
    <div className="rewards-titles">
      <p> Have more than {reward} Points?</p>
      <p className="receive-title"> Receive the following: </p>
      </div>
      <button onClick={onRedeem}>Redeem</button>
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

const getIncentiveOptionsForCard = (rewardCard) => {
  if (rewardCard.reward === 15) {
    return [
      { points: 15, incentive: '5% discount on next meal' },
      { points: 20, incentive: 'Free drink with your next purchase' },
      { points: 25, incentive: 'Free drink with your next purchase' },
    ];
  } else if (rewardCard.reward === 30) {
    return [
      { points: 30, incentive: '10% off your entire order' },
      { points: 35, incentive: 'Free dessert with your next meal' },
      { points: 40, incentive: 'Free dessert with your next meal' },
    ];
  } else {
    return [
      { points: 50, incentive: 'Free appetizer with your next purchase' },
      { points: 60, incentive: '20% off your entire order' },
      { points: 70, incentive: '20% off your entire order' },
    ];
  }
};

export default MainPage;


