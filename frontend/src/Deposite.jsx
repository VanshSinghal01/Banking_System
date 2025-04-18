import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logo from './account3.png';
import '@fortawesome/fontawesome-free/css/all.css';

const Deposite = () => {
  const [account1, setAccount1] = useState('');
  const [account2, setAccount2] = useState('');
  const [initial, setInitial] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const navigate = useNavigate();

  const handleSend = async () => {
    setValidationMessage('');

    if (!account1 || !account2 || !initial) {
      setValidationMessage('All fields are required.');
      return;
    }

    try {
      // Step 1: Send OTP to sender's email using fetch
      const response = await fetch('https://bankbackend-cbkp.onrender.com/deposit-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderAccount: account1 }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      // Step 2: Navigate to confirm OTP page with transfer details
      navigate('/confirmOtp', {
        state: {
          senderAccount: account1,
          recipientAccount: account2,
          amount: parseInt(initial),
        }
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      setValidationMessage(error.message || 'Failed to send OTP');
    }
  };

  return (
    <div>
      <h1 className='ho'>Create Your <span>New</span> Account!</h1>
      <div className='header'>
        <div className='main1'>
          <img src={logo} className='imga1' alt="Logo" />
          <div className='heado1'>
            <h1>Welcome</h1>
            <span>Send Money to BFF</span>

            <div className='head-1'>
              <input
                type='text'
                placeholder='Sender Account Number'
                onChange={(e) => setAccount1(e.target.value)}
                value={account1}
              />
            </div>

            <div className='head-2'>
              <input
                type='text'
                placeholder='Recipient Account Number'
                onChange={(e) => setAccount2(e.target.value)}
                value={account2}
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

            <button className='butt' onClick={handleSend}>Transfer</button>
            <button className='butt1' onClick={() => navigate('/Dashboard')}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposite;
