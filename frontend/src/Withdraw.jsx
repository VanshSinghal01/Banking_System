import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logo from './account3.png';
import '@fortawesome/fontawesome-free/css/all.css';

const Withdraw = () => {
  const [account1, setAccount1] = useState(''); 
  const [initial, setInitial] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const money = async () => {
    setValidationMessage('');

    if (!account1 || !initial) {
      setValidationMessage('All fields are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://bankbackend-mp91.onrender.com/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accountNumber: account1,
          amount: initial
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setValidationMessage(data.message || 'Withdrawal failed.');
      } else {
        setValidationMessage(`✅ ${data.message}`);
        setAccount1('');
        setInitial('');

        // Optional: small timeout before navigating
        setTimeout(() => navigate('/Dashboard'), 1500);
      }
    } catch (err) {
      console.error('Withdraw Error:', err);
      setValidationMessage('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div>
     <h1 className='ho'>Create Your <span>New</span> Account!</h1>
       <div className='header'>
        <div className='main1'>
          <img src={logo} className='imga1' alt="Logo" />
          <div className='heado1'>
            <h1>Welcome</h1>
            <span>Withdraw Safely</span>

            <div className='head-1'>
              <input
                type='text'
                placeholder='Account Number'
                onChange={(e) => setAccount1(e.target.value)}
                value={account1}
              />
            </div>

            <div className='head-2'>
              <input
                type='text'
                placeholder='Amount'
                onChange={(e) => setInitial(e.target.value)}
                value={initial}
              />
            </div>

            {validationMessage && <p className='validation-message'>{validationMessage}</p>}

            <button className='butt' onClick={money} disabled={loading}>
              {loading ? 'Processing...' : 'Withdraw'}
            </button>
            <button className='butt1' onClick={() => navigate('/Dashboard')}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
