import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import corn_Cheese from "../media/Corn_&_Cheese.jpg";

export const PizzaDashboard = ({ orderId, totalPrice}) => {
  // const navigate = useNavigate();
 

    const handlePayment = async () => {
      const usdToInr = 83; // Static exchange rate
      const amountInDollars = 98; // Amount in USD from user input
      const amountInRupees = amountInDollars * usdToInr; // Convert USD to INR
      const amountInPaise = Math.round(amountInRupees * 100);
      try {
        const response= await axios.post("http://localhost:8000/create-checkout-session", {
          orderId,                        
          amount: amountInPaise,
          body: JSON.stringify({ amount: amountInDollars }),
          
        });
        console.log(response)
        if(response.data && response.data.url){
          window.location.href = response.url;

        }else{
          console.error("Stripe session URL not found in response");
          
        }
      } catch (error) {
        console.error("Error creating Stripe session:", error);
      }
    };

  return (
    <Box
      sx={{
        position: "relative",
        width: "250px",
        margin: "0 11px",
        height: "300px", 
        overflow: "visible",
        "&:hover .card": {
          transform: "translateY(20px)",
          opacity: 1, 
          transition: "all 0.5s ease-in-out",
        },
      }}
    >
      {/* Pizza Image */}
      <CardMedia
        component="img"
        alt="Pepperoni Pizza"
        image={corn_Cheese}
        sx={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#fff",
          zIndex: 2,
        }}
      />

      <Card
        className="card"
        sx={{
          width: "100%",
          borderRadius: "40px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          paddingTop: "80px",
          backgroundColor: "rgba(255, 204, 128, 0.7)",
          position: "absolute",
          top: "90px",
          left: 0,
          opacity: 0,
          transform: "translateY(-50px)", 
          transition: "all 0.5s ease-in-out",
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Pepperoni Pizza
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.9rem", marginTop: "8px" }}
          >
            🍕 Pepperoni pizza, Margarita Pizza Margherita Italian cuisine Tomato
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginTop: "12px", color: "#000" }}
          >
            $29
          </Typography>
          <Button
            variant="contained"
            onClick={handlePayment}
            color="warning"
            sx={{
              marginTop: "12px",
              borderRadius: "20px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Order Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PizzaDashboard;
