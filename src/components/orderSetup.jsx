import { InputLabel, Input, Container, Typography, Box, Button, Snackbar } from "@mui/material"
import * as React from "react"
import './orderSetup.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { OrderSteps } from "./orderSteps"
import { useNavigate } from "react-router-dom"
import { createOrder } from "../api/courier.api"
import ContentCopyIcon from '@mui/icons-material/ContentCopyRounded';
import { ReactComponent as BoxSvg } from '../img/box.svg';
import { ReactComponent as LogoSvg } from '../img/logo.svg';

export const OrderSetup = (props) => {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState('');
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const [bankAccount, setBankAccount] = React.useState('');
  const [accountName, setAccountName] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [length, setLength] = React.useState('');
  const [orderId, setOrderId] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const makeOrder = () => {
    const order = {
      seller: {
        role: 'buyer',
        address: address,
        name: name,
        mobile: phone,
      },
      buyer: null,
      accountNumber: bankAccount,
      price: itemPrice,
      height: height,
      width: width,
      length: length,
    }

    createOrder(order).then(result => { setOrderId(result.token); setStep(4); });
  }

  const renderStepOne = () => {
    return step !== 0 ? null : (
      <Box display={'flex'} flexDirection={'column'} paddingTop={'80px'}>
        <div className="logo-svg"><LogoSvg /></div>
        <div className="form-field">
          <Typography variant="body1" fontWeight={800}>Before getting started...</Typography>
          <Input id="address" type="address" fullWidth value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Enter your address" />
        </div>
        <div className="form-field">
          <Button variant="contained" onClick={() => setStep(1)}>Continue</Button>
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
          <Input id="name" fullWidth value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter your name" />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" type="email" fullWidth value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your email" />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="phone">Phone number</InputLabel>
          <PhoneInput
            id="phone"
            country={'us'}
            value={phone}
            onChange={setPhone}
          />
        </div>

        <div className="form-field">
          <Button variant="contained" onClick={() => setStep(2)}>Continue</Button>
        </div>
      </>
    )
  }

  const renderStepThree = () => {
    return step !== 2 ? null : (
      <>
        <Typography variant="h6" sx={{ 'marginTop': '20px' }}>Payment information</Typography>
        <div className="form-field">
          <InputLabel htmlFor="rec-name">Name of the recepient</InputLabel>
          <Input id="rec-name" fullWidth value={accountName} onChange={(e) => { setAccountName(e.target.value) }} placeholder="Enter your name" />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="account">Account number</InputLabel>
          <Input id="account" fullWidth value={bankAccount} onChange={(e) => { setBankAccount(e.target.value) }} placeholder="Enter your bank account" />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="item-price">Price of the package ($)</InputLabel>
          <Input id="item-price" type="number" inputProps={{ "min": "0.00", "max": "10000.00", "step": "0.01" }} fullWidth value={itemPrice} onChange={(e) => { setItemPrice(e.target.value) }} />
        </div>

        <div className="form-field">
          <Button variant="contained" onClick={() => setStep(3)}>Continue</Button>
        </div>
      </>
    )
  }

  const renderStepFour = () => {
    return step !== 3 ? null : (
      <>
        <Typography variant="h6" sx={{ 'marginTop': '20px' }}>Package Information</Typography>
        <div className="box-svg"><BoxSvg /></div>
        <div className="form-field">
          <InputLabel htmlFor="rec-name">Size of the package</InputLabel>
          <div className="form-field">
            <Input id="height" type="number" inputProps={{ "min": "0.00", "max": "10000.00", "step": "0.01" }} fullWidth value={height} onChange={(e) => { setHeight(e.target.value) }} placeholder='Height' />
          </div>
          <div className="form-field">
            <Input id="width" type="number" inputProps={{ "min": "0.00", "max": "10000.00", "step": "0.01" }} fullWidth value={width} onChange={(e) => { setWidth(e.target.value) }} placeholder='Width' />
          </div>
          <div className="form-field">
            <Input id="length" type="number" inputProps={{ "min": "0.00", "max": "10000.00", "step": "0.01" }} fullWidth value={length} onChange={(e) => { setLength(e.target.value) }} placeholder='Length' />
          </div>
        </div>
        <div className="form-field">
          <Button variant="contained" onClick={() => makeOrder()}>Continue</Button>
        </div>
      </>
    )
  }

  const renderStepFive = () => {
    return step !== 4 && step !== 5 ? null : (
      <>
        <Typography variant="h6" sx={{ 'marginTop': '20px' }}>Share</Typography>
        <div className="form-field">
          <InputLabel htmlFor="rec-name">Link for the buyer</InputLabel>
          <Box display={'flex'} gap={'16px'}>
            <Input id="link" fullWidth value={`${window.location.origin}/${orderId}`} disabled onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/${orderId}`); setStep(5); setOpen(true); }} />
            <Button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/${orderId}`); setStep(5); setOpen(true); }}><ContentCopyIcon /></Button>
          </Box>
        </div>
        <div className="form-field">
          <Typography variant="body2">Copy this link and send it to the buyer. After buyer will successfully pay for the order, you will be able to track the order status.</Typography>
          <Typography variant="body2">Thank you for choosing Walitolt!</Typography>
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
            {renderStepFive()}
          </div>
          <>
            <OrderSteps activeStep={step} />
          </>
        </Box>
      </Container>
      <Snackbar open={open} autoHideDuration={1000} onClose={() => setOpen(false)} message="Copied to clipboard." />
    </Box>

  )
}