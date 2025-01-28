
import { AccountCircle, Home, ShoppingCart } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import Cookies from "js-cookie"

export const Footer = () => {
  const handleLogOut = () =>{
    Cookies.remove("token");
    window.location.href = "/login";
  }
  return (
      <Box sx={{ backgroundColor: '#FAFAFA'}}>
<BottomNavigation sx={{ mt: 2, position: 'fixed', bottom: 0, width: '100%',zIndex:5, backgroundColor:"#FAFAFA",marginLeft:-2 }}>
<BottomNavigationAction label="Home" icon={<Home />} />
<BottomNavigationAction label="Cart" icon={<ShoppingCart />} />
<BottomNavigationAction label="Profile" icon={<AccountCircle />} 

onClick={handleLogOut}/>
</BottomNavigation>
</Box>  
)
}

