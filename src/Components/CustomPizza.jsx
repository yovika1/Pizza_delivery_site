import React, { useState } from 'react';
import {Box,Stepper,Step,StepLabel,Button,Typography,Radio,RadioGroup,FormControlLabel,FormControl,FormLabel,Grid,Divider,Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

 export const CustomPizzaBuilder =() => {
  const [activeStep, setActiveStep] = useState(0);
  const [pizzaBase, setPizzaBase] = useState('');
  const [pizzaSauce, setPizzaSauce] = useState('');
  const [cheese, setCheese] = useState('');
  const [veggies, setVeggies] = useState([]);
  const navigate = useNavigate();
  const steps = ['Choose Pizza Base', 'Choose Pizza Sauce', 'Select Cheese', 'Choose Veggies', 'Confirm Pizza'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePizzaBaseChange = (event) => {
    setPizzaBase(event.target.value);
  };

  const handlePizzaSauceChange = (event) => {
    setPizzaSauce(event.target.value);
  };

  const handleCheeseChange = (event) => {
    setCheese(event.target.value);
  };

  const handleVeggiesChange = (event) => {
    const value = event.target.value;
    setVeggies((prevVeggies) =>
      prevVeggies.includes(value)
        ? prevVeggies.filter((veggie) => veggie !== value)
        : [...prevVeggies, value]
    );
  };

  const pizzaBaseOptions = ['Thin Crust', 'Thick Crust', 'Gluten-Free', 'Cheese Stuffed', 'Whole Wheat'];
  const pizzaSauceOptions = ['Tomato Sauce', 'Pesto', 'Barbecue', 'White Sauce', 'Buffalo Sauce'];
  const cheeseOptions = ['Mozzarella', 'Cheddar', 'Parmesan', 'Vegan Cheese', 'Ricotta'];
  const veggieOptions = ['Mushrooms', 'Peppers', 'Onions', 'Olives', 'Spinach', 'Tomatoes'];

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, backgroundColor: '#fff', borderRadius: 3, boxShadow: 6 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#3c3c3c' }}>
        Customize Your Pizza
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: 3, color: '#388e3c' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ fontWeight: 'bold', color: '#388e3c' }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <Paper sx={{ padding: 3, textAlign: 'center', backgroundColor: '#f1f8e9' }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#388e3c' }}>
            Pizza Created Successfully!
          </Typography>
          <Button variant="outlined" color="success" onClick={()=>navigate("/")} sx={{ paddingX: 3, paddingY: 1 }}>
            Back to Customization
          </Button>
        </Paper>
      ) : (
        <Box sx={{ marginTop: 3 }}>
          {activeStep === 0 && (
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: 16, color: '#2e3b55' }}>
                Choose Pizza Base
              </FormLabel>
              <RadioGroup value={pizzaBase} onChange={handlePizzaBaseChange}>
                <Grid container spacing={2}>
                  {pizzaBaseOptions.map((base) => (
                    <Grid item xs={12} sm={6} key={base}>
                      <Paper sx={{ padding: 2, borderRadius: 2, background: '#fafafa', boxShadow: 2 }}>
                        <FormControlLabel
                          value={base}
                          control={<Radio sx={{ color: '#388e3c' }} />}
                          label={base}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          )}

          {activeStep === 1 && (
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: 16, color: '#2e3b55' }}>
                Choose Pizza Sauce
              </FormLabel>
              <RadioGroup value={pizzaSauce} onChange={handlePizzaSauceChange}>
                <Grid container spacing={2}>
                  {pizzaSauceOptions.map((sauce) => (
                    <Grid item xs={12} sm={6} key={sauce}>
                      <Paper sx={{ padding: 2, borderRadius: 2, background: '#fafafa', boxShadow: 2 }}>
                        <FormControlLabel
                          value={sauce}
                          control={<Radio sx={{ color: '#388e3c' }} />}
                          label={sauce}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          )}

          {activeStep === 2 && (
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: 16, color: '#2e3b55' }}>
                Select Cheese
              </FormLabel>
              <RadioGroup value={cheese} onChange={handleCheeseChange}>
                <Grid container spacing={2}>
                  {cheeseOptions.map((cheeseOption) => (
                    <Grid item xs={12} sm={6} key={cheeseOption}>
                      <Paper sx={{ padding: 2, borderRadius: 2, background: '#fafafa', boxShadow: 2 }}>
                        <FormControlLabel
                          value={cheeseOption}
                          control={<Radio sx={{ color: '#388e3c' }} />}
                          label={cheeseOption}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          )}

          {activeStep === 3 && (
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: 16, color: '#2e3b55' }}>
                Choose Veggies
              </FormLabel>
              <Grid container spacing={2}>
                {veggieOptions.map((veggie) => (
                  <Grid item xs={12} sm={6} key={veggie}>
                    <Paper sx={{ padding: 2, borderRadius: 2, background: '#fafafa', boxShadow: 2 }}>
                      <FormControlLabel
                        value={veggie}
                        control={<Radio sx={{ color: '#388e3c' }} />}
                        label={veggie}
                        checked={veggies.includes(veggie)}
                        onChange={handleVeggiesChange}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </FormControl>
          )}

          {activeStep === 4 && (
            <Box sx={{ textAlign: 'center', marginTop: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 2, color: '#388e3c' }}>
                Confirm Your Pizza:
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Base:</strong> {pizzaBase}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Sauce:</strong> {pizzaSauce}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Cheese:</strong> {cheese}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 3 }}>
                <strong>Veggies:</strong> {veggies.join(', ')}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="outlined"
              color="secondary"
              sx={{
                paddingX: 3,
                paddingY: 1,
                fontWeight: 'bold',
                backgroundColor: '#f1f8e9',
                boxShadow: 2,
                '&:hover': { backgroundColor: '#388e3c', color: '#fff' },
              }}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="contained"
              color="primary"
              sx={{
                paddingX: 3,
                paddingY: 1,
                fontWeight: 'bold',
                boxShadow: 3,
                '&:hover': { backgroundColor: '#388e3c', color: '#fff' },
              }}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      )}

      <Divider sx={{ marginTop: 3, marginBottom: 2 }} />
    </Box>
  );
}

