import React, { useState , useEffect} from 'react';
import Cards from 'react-credit-cards-2';
import './CreditCard.css';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import CreditCardDisplay from './CreditCardDisplay';

const CreditCard = ({ onSubmit }) => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const [submittedData, setSubmittedData] = useState([]);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  // Load submitted data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('submittedData');
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    }
  }, []);

  // Save submitted data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('submittedData', JSON.stringify(submittedData));
  }, [submittedData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Validation to check if all fields are filled
    if (!number || !name || !expiry || !cvc) {
      alert("Please fill out all fields before submitting.");
      return;
    }
  
    // Validate credit card number length
    if (number.length !== 16) {
      alert("Please enter a valid 16-digit credit card number.");
      return;
    }
  
    // Validate expiration date format (MM/YY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) {
      alert("Please enter a valid expiration date in the MM/YY format.");
    return;
    }

    /// Validate expiration date is in the future
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; 
    const [enteredMonth, enteredYear] = expiry.split('/').map((item) => parseInt(item, 10));

    // Adjusting the year to be a 4-digit year
    const enteredYearFull = enteredYear + Math.floor(currentYear / 100) * 100;

    if (
      enteredYearFull < currentYear ||
      (enteredYearFull === currentYear && enteredMonth < currentMonth)
    ) {
      alert("Please enter a valid expiration date in the future.");
      return;
    }

    // Validate CVC number length
    if (cvc.length !== 3 && cvc.length !== 4) {
      alert("Please enter a valid 3 or 4 digit CVC number.");
      return;
    }
  
    // Call the onSubmit callback with the form data
    const newData = { number, name, expiry, cvc };
    setSubmittedData([...submittedData, newData]);
    onSubmit(newData);

    //Disable form after submission
    setIsFormDisabled(true);

    // Clear form fields after submission
    setNumber('');
    setName('');
    setExpiry('');
    setCvc('');
    setFocus('');
  };

  const handleDelete = (index) => {
    const newData = [...submittedData];
    newData.splice(index, 1);
    setSubmittedData(newData);

    // Enable the form after deletion if there's no more submitted data
    if (newData.length === 0) {
      setIsFormDisabled(false);
    }
  };

  return (
    <div> 
      {/*Form*/}
      <div className="card">
        <Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={focus} />
        <form onSubmit={handleFormSubmit}>
          <input 
                      type = 'tel' 
                      name='number' 
                      placeholder = 'Card Number' 
                      value ={number} 
                      onChange={e => setNumber(e.target.value)}
                      onFocus = {e =>setFocus(e.target.name)}
                      maxLength="16"
                      inputmode="numeric"
                      pattern="[0-9]*" 
                      autocomplete="cc-number"
                  />
                  <input 
                      type = 'text' 
                      name='name' 
                      placeholder = 'Name' 
                      value ={name} 
                      onChange={e => setName(e.target.value)}
                      onFocus = {e =>setFocus(e.target.name)}
                      maxLength="20"
                  />
                  <input 
                      type = 'text' 
                      name='expiry' 
                      placeholder = 'MM/YY Expiry' 
                      value ={expiry} 
                      onChange={e => setExpiry(e.target.value)}
                      onFocus = {e =>setFocus(e.target.name)}
                      maxLength="5"
                  />
                  <input 
                      type = 'tel' 
                      name='cvc' 
                      placeholder = 'CVC' 
                      value ={cvc} 
                      onChange={e => setCvc(e.target.value)}
                      onFocus = {e =>setFocus(e.target.name)}
                      maxLength="4"
                      pattern="[0-9]*" 
                  />
          <button type="submit" disabled={isFormDisabled}> Submit</button>
        </form>
      </div>

      {/*Display the card*/}
      <div>
        <h1 className="card-heading"> Your Card </h1>
        {submittedData.map((data, index) => (
          <div key={index} className="card-container">
            <CreditCardDisplay {...data} />
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
</div>
    
  );
};

export default CreditCard;
