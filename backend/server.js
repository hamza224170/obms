const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');  // Import jwt for generating tokens

// User Schema (adjust this schema as needed for your app)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  balance: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);

// Initialize Express app
const app = express();

// Middleware to handle CORS and parse JSON requests
app.use(cors());
app.use(express.json());

// MongoDB connection string (replace with your actual credentials)
const mongoURI = 'mongodb+srv://hamza:224170@cluster0.ei2js.mongodb.net/obms_db?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// API endpoint to fetch user data
app.get('/api/account', async (req, res) => {
  try {
    // Fetch a user by email (for account overview)
    const user = await User.findOne({ email: 'testuser@example.com' });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prepare response, ensuring the correct format of data
    const userData = {
      email: user.email,
      balance: user.balance,
      _id: user._id.toString(),  // Convert ObjectId to string for easy use in frontend
    };

    // Send the user data as JSON
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
});

// API endpoint for login (authenticate user by ID and email)
app.post('/api/login', async (req, res) => {
  const { id, email } = req.body;

  try {
    // Check if the user exists with the provided ID and email
    const user = await User.findOne({ _id: id, email: email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });  // Invalid login attempt
    }

    // If valid, generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-jwt-secret', { expiresIn: '1h' });  // 1 hour expiration

    // Return the token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

// Start the backend server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
