  
  import React from 'react'
  import { Box, Grid } from '@mui/material';
import { PizzaDashboard } from './PizzaDashboard';
import { pizzas } from '../context/Cart';
import { Header } from './Header';
import { Footer } from './Footer';
  
  export const PizzaCard = () => {
    return (
        <>
        <Header/>
      <Box sx={{ p: 4,
      borderRadius:20,
      // marginTop:20,
      height:'150vh',
      cursor:"pointer",
      background: "radial-gradient(circle at bottom right, rgba(225, 178, 162, 0.47) 10%, rgba(155, 95, 39, 0.54) 25%, transparent 50%)",
}}>
        <Grid container spacing={4}>
          {pizzas.map((pizza, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}
            sx={{
              marginTop: index % 2 === 0 ? "100px": 0,
            }}
            >
              <PizzaDashboard
                image={pizza.image}
                name={pizza.name}
                description={pizza.description}
                price={pizza.price}
              />
            </Grid>
          ))}
        </Grid>

      </Box>
        <Footer/>
        </>
    );
  };
  
  