import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend
    axios.get('/api/user/main/:email')  // Update the endpoint as needed
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Account Information</h2>
      {userData && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Containers: {userData.containers}</p>
          <p>Points: {userData.points}</p>
          {/* Add other user information as needed */}
        </div>
      )}
    </div>
  );
};

export default AccountPage;

