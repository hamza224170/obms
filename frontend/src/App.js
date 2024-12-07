import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PaymentForm from './components/PaymentForm';  // Your payment form component
import Dashboard from './components/Dashboard';    // Your other component (Dashboard)
import LoginPage from './components/LoginPage';    // Your Login Page
import AccountOverview from './components/AccountOverview'; // Your Account Overview Page

const App = () => {
  const [userData, setUserData] = useState(null);  // State to store user data
  const [error, setError] = useState(null);  // State to handle errors

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/account', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);  // Update the state with the fetched user data
      } catch (error) {
        setError(error.message);  // Update the state with the error message
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;  // Show loading until data is fetched
  }

  return (
    <Router>
      <div>
        {/* Navigation Buttons */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/payment">Payment</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/account">Account Overview</Link>
            </li>
          </ul>
        </nav>

        {/* User details */}
        <div>
          <h3>User Info</h3>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Balance:</strong> ${userData.balance}</p>
        </div>

        {/* Routes to different pages */}
        <Routes>
          <Route path="/" element={<h2>Welcome to the homepage!</h2>} />
          <Route path="/payment" element={<PaymentForm userData={userData} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountOverview />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
