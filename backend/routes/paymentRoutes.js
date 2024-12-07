// backend/routes/paymentRoutes.js

const express = require('express');
const stripe = require('stripe')('your-stripe-secret-key');
const router = express.Router();

// Payment processing route
router.post('/', async (req, res) => {
  const { amount, token } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount: amount * 100, // amount in cents
      currency: 'usd',
      source: token,
      description: 'Bank deposit',
    });
    res.status(200).send('Payment successful');
  } catch (err) {
    res.status(500).send('Payment failed');
  }
});

module.exports = router;
