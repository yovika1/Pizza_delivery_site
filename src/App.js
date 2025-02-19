import "./index.css";
import {BrowserRouter} from "react-router-dom";
import { Auth } from "./Routes/Routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import io from "socket.io-client";
import { CartProvider } from "./context/CartContext";
// const socket = io.connect("http://localhost:8000");
function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFCC80B3", 
      },
      secondary: {
        main: "#ffd54f", // Warm yellow for accents
      },
      background: {
        default: "#fff9e6", // Light cream for a subtle pizza vibe
        paper: "##FFCC80B3", // Paper background for cards
      },
    },
    typography: {
      fontFamily: "Poppins, Arial", // Clean and modern typography
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        color: "#000000",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 500,
      },
      body1: {
        fontSize: "1rem",
        color: "#4f4f4f",
      },
    },
  });
  
  return (
    // <Box display={"flex"} justifyContent={{ sm: "center" ,md : "end" }}>
    //   <Login/>
    //    {/* <Typography as={"span"} fontSize={"67px"}>eertert</Typography>  */}
    // </Box>
    <CartProvider>
  <BrowserRouter>
  <ThemeProvider theme={theme}>
  <Auth/>
  </ThemeProvider>
  </BrowserRouter>
  </CartProvider>
  );
}

export default App;
