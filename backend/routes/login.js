// backend/routes/login.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User'); // Assuming you have a User model
const jwt = require('jsonwebtoken'); // To generate a token
const router = express.Router();

router.post('/api/login', async (req, res) => {
  const { id, email } = req.body;

  // Check if the user exists with the provided id and email
  const user = await User.findOne({ _id: id, email: email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });  // Invalid user or email
  }

  // If user exists, generate a JWT token (optional)
  const token = jwt.sign({ userId: user._id }, 'your-jwt-secret', { expiresIn: '1h' });

  // Return the token as a response
  res.json({ token });
});

module.exports = router;
