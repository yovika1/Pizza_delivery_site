import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation for query params
import { Typography, Box, Button, Card, CardContent } from "@mui/material";

export const OrderStatus = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("redirect_status");
    if (status) {
      setPaymentStatus(status);
    }
  }, [location]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ width: 400, borderRadius: 3, boxShadow: 3, p: 2, bgcolor: "white" }}>
        <CardContent>
          {paymentStatus === "succeeded" ? (
            <Typography variant="h5" color="green" textAlign="center">
              🎉 Payment Successful!
            </Typography>
          ) : paymentStatus === "failed" ? (
            <Typography variant="h5" color="red" textAlign="center">
              ❌ Payment Failed. Please try again.
            </Typography>
          ) : (
            <Typography variant="h6" textAlign="center">
              Processing Payment...
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, borderRadius: 2, bgcolor: "#1c1c1c", color: "white" }}
            onClick={() => window.location.href = "/"}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
