import React from 'react';
import ReactDOM from 'react-dom';

const ATMDeposit = ({ onChange, isDeposit, atmMode, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    atmMode && <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  
  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    let inputAmount = Number(event.target.value);
    setDeposit(inputAmount);
    setIsValid(atmMode === 'Deposit' || inputAmount <= totalState);
  };

  const handleModeSelect = (event) => {
    const value = event.target.value;
    setAtmMode(value);
    if (value === "Deposit") {
      setIsDeposit(true);
    } else if (value === "Cash Back") {
      setIsDeposit(false);
    }
    setIsValid(value === 'Deposit' || deposit <= totalState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setDeposit(0);
    setIsValid(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode} isValid={isValid}></ATMDeposit>
    </form>
  );
};

// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
