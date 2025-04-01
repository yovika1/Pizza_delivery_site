import { AccountCircle, Home, ShoppingCart } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Footer = () => {
  const { cartItems } = useCart();

  const navigate = useNavigate();
  const handleLogOut = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <Box sx={{ backgroundColor: "#FAFAFA" }}>
      <BottomNavigation
      
        sx={{
          mt: 2,
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 5,
          backgroundColor: "#FAFAFA",
          marginLeft: -2,
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction
          onClick={() => navigate("/order")}
          label="Cart"
          icon={
            <Box sx={{ position: "relative" }}>
              <ShoppingCart />
              {cartItems.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  {cartItems.length}
                </Box>
              )}
            </Box>
          }
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircle />}
          onClick={handleLogOut}
        />
      </BottomNavigation>
    </Box>
  );
};
