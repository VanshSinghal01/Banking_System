import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './otpimg.png';
import { arr } from './arr';

const ConfirmOtp = () => {
  const [otp, setOtp] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
    const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { senderAccount, recipientAccount, amount } = location.state || {};

  const handleConfirm = async () => {
    setValidationMessage('');
    setLoading(true);

    if (!otp) {
      setValidationMessage('Please enter the OTP.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3500/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          senderAccount,
          recipientAccount,
          amount,
          otp
        })
      });

      const data = await response.json();

      if (response.ok) {
        setValidationMessage(data.message);
        setTimeout(() => {
          navigate('/Dashboard');
        }, 2000);
      } else {
        setValidationMessage(data.message || 'Transaction failed');
      }
    } catch (error) {
      console.error('Error confirming OTP:', error);
      setValidationMessage('An unexpected error occurred');
    }finally {
        setLoading(false);
      }
  };

  return (
    <div>
         <h2 className="ho">OTP Verification</h2>
    <div className='header'>
      <div className='main1'>
      <img src={logo} className="imga2" alt="Logo" />
        <div className='head1'>
        <h1>Welcome</h1>
        <span>Verify Your OTP</span>
        {/* <label className="label">Enter OTP:</label> */}
          <div className='head-1'>
            <input
              type='text'
              value={otp}
              placeholder='Enter OTP'
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          {validationMessage && <p className='validation-message'>{validationMessage}</p>}

          <button className='butt' onClick={handleConfirm}> 
          {loading ? 'Verifying...' : 'Confirm Transfer'}
          </button>
          <button className='butt1' onClick={() => navigate('/Deposite')}>Back</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ConfirmOtp;
