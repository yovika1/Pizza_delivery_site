import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCart } from "../context/CartContext";
import { useOrderNow } from "../utils/OrderUtils";

export const PizzaDashboard = ({ image, name, description, price ,_id}) => {
  const { addToCart } = useCart();
  const orderNow = useOrderNow()


  const handleOrder = () => {
    orderNow([{ image, name, description, price , _id}]); 
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
      <CardMedia
        component="img"
        alt={name}
        image={image}
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
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.9rem", marginTop: "8px" }}>
            {description}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: "12px", color: "#000" }}>
            ₹{price}
          </Typography>
          <Button
            variant="contained"
            onClick={handleOrder}
            color="warning"
            sx={{ marginTop: "12px", borderRadius: "20px", fontWeight: "bold" }}
          >
            Order Now
          </Button>
          <AddCircleIcon
            fontSize="small"
            onClick={() => addToCart({ image, name, description, price, _id })}
            sx={{ display: "flex", mt: "-29px", ml: "80%", cursor: "pointer" }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
