import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
// import { SignUp } from '../Pages/SignUp';
import Cookies from "js-cookie";
import { OTPInput } from "../Pages/OtpSend";
import { Home } from "../Pages/Home";
import { CustomPizzaBuilder } from "../Components/CustomPizza";
import { PizzaPayment } from "../Pages/Payment";
// import OTPInput from '../Components/OtpSend';

export const Auth = () => {
  const isAuthenticated = Cookies.get("token") || false;
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Home />}></Route>
          <Route path="/custom-pizza" element={<CustomPizzaBuilder />} />
          <Route path="/payment" element={<PizzaPayment />} />
          <Route path="/*" element={<Navigate to={"/"}/>}/>
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/otp" element={<OTPInput />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path='/signup' element={<SignUp/>}/> */}
        </>
      )}
    </Routes>
  );
};
