import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

 export const OTPInput = ({ email, onClose }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [enteredOtp, setEnteredOtp] = useState(false); // Show OTP UI after OTP is sent

  const handleChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(0, 1); // Ensure only one digit is entered
    setOtp(updatedOtp);

    // Automatically move focus to the next field
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerify = async () =>{
    try {
      const verifyResponse = await axios.post("http://localhost:8000/verify",{
          Email: email,
          OTP:otp,
      })
      if(verifyResponse?.status ===200){
        localStorage.setItem("token",verifyResponse?.data?.token);
        onclose();
      }
    } catch (error) {
        console.error("Error verifying OTP", error);
        
      
    }
  };

  const handleResendOtp  = async () => {
    try {
      // Simulate sending OTP
      const response = await axios.post("http://localhost:8000/login", {
        Email: email,
      });
      setEnteredOtp(response?.data?.isOtpSent || true); // Show OTP UI after response
      console.log(response);

    } catch (error) {
      console.log("Error fetching OTP", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to bottom, red, black)",
        padding: 2,
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "white",
          marginBottom: 3,
          textAlign: "center",
        }}
      >
        Enter the OTP sent to your Email
      </Typography>

      {/* OTP Inputs */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        {otp.map((digit, index) => (
          <TextField
            key={index}
            id={`otp-input-${index}`}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "24px",
                padding: "10px",
                color: "white",
              },
            }}
            sx={{
              width: 50,
              height: 50,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "lightgray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "red",
                },
              },
            }}
          />
        ))}
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleVerify}
        sx={{
          backgroundColor: "red",
          color: "white",
          width: 120,
          height: 40,
          marginTop: 2,
          "&:hover": {
            backgroundColor: "darkred",
          },
        }}
      >
        Submit
      </Button>

      {/* Resend OTP */}
      <Typography
        variant="body2"
        sx={{
          color: "lightgray",
          marginTop: 2,
        }}
      >
        Didn't receive the OTP?{" "}
        <Button
          onClick={handleResendOtp}
          sx={{
            color: "red",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "14px",
            padding: 0,
          }}
        >
          Resend
        </Button>
      </Typography>
    </Box>
  );
};

