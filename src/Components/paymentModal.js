import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Modal, Box, CircularProgress } from "@mui/material";
import Checkout from "./Checkout";

// Load Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51QkiSYEA5mRI1k8EOU5C8kjxxFqZaKqedSLVyrbHCTnhOaRsLHfzkXyF23BFSTgSm0SqY2IOBxP72qJSH4sWkbIT00kmX2hhXG"
);

const PaymentModal = ({ open, close, price, clientSckey }) => {
  console.log("Client Secret:", clientSckey); 

  const options = clientSckey
    ? { clientSecret: clientSckey }
    : null;

  return (
    <Modal
      open={Boolean(open)}
      onClose={close} 
      aria-labelledby="payment-modal"
      aria-describedby="stripe-payment-form"
    >
      

        {!clientSckey ? (
          <CircularProgress />
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <Checkout open={open} close={close} price={price} />
          </Elements>
        )}
      
    </Modal>
  );
};

export default PaymentModal;
