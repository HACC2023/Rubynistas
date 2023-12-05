import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const CreditCardDisplay = ({ number, name, expiry, cvc }) => {
  return (
    <div className="card">
      <Cards number={number} name={name} expiry={expiry} cvc={cvc} />
      <div className="card-info">
        <p>CVC: {cvc}</p>
      </div>
    </div>
  );
};

export default CreditCardDisplay;
