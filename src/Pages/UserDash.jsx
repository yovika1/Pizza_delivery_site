import "../App.css"; // Import the CSS file
import React from "react";
import {Box,Grid,Typography,Card,CardContent,Button,Avatar,AppBar,Toolbar,IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import pizzaVideo from "../media/pizza.mp4"; 
// import { PizzaDashboard } from "../Components/PizzaDashboard";
import { PizzaCard } from "../Components/PizzaCard";
import { useNavigate } from "react-router-dom";

 export const UserDashBoard = () => {
  const navigate = useNavigate();


  return (
    <>
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <video
        className="sliding-video" 
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zindex: -1,
          animation: "slide 80s linear infinite",
        }}
      >
        <source src={pizzaVideo} type="video/mp4" />
      </video>

      {/* Navbar */}
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pizza Delight Dashboard
          </Typography>
          
        </Toolbar>
      {/* </AppBar> */}

      {/* Header Section */}
      <Box textAlign="center" sx={{ py: 5, color: " rgba(255, 204, 128, 0.7)" }}>
        <Typography variant="h1">Welcome to Pizza Delight!</Typography>
        <Typography variant="h3" color="secondary">
          Manage your orders, customize pizzas, and delight your customers!
        </Typography>
      </Box>

      {/* Dashboard Cards */}
   


        {/* Custom Pizza Card */}
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            sx={{
              background: "rgba(181, 167, 157, 0.9)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              margin:"0 28px",
            }}
          >
            <CardContent>
              <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
                <ShoppingCartIcon fontSize="large" />
              </Avatar>
              <Typography variant="h2">Customize</Typography>
              <Typography variant="body1" sx={{ my: 2 }}>
                Create custom pizzas for your customers. Choose toppings, base,
                and sauces!
              </Typography>
              <Button
              onClick={() => navigate("/custom-pizza")}
              variant="contained" color="primary">
                Customize Pizza
              </Button>
            </CardContent>
          </Card>
        </Grid>
    </Box>
    <PizzaCard/>
    </>
  );
};

