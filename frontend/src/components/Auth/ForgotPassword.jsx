import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/forgot-password', { email }); // Replace with your API endpoint
      setMessage(response.data.message); // Display success message
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Error sending reset email.');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Reset Password</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ForgotPassword;