import React, { useState } from 'react';
import CreditCard from './CreditCard';
import './HomeCreditCard.css';
import { Link } from 'react-router-dom';

function HomeCreditCard() {
  const [submittedData, setSubmittedData] = useState([]);
  const [isFormDisabled] = useState(false);

  const handleCancel = () => {
    // Add logic for cancel action
  };

  const handleSubmit = (formData) => {
    // Handle the submit action 
    setSubmittedData([...submittedData, formData]);
  };


  return (
    <>
      <h1 className="card-heading">Add A Card</h1>
      <CreditCard onSubmit={handleSubmit} isFormDisabled={isFormDisabled} />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {/*
        <Link to="/main">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </Link>
        */}
      </div>

    </>
  );
}

export default HomeCreditCard;
