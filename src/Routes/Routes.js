import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
// import { SignUp } from '../Pages/SignUp';
import Cookies from "js-cookie";
import { OTPInput } from "../Pages/OtpSend";
import { Home } from "../Pages/Home";
import { CustomPizzaBuilder } from "../Components/CustomPizza";
import { OrderDetails } from "../Pages/OrderDetails";
// import {Order} from '../Pages/Order' 
import { CartSection } from "../Pages/CartSection";
import { OrderStatus } from "../Pages/OrderStatus";
// import OTPInput from '../Components/OtpSend';

export const Auth = () => {
  const isAuthenticated = Cookies.get("token") || false;
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Home />}></Route>
          <Route path="/custom-pizza" element={<CustomPizzaBuilder />} />
          <Route path="/order" element={<CartSection/>} />

          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/order-status" element={<OrderStatus />} />
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
