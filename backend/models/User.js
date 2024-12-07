// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 }
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
