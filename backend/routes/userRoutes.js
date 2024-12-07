// backend/routes/userRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  res.status(201).send('User created');
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');
  const token = jwt.sign({ userId: user._id }, 'secretKey');
  res.json({ token });
});

// Account Overview
router.get('/account', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Unauthorized');
  const decoded = jwt.verify(token, 'secretKey');
  const user = await User.findById(decoded.userId);
  res.json({ email: user.email, balance: user.balance });
});

module.exports = router;
