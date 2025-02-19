import React from "react";
import { useCart } from "../context/CartContext";
import { Card, CardContent, Typography, Button, Box, CardMedia } from "@mui/material";
import { OrderNow } from "../utils/OrderUtils";

export const CartSection = ({image, name, description, price}) => {
  const { cartItems, getTotalPrice, updateQuantity, removeFromCart } = useCart();

  const handleOrderNow = OrderNow();
  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card key={item._id} sx={{ marginBottom: 4, padding: 2 }}>
              <CardContent >
              <CardMedia
                            component="img"
                            image={item.image}
                            alt={item.name}
                            sx={{
                              height: 40,
                              width: 40,
                              borderRadius: "8px",
                              marginRight: 2,
                            }}
                          />
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">Price: ₹{item.price}</Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                
                <Box sx={{ display: "flex", gap: "8px", marginTop: "10px", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ minWidth: "30px", padding: "5px" }}
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: "30px", padding: "5px" }}
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ minWidth: "30px", padding: "5px", backgroundColor: "#d32f2f" }}
                    onClick={() => removeFromCart(item._id)}
                  >
                    🗑️
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
          <h3>Total Price: ₹{getTotalPrice().toFixed(2)}</h3>
          <Button 
          onClick={() => handleOrderNow(image, name, description, price)}
          variant="contained"
        >Place Order</Button>
        </>
      )}
    </div>
  );
};

