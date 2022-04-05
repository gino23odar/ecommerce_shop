import React, {useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';
import CssBaseline from '@mui/material/CssBaseline';
import {Link, useNavigate} from 'react-router-dom';

import {commerce} from '../../../lib/commerce';
import useStyles from './styles';
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const classes = useStyles();
  const [shippingData, setShippingData] = useState({});
  const history = useNavigate();

  useEffect(()=>{
    const generateToken = async()=>{
      try{
        const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

        setCheckoutToken(token);
      }catch (error){
        history.pushState('/');
      }
    }
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next =(data)=>{
    setShippingData(data);
    nextStep();
  }

  let Confirmation = () => order.customer ?(
    <>
      <CssBaseline/>
      <div>
        <Typography variant='h5'>Thank you for shopping with E-commerce, {order.customer.firstname} {order.customer.lastname}</Typography>
        <Divider className={classes.divider}/>
        <Typography variant='subtitle2'>Order reference: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} to='/' variant='outlined' type='button'>HOME</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress/>
    </div>
  );

  if(error){
    <>
      <Typography variant='h5'>Oh no! Something went wrong: {error}</Typography>
      <Button component={Link} to='/' variant='outlined' type='button'>HOME</Button>
    </>
  }

  const Form = () => activeStep === 0
    ? <AdressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/>


  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'></Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step)=>(
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
        </Paper>
      </main>
    </>
  )
}

export default Checkout