import React, { useState, useEffect } from 'react';

const PaymentForm = ({ userData }) => {
  const [amount, setAmount] = useState(''); // Amount to be paid
  const [cardNumber, setCardNumber] = useState(''); // Card number
  const [cardExpiry, setCardExpiry] = useState(''); // Expiration date (MM/YY)
  const [cardCvc, setCardCvc] = useState(''); // CVC
  const [message, setMessage] = useState(''); // Success or error message
  const [loading, setLoading] = useState(false); // Loading state for simulating payment processing
  const [balance, setBalance] = useState(userData.balance); // User's balance from MongoDB

  useEffect(() => {
    // Set the initial balance from the user data (if available)
    setBalance(userData.balance);
  }, [userData]);

  // Handle form submission (payment processing)
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Validate if the entered amount is greater than the user's balance
    if (parseFloat(amount) > balance) {
      setMessage(`Payment failed. You do not have enough funds (Your balance is $${balance}).`);
      setLoading(false);
      return;
    }

    // Simulate payment processing with a delay
    setTimeout(() => {
      // Success or failure based on input validation
      if (
        amount &&
        cardNumber.length === 19 && // 16 digits + 3 spaces = 19 characters
        cardExpiry.length === 5 && // MM/YY format
        cardCvc.length === 3
      ) {
        setMessage(`Payment of $${amount} was successful!`);
      } else {
        setMessage('Payment failed. Please check your card details.');
      }
      setLoading(false); // Stop loading after the payment is processed
    }, 2000); // Simulate network delay (2 seconds)
  };

  // Function to format card number with spaces after every 4 digits
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    value = value.substring(0, 16); // Limit to 16 digits

    // Format the value with spaces after every 4 digits
    let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    setCardNumber(formattedValue); // Set the formatted card number
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <form onSubmit={handlePaymentSubmit}>
        {/* Amount input */}
        <div>
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Card Number input */}
        <div>
          <label>Card Number</label>
          <input
            type="text"
            placeholder="Enter card number"
            value={cardNumber}
            onChange={handleCardNumberChange} // Call the function to format the card number
            maxLength="19" // 16 digits + 3 spaces = 19 characters
            required
          />
        </div>

        {/* Expiration Date input */}
        <div>
          <label>Expiration Date (MM/YY)</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
            maxLength="5" // MM/YY format
            required
          />
        </div>

        {/* CVC input */}
        <div>
          <label>CVC</label>
          <input
            type="text"
            placeholder="Enter CVC"
            value={cardCvc}
            onChange={(e) => setCardCvc(e.target.value)}
            maxLength="3" // Allow only 3 digits
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>

      {/* Display result message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentForm;
