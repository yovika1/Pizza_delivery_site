import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { PizzaDashboard } from "./PizzaDashboard";
import { Header } from "./Header";
import { Footer } from "./Footer";
import axios from "axios";

export const PizzaCard = () => {
  const [pizzas, setPizzas] = useState([])
  useEffect (()=>{
    fetchPizzas()
  },[])

  const fetchPizzas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getting-pizza");
      setPizzas(response.data);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          p: 4,
          borderRadius: 20,
          height: "150vh",
          cursor: "pointer",
          background:
            "radial-gradient(circle at bottom right, rgba(225, 178, 162, 0.47) 10%, rgba(155, 95, 39, 0.54) 25%, transparent 50%)",
        }}
      >
        <Grid container spacing={4}>
          {pizzas.map((pizza, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              sx={{
                marginTop: index % 2 === 0 ? "100px" : 0,
              }}
            >
              <PizzaDashboard {...pizza} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};
