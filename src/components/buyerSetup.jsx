import { InputLabel, Input, Container, Typography, Box, Button, Snackbar } from "@mui/material"
import * as React from "react"
import './orderSetup.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { DeliverySteps } from "./deliverySteps"
import { useNavigate, useParams } from "react-router-dom"
import { ReactComponent as LogoSvg } from '../img/logo.svg';
import { addBuyerInfo, deliverOrder, getOrder } from "../api/courier.api"

export const BuyerSetup = (props) => {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState('');
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [accountName, setAccountName] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [length, setLength] = React.useState('');
  const [orderId, setOrderId] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [cardholder, setCardholder] = React.useState('');
  const [cvcCode, setCvcCode] = React.useState('');
  const [expireDate, setExpireDate] = React.useState('');
  const [fee, setDeliveryFee] = React.useState('');
  const { id } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const order = await getOrder(id);

      if(order) {
        setWidth(order.width);
        setLength(order.length);
        setHeight(order.height);
        setItemPrice(order.price);
      }
    };

    fetchData().catch(console.error);
  }, []);

  const updateOrder = () => {
    const seller = {
      role: 'buyer',
      address: address,
      name: name,
      mobile: `+${phone}`,
    };

    return addBuyerInfo(id, seller);
  }

  const saveAddress = () => {
    updateOrder().then((result) => {
      if (result && result.fee && result.fee.amount) {
        setStep(1); 
        setDeliveryFee(result.fee.amount); 
      } else {
        setOpen(true);
      }
    });
  }

  const postOrder = () => {
    deliverOrder(id).then((result) => {
      window.location.href = result.tracking.url;
    });
  }

  const saveInfo = () => {
    updateOrder().then((result) => { setStep(2); setDeliveryFee(result.fee.amount);});
  }

  const renderStepOne = () => {
    return step !== 0 ? null : (
      <Box display={'flex'} flexDirection={'column'} paddingTop={'80px'}>
        <div className="logo-svg"><LogoSvg /></div>
        <div className="form-field">
          <Typography variant="body1" fontWeight={800}>Before getting started...</Typography>
          <Input required id="address" type="address" fullWidth value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Enter your address" />
        </div>
        <div className="form-field">
          <Button variant="contained" onClick={() => saveAddress()}>Continue</Button>
        </div>
      </Box>
    )
  }

  const renderStepTwo = () => {
    return step !== 1 ? null : (
      <>
        <Typography variant="h6" sx={{ 'marginTop': '20px' }}>Your information</Typography>
        <div className="form-field">
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input required id="name" fullWidth value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter your name" />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input required id="email" type="email" fullWidth value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your email" />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="phone">Phone number</InputLabel>
          <PhoneInput
            required
            id="phone"
            country={'us'}
            value={phone}
            onChange={setPhone}
          />
        </div>

        <div className="form-field">
          <Button variant="contained" onClick={() => saveInfo()}>Continue</Button>
        </div>
      </>
    )
  }

  const renderStepThree = () => {
    return step !== 2 ? null : (
      <>
        <Typography variant="h6" sx={{ 'marginTop': '20px' }}>Package Information</Typography>
        <div className="form-field">
            <InputLabel htmlFor="packageId">Package ID</InputLabel>
            <Input id="packageId" inputProps={{ "min": "0.00", "max": "10000.00", "step": "0.01" }} fullWidth value={id} />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="rec-name">Size of the package</InputLabel>
          <div className="form-field">
            <Input required id="height" type="number" inputProps={{ "min": "0.00", "max": "10000.00", "step": "0.01" }} fullWidth value={height} disabled />
          </div>
          <div className="form-field">
            <Input required id="width" type="number" inputProps={{ "min": "0.00", "max": "10000.00", "step": "0.01" }} fullWidth value={width} disabled />
          </div>
          <div className="form-field">
            <Input required id="length" type="number" inputProps={{ "min": "0.00", "max": "10000.00", "step": "0.01" }} fullWidth value={length} disabled />
          </div>
        </div>
        <div className="form-field">
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input required id="price" inputProps={{ "min": "0.00", "max": "10000.00", "step": "0.01" }} fullWidth value={itemPrice} disabled />
        </div>
        <div className="form-field">
            <InputLabel htmlFor="packageFee">Delivery</InputLabel>
            <Input id="packageFee" inputProps={{ "min": "0.00", "max": "10000.00", "step": "0.01" }} fullWidth value={fee} disabled />
        </div>
        <div className="form-field">
          <Button variant="contained" onClick={() => setStep(3)}>Confirm</Button>
        </div>
      </>
    )
  }

  const renderStepFour = () => {
    return step !== 3 ? null : (
      <>
        <Typography variant="h6" sx={{ 'marginTop': '20px' }}>Payment information</Typography>
        <div className="form-field">
          <InputLabel htmlFor="cardholder">Cardholder</InputLabel>
          <Input id="cardholder" required fullWidth value={accountName} onChange={(e) => { setAccountName(e.target.value) }} placeholder="Enter name" />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="card-number">Card number</InputLabel>
          <Input id="card-number" required fullWidth value={cardNumber} onChange={(e) => { setCardNumber(e.target.value) }} placeholder="Enter card number" />
        </div>
        <div className="form-field">
          <Box display={'flex'} gap={'24px'} justifyContent={'space-between'}>
            <div>
            <InputLabel htmlFor="expireDate">Expiry date</InputLabel>
          <Input id="expireDate" required fullWidth value={expireDate} onChange={(e) => { setExpireDate(e.target.value) }} placeholder="MM/YY" />
            </div>
          <div>
          <InputLabel htmlFor="cvc">CVC</InputLabel>
          <Input id="cvc" required fullWidth value={cvcCode} onChange={(e) => { setCvcCode(e.target.value) }} placeholder="123" />
          </div>
          </Box>
        </div>

        <div className="form-field">
          <Button variant="contained" onClick={() => postOrder()}>Confirm</Button>
        </div>
      </>
    )
  }

  return (
    <Box className="page-content">
      <Container maxWidth="sm" className="order-form-container">
        <Box>
          <div className="page-content">
            {step !== 0 && <Button variant="text" onClick={() => { setStep(step - 1) }}>{'Back'}</Button>}
            {renderStepOne()}
            {renderStepTwo()}
            {renderStepThree()}
            {renderStepFour()}
          </div>
          <>
            <DeliverySteps activeStep={step} />
          </>
        </Box>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message="Delivery to your location isn't possible." />
    </Box>

  )
}