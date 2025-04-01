import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CustomPizzaBuilder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [pizzaBase, setPizzaBase] = useState("");
  const [pizzaSauce, setPizzaSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [veggies, setVeggies] = useState([]);

  const navigate = useNavigate();

  const steps = ["Choose Pizza Base","Choose Pizza Sauce","Select Cheese","Choose Veggies","Confirm Pizza",
  ];

  const prices = {
    bases: {
      "Thin Crust": 100,
      "Thick Crust": 120,
      "Gluten-Free": 140,
      "Cheese Stuffed": 160,
      "Whole Wheat": 110,
    },
    sauces: {
      "Tomato Sauce": 50,
      Pesto: 60,
      Barbecue: 70,
      "White Sauce": 55,
      "Buffalo Sauce": 65,
    },
    cheeses: {
      Mozzarella: 80,
      Cheddar: 85,
      Parmesan: 90,
      "Vegan Cheese": 100,
      Ricotta: 95,
    },
    veggies: {
      Mushrooms: 30,
      Peppers: 25,
      Onions: 20,
      Olives: 35,
      Spinach: 30,
      Tomatoes: 25,
    },
  };

  // **Calculate total price dynamically**
  const calculateTotalPrice = () => {
    let total =
      (pizzaBase ? prices.bases[pizzaBase] : 0) +
      (pizzaSauce ? prices.sauces[pizzaSauce] : 0) +
      (cheese ? prices.cheeses[cheese] : 0) +
      veggies.reduce((sum, veg) => sum + prices.veggies[veg], 0);
    return total;
  };

  const handlePizzaBaseChange = (event) =>{
    console.log("Selected Base:", event.target.value);
    setPizzaBase(event.target.value);
  }
  const handlePizzaSauceChange = (event) => setPizzaSauce(event.target.value);
  const handleCheeseChange = (event) => setCheese(event.target.value);

  // **Handle veggie selection**

  const handleVeggiesChange = (event) => {
    const value = event.target.value;
    setVeggies((prevVeggies) =>
      prevVeggies.includes(value)
        ? prevVeggies.filter((veggie) => veggie !== value) 
        : [...prevVeggies, value] 
    );
  };

  const handlOrder = async () => {
    if (activeStep === steps.length - 1) {

      const customOrderData = {
        pizzaBase,
        pizzaSauce,
        cheese,
        veggies,
        totalPrice: calculateTotalPrice(),
      }
      console.log("Order Data Being Sent:", customOrderData);


      try {
        const response = await axios.post("http://localhost:8000/create-pizza-builder",customOrderData)
        
        
        if (response.status === 201) {
          console.log("Pizza Order Created:", response.data);
          localStorage.setItem("pizzaPrice", JSON.stringify(customOrderData.totalPrice));
          navigate("/order-details?hidesummary=true");
          setActiveStep((prev) => prev + 1);
          }
      } catch (error) {
        console.error("Error creating pizza order:", error);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };
  

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        backgroundColor: "#fff",
        borderRadius: 3,
        boxShadow: 6,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#3c3c3c" }}
      >
        Customize Your Pizza
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <Paper sx={{ padding: 3, textAlign: "center", backgroundColor: "#f1f8e9" }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: "#388e3c" }}>
            Pizza Created Successfully!
          </Typography>
          <Typography variant="h6">Total Price: ₹{calculateTotalPrice()}</Typography>
          <Button
            variant="outlined"
            color="success"
            onClick={() => navigate("/")}
            sx={{ paddingX: 3, paddingY: 1, marginTop: 2 }}
          >
            Back to Customization
          </Button>
        </Paper>
      ) : (
        <Box sx={{ marginTop: 3 }}>
          {activeStep === 0 && (
            <FormControl component="fieldset" fullWidth>
              <FormLabel>Choose Pizza Base</FormLabel>
              <RadioGroup value={pizzaBase} onChange={handlePizzaBaseChange}>
                {Object.keys(prices.bases).map((base) => (
                  <FormControlLabel
                    key={base}
                    value={base}
                    control={<Radio />}
                    label={`${base} - ₹${prices.bases[base]}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {activeStep === 1 && (
            <FormControl component="fieldset" fullWidth>
              <FormLabel>Choose Pizza Sauce</FormLabel>
              <RadioGroup value={pizzaSauce} onChange={handlePizzaSauceChange}>
                {Object.keys(prices.sauces).map((sauce) => (
                  <FormControlLabel
                    key={sauce}
                    value={sauce}
                    control={<Radio />}
                    label={`${sauce} - ₹${prices.sauces[sauce]}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {activeStep === 2 && (
            <FormControl component="fieldset" fullWidth>
              <FormLabel>Select Cheese</FormLabel>
              <RadioGroup value={cheese} onChange={handleCheeseChange}>
                {Object.keys(prices.cheeses).map((cheeseOption) => (
                  <FormControlLabel
                    key={cheeseOption}
                    value={cheeseOption}
                    control={<Radio />}
                    label={`${cheeseOption} - ₹${prices.cheeses[cheeseOption]}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {activeStep === 3 && (
            <FormControl component="fieldset" fullWidth>
              <FormLabel>Choose Veggies</FormLabel>
              {Object.keys(prices.veggies).map((veggie) => (
                <FormControlLabel
                  key={veggie}
                  value={veggie}
                  control={<Checkbox checked={veggies.includes(veggie)} onChange={handleVeggiesChange} />}
                  label={`${veggie} - ₹${prices.veggies[veggie]}`}
                />
              ))}
            </FormControl>
          )}

          {activeStep === 4 && (
            <Box sx={{ textAlign: "center", marginTop: 3 }}>
              <Typography variant="h6">Confirm Your Pizza:</Typography>
              <Typography>Base: {pizzaBase} - ₹{pizzaBase ? prices.bases[pizzaBase] : 0}</Typography>
              <Typography>Sauce: {pizzaSauce} - ₹{pizzaSauce ? prices.sauces[pizzaSauce] : 0}</Typography>
              <Typography>Cheese: {cheese} - ₹{cheese ? prices.cheeses[cheese] : 0}</Typography>
              <Typography>
                Veggies: {veggies.join(", ")} - ₹
                {veggies.reduce((total, veg) => total + prices.veggies[veg], 0)}
              </Typography>
              <Typography variant="h5">Total Price: ₹{calculateTotalPrice()}</Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
            <Button onClick={() => setActiveStep((prev) => prev - 1)} disabled={activeStep === 0}>
              Back
            </Button>
            <Button onClick={handlOrder}>
              {activeStep === steps.length - 1 ? "PlaceOrder" : "Next"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
