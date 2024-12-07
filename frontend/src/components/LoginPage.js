// src/components/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [id, setId] = useState('');  // User ID (document _id)
  const [email, setEmail] = useState('');  // User email
  const navigate = useNavigate();  // To navigate to another page after login

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Sending the id and email to the backend for validation
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, email }),  // Send ID and email
    });

    // Check the response from the backend
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);  // Store token in localStorage (or cookies)
      navigate('/account');  // Redirect to account overview page
    } else {
      alert('Invalid credentials');  // Show error if the credentials are invalid
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>User ID:</label>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
