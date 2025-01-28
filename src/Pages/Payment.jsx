import React from 'react';
import { Button, Container, Typography, TextField, Box } from '@mui/material';
import { useState } from 'react';

export const PizzaPayment = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayment = () => {
    if (!name || !email || !phone || !amount) {
      alert('Please fill in all fields.');
      return;
    }

    const options = {
      key: 'rzp_test_yourKeyHere', // Replace with your Razorpay API key
      amount: amount * 100, // Convert to smallest currency unit
      currency: 'INR',
      name: 'Pizza Delivery',
      description: 'Payment for your pizza order',
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      notes: {
        address: 'Pizza Delivery Service',
      },
      theme: {
        color: '#f44336',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Pizza Payment
      </Typography>
      <Box component="form" noValidate autoComplete="off" mb={2}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Amount (INR)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handlePayment}
      >
        Pay Now
      </Button>
    </Container>
  );
};
