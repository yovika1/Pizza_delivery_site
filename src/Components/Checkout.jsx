import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Modal, Box, Button, CircularProgress } from "@mui/material";

function Checkout({ open, close, price }) {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            setProcessing(false);
            return;
        }

        try {
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.href,
                },
            });

            if (result.error) {
                setError(result.error.message);
                console.log(result.error);
            } else {
                console.log("Payment successful!", result);
            }
        } catch (error) {
            setError("Payment failed. Try again.");
            console.error("Error during payment confirmation:", error);
        }

        setProcessing(false);
    };

    return (
        <Modal open={open} onClose={close} aria-labelledby="payment-modal">
            <Box
                sx={{
                    width: 400,
                    bgcolor: "white",
                    p: 3,
                    mx: "auto",
                    borderRadius: 2,
                    boxShadow: 24,
                    textAlign: "center",
                }}
            >
                <h2 id="payment-modal">Complete Payment</h2>

                <form onSubmit={handleSubmit}>
                    <PaymentElement />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? <CircularProgress size={24} /> : "Pay Now"}
                    </Button>

                    {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                </form>
            </Box>
        </Modal>
    );
}

export default Checkout;
