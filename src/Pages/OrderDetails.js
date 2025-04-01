import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Divider,
  Button,
  Card,
  CardContent,
  TextField,
  List,
  ListItem,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import PaymentModal from "../Components/paymentModal";
import { OrderStatus } from "./OrderStatus";
import { useLocation } from "react-router-dom";

export const OrderDetails = ({hideSummary}) => {
  const [orderData, setOrderData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    address: "",
    subtotal: 0,
    grandTotal: 0,
    items: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setdata] = useState([]);
  const [clinetID, setClinetId] = useState("");
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0)
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hideSummaryUrl = queryParams.get('hidesummary') === 'true';
  const shouldHideSummary = hideSummary || hideSummaryUrl;
 

  // ✅ Fixed Quantity Update Logic
  const updateQuantity = (id, change) => {
    setdata((prevData) => {
      const updatedData = prevData.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, (item?.quantity || 1) + change) }
          : item
      );

      localStorage.setItem("pizza", JSON.stringify(updatedData));
      // console.log("Updated Local Storage:", updatedData);
      return updatedData;
    });
  };

 const handlePayment = async () => {

  const isCustomPizza = !data.length;
  console.log('custom*****',isCustomPizza)
  try {

    const orderResponse = {
      ...orderData,
      grandTotal: totalPrice || orderData.subtotal,
      ...(isCustomPizza ? {} :{items:data} ),
    }
    const response = await axios.post("http://localhost:8000/createOrder",orderResponse)

    console.log(response);
    setClinetId(response.data.intent.client_secret);
  } catch (error) {
    setError("Payment error: " + error.message);
  }
};


  useEffect(() => {
    if (data.length > 0) {
      const subtotal = data.reduce(
        (acc, item) => acc + item.price * (item?.quantity || 1),
        0
      );

      setOrderData((prev) => ({
        ...prev,
        totalPrice,
        items: data,
        subtotal,
        grandTotal: subtotal,
      }));
    }
  }, [data]);

  useEffect(() => {
    if (clinetID) {
      setOpen(true);
    }
  }, [clinetID]);

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("pizza");
    console.log("Fetched from Local Storage:", storedData);
  
    if (storedData) {
      const parsedData = JSON.parse(storedData).map(item => ({
        ...item,
        quantity: item?.quantity || 1, 
      }));
      setdata(parsedData);
    }
    setLoading(false);
  }, []);
  
  // get for only price from customPizza

    useEffect(()=>{
      const storedPrice = localStorage.getItem("pizzaPrice");

       if (storedPrice) {
        setTotalPrice(JSON.parse(storedPrice));
       }
       setLoading(false);
    },[])

  useEffect(() => {
    console.log("Updated Order Data:", data);
    setLoading(false);
  }, [data]);

  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("redirect_status");
    if (status) {
      setPaymentStatus(status);
    }
  }, [location]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      {paymentStatus == null && (
        <Card sx={{ width: 350, borderRadius: 3, boxShadow: 3, p: 2, bgcolor: "white" }}>
          <CardContent>
            {loading ? (
              <Typography variant="h6" textAlign="center">Loading...</Typography>
            ) : error ? (
              <Typography variant="h6" color="error" textAlign="center">{error}</Typography>
            ) : orderData ? (
              <>
              {!shouldHideSummary && (
              <>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Order Summary</Typography>
                <List dense>
                  {data?.length > 0 ? (
                    data?.map((item) => (
                      <ListItem key={item._id} sx={{ display: "flex", justifyContent: "center" }}>
                        <Card sx={{ display: "flex", alignItems: "center", width: "100%", maxWidth: 400, padding: 2 }}>
                          <CardMedia
                            component="img"
                            image={item.image}
                            alt={item.name}
                            sx={{ height: 80, width: 80, borderRadius: "8px", marginRight: 2 }}
                          />
                          <CardContent sx={{ flex: "1" }}>
                            <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                            <Typography variant="body2" color="textSecondary">Price: ₹{item.price}</Typography>
                            <Typography variant="body2" color="textSecondary" display="flex">
                              Quantity:
                              <Button sx={{ marginRight: "-16px" }} color="black" onClick={() => updateQuantity(item._id, -1)}>-</Button>
                              {item?.quantity || 1 }
                              <Button color="black" onClick={() => updateQuantity(item._id, 1)}>+</Button>
                            </Typography>
                          </CardContent>
                        </Card>
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">No items in Order</Typography>
                  )}
                </List>
                <Divider sx={{my:2}}/>
                </>
                )}
                <TextField fullWidth label="Name" name="name" value={orderData?.name} onChange={handleChange} margin="dense" />
                <TextField fullWidth label="Phone Number" name="contactNumber" value={orderData?.contactNumber} onChange={handleChange} margin="dense" />
                <TextField fullWidth label="Email" name="email" value={orderData?.email} onChange={handleChange} margin="dense" />
                <TextField fullWidth label="Address" name="address" value={orderData?.address} onChange={handleChange} margin="dense" />

                <Divider sx={{ my: 2 }} />
                {!totalPrice &&<Box display="flex" justifyContent="space-between" my={1}>
                  <Typography variant="body2" color="textSecondary">Subtotal (INR)</Typography>
                  <Typography variant="body2" fontWeight="bold">₹{ orderData?.subtotal }</Typography>
                </Box>}
                <Box display="flex" justifyContent="space-between" my={1}>
                  <Typography variant="h6" fontWeight="bold">Grand Total</Typography>
                  <Typography variant="h6" fontWeight="bold">₹{ totalPrice|| orderData?.grandTotal }</Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: "#1c1c1c",
                    color: "white",
                    "&:hover": { bgcolor: "#333" },
                  }}
                  onClick={handlePayment}
                >
                  {loading ? "Placing Order.." : "Pay and Reserve"}
                </Button>
              </>
            ) : (
              <Typography variant="h6" textAlign="center">No order data available.</Typography>
            )}
          </CardContent>
        </Card>
      )}
      {clinetID && (
        <PaymentModal clientSckey={clinetID} open={open} close={() => setOpen(false)} price={ totalPrice|| orderData?.grandTotal} />
      )}
      {paymentStatus != null && <OrderStatus />}
    </Box>
  );
};