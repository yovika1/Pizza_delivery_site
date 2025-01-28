// import React, { useState } from "react";
// import {Box,Typography,TextField,Tooltip,Avatar,Button,Grid,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import axios from "axios";
// import chefImage from "../media/chefboy.png";
// import pizza from "../media/TandooriPaneer-.png";
// import {useNavigate } from "react-router-dom";

// export const Login = () => {
//   const [Email, setEmail] = useState("");
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [otpSent, setOtpSent] = useState(false);
//   const [isSignup, setIsSignup] = useState(false); 
//   const [errorMessage, setErrorMessage] = useState("");
  
//   const [Message, setMessage] = useState("");
//    const navigate = useNavigate()


//   const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const handleOTP = async () => {
//     if (!Email.trim()) {
//       setErrorMessage("Email is required!");
//       return;
//     }
  
//     if (!EmailRegex.test(Email)) {
//       setErrorMessage("Invalid Email format. Please enter a valid Email.");
//       return;
//     }
  
//     try {
//       const response = await axios.post("http://localhost:8000/send-otp", {
//         Email,
//       });
//       console.log(response.data)
//       if(response?.data?.status){
//       if (response?.data?.isUserExist) {
//         setOtpSent(true);
//         setErrorMessage("");
//       } else if (response?.data?.isUserExist === false) {
//         console.log(response?.data?.isUserExistr)
//         setIsSignup(true); 
//         setErrorMessage("This email does not exist. Please sign up.");
//       }
//     }else{
//       alert(response.data.message)
//     }
//     } catch (error) {
//       setErrorMessage("Error sending OTP. Please try again.");
//       console.error(error);
//     }
//   };
  
  
//   const handleSignup = async () => {
//     if (!Email) {
//       setErrorMessage("Email is required for signup.");
//       return;
//     }
  
//     try {
//       const response = await axios.post("http://localhost:8000/send-otp", { Email });
//       console.log(response.data)
//       if (response?.status === 200) {
//         setOtpSent(true);
//         setIsSignup(false);
//         setMessage("OTP sent successfully")
//         setErrorMessage("");
//       }
//     } catch (error) {
//       setErrorMessage("Error during signup. Please try again.");
//       console.error(error);
//     }
//   };
  

//   const handleOtpChange = (value, index) => {
//     const updatedOtp = [...otp];
//     updatedOtp[index] = value.slice(-1); 
//     setOtp(updatedOtp);

//     if (value && index < otp.length - 1) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

//   const handleVerify = async () => {
//     try {
//       const response = await axios.post("http://localhost:8000/verify", { Email: Email, OTP: otp });
//       setMessage(response.data.message);

//       if (response.data.status) {
//         console.log("User is verified.");
//         navigate('/');
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error.response?.data || error.message);
//       setMessage(error.response?.data?.message || "An error occurred.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(to bottom, red, black)",
//         color: "white",
//         textAlign: "center",
//         position: "relative",
//       }}
//     >
//       {/* Chef Image */}
//       <Box
//         sx={{
//           height: { xs: "30vh", sm: "38vh", md: "44vh" },
//           top: { xs: "12vh", sm: 50, md: -81 },
//           position: "absolute",
//         }}
//       >
//         <img
//           src={chefImage}
//           alt="Chef"
//           style={{
//             borderRadius: "50%",
//             width: "100%",
//             height: "100%",
//           }}
//         />
//       </Box>

//       {/* Login/Signup Box */}
//       <Box
//         sx={{
//           width: "300px",
//           padding: "20px",
//           backgroundColor: "rgba(0, 0, 0, 0.7)",
//           borderRadius: "15px",
//           marginTop: 5,
//         }}
//       >
//         <Avatar
//           src={pizza}
//           alt="Pizza"
//           sx={{
//             width: { xs: 66, sm: 80, md: 93 },
//             height: { xs: 50, sm: 70, md: 85 },
//             margin: "0 auto 20px",
//             backgroundColor: "transparent",
//           }}
//         />
//         <Typography>Pizza is waiting to be delivered</Typography>

//         {/* Conditional Rendering */}
//         {!otpSent && !isSignup && (
//           <>
//             <Typography variant="h6" marginTop={2} gutterBottom>
//               Email
//               <Tooltip title="Enter your Email to receive a code" arrow>
//                 <span style={{ marginLeft: "5px", cursor: "pointer" }}>❔</span>
//               </Tooltip>
//             </Typography>
//             <TextField
//               value={Email}
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//               variant="outlined"
//               placeholder="@ Enter Email for OTP"
//               sx={{
//                 input: { color: "white" },
//                 marginBottom: "10px",
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "white" },
//                   "&:hover fieldset": { borderColor: "red" },
//                 },
//               }}
//             />

//             <Button
//               onClick={handleOTP}
//               fullWidth
//               variant="contained"
//               endIcon={
//                 <SendIcon
//                   sx={{
//                     transform: "rotate(-60deg)",
//                     fontSize: 70,
//                     marginLeft: "-11px",
//                   }}
//                 />
//               }
//               sx={{
//                 backgroundColor: "red",
//                 color: "white",
//                 borderRadius: "50%",
//                 width: 60,
//                 height: 60,
//                 minWidth: 0,
//                 margin: "0 auto",
//                 "&:hover": { backgroundColor: "darkred" },
//               }}
//             />
//           </>
//         )}

//         {/* Signup Form */}
//         {isSignup && (
//           <>
//             <Typography variant="h6" marginTop={2} gutterBottom>
//               Email
//             </Typography>
//             <TextField
//               value={Email}
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//               variant="outlined"
//               placeholder="Enter your Email"
//               sx={{
//                 input: { color: "white" },
//                 marginBottom: "10px",
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "white" },
//                   "&:hover fieldset": { borderColor: "red" },
//                 },
//               }}
//             />

//             <Button
//               onClick={handleSignup}
//               fullWidth
//               variant="contained"
//               sx={{
//                 backgroundColor: "blue",
//                 color: "white",
//                 borderRadius: "8px",
//                 width: "100%",
//                 marginTop: "20px",
//                 "&:hover": { backgroundColor: "darkblue" },
//               }}
//             >
//               Signup
//             </Button>
//           </>
//         )}

//         {/* OTP Verification UI */}
//         {otpSent && (
//           <>
//             <Typography variant="h6" marginTop={2} gutterBottom>
//               Enter OTP
//             </Typography>
//             <Grid container spacing={2} justifyContent="center">
//               {otp.map((digit, index) => (
//                 <Grid item key={index}>
//                   <TextField
//                     id={`otp-${index}`}
//                     value={digit}
//                     onChange={(e) => handleOtpChange(e.target.value, index)}
//                     variant="outlined"
//                     inputProps={{
//                       maxLength: 1,
//                       style: {
//                         textAlign: "center",
//                         color: "white",
//                         width: "50px",
//                         fontSize: "20px",
//                       },
//                     }}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         "& fieldset": { borderColor: "white" },
//                         "&:hover fieldset": { borderColor: "red" },
//                       },
//                     }}
//                   />
//                 </Grid>
//               ))}
//             </Grid>

//             <Button
//               onClick={handleVerify}
//               fullWidth
//               variant="contained"
//               sx={{
//                 backgroundColor: "green",
//                 color: "white",
//                 borderRadius: "8px",
//                 width: "100%",
//                 marginTop: "20px",
//                 "&:hover": { backgroundColor: "darkgreen" },
//               }}
//             >
//               Verify OTP
//             </Button>
//           </>
//         )}

//         {errorMessage && (
//           <Typography
//             variant="body2"
//             sx={{
//               color: "red",
//               marginTop: 2,
//             }}
//           >
//             {errorMessage}
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };
