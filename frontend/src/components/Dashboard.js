// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/account', {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      setUser(data);
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      {user && <p>Balance: ${user.balance}</p>}
    </div>
  );
};

export default Dashboard;
