import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchPage.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();


  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://zerowaste-main.onrender.com/api/user/search/${searchTerm}`);

      if (response.status === 200) {
        setSearchResults(response.data);
      } else {
        console.error('Error fetching search results:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleContainerChange = async (userId, changeAmount) => {
    try {
      const response = await axios.put(`https://zerowaste-main.onrender.com/api/user/update/${userId}`, {
        containers: searchResults.find(result => result._id === userId).containers + changeAmount,
      });
  
      if (response.status === 200) {
        // Update the local state with the updated data
        const updatedResults = searchResults.map((result) =>
          result._id === userId ? { ...result, containers: result.containers + changeAmount } : result
        );
  
        setSearchResults(updatedResults);
      } else {
        console.error('Error updating containers:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating containers:', error);
    }
  };
  
  const handleLogout = async () => {
    try {
      // Perform necessary cleanup tasks, e.g., invalidate tokens
      // Simulate a delay to mimic an asynchronous operation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear local storage or cookies
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');

      // Redirect to the login page
      navigate('/vlogin');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout failure, show an error message, etc.
      alert('Logout failed. Please try again.');
    }
  };
  

  return (
    <div className="center-container">
    <div className="search-container">
      <h2 className="search-heading">User Search</h2>
      <input
        type="text"
        placeholder="Enter email to search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {searchResults.length > 0 ? (
        <div>
          <h3 className="search-results-heading">Search Results:</h3>
          <ul className="search-results-list">
            {searchResults.map((result) => (
              <li key={result._id} className="search-result-item">
                <p className="result-name">Name: {result.name}</p>
                <p className="result-email">Email: {result.email}</p>
                <p className="result-containers">Containers: {result.containers}</p>
                <div className="container-change">
                  <label htmlFor={`containers-${result._id}`}>Change Containers: </label>
                  <input
                    type="number"
                    id={`containers-${result._id}`}
                    value={result.changeAmount || ''}
                    onChange={(e) => {
                      const updatedResults = searchResults.map((r) =>
                        r._id === result._id ? { ...r, changeAmount: parseInt(e.target.value, 10) } : r
                      );
                      setSearchResults(updatedResults);
                    }}
                  />
                  <button  className="apply-button" onClick={() => handleContainerChange(result._id, result.changeAmount || 0)}>
                    Apply Change
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="no-results">No search results</p>
      )}
      <br/>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
    </div>
    
  );
};

export default SearchPage;