 
 import React from 'react';
import { Box, Typography } from '@mui/material';
import chefImage from '../media/chef.png';

 
 export const Header = () => {
   return (
    <Box sx={{ bgcolor: '#f5f5f5', }}>

    <Box
     display="flex" 
     justifyContent="space-between"
     alignItems="center"
      pl={5}
      sx={{
        background: 'linear-gradient( rgba(255, 204, 128, 0.7),rgba(155, 95, 39, 0.73))',
        borderRadius: 2,
        mb: 2,
        mt: 2,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
        color: 'white',
      }}
>
      <Box>
        <Typography variant="h6" fontWeight="bold" fontSize={50} mb={1}>
          Eat Fresh Pizza
        </Typography>
        <Typography variant="body2" fontSize={30}>🔥 Fast Delivery</Typography>
        <Typography variant="body2" fontSize={30}>🌟 Near For You</Typography>
      </Box>
      <img src={chefImage} alt="Chef" style={{ borderRadius: '50%', height:"50vh"}} />
    </Box>
    </Box>
       )
 }
 
