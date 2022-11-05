import { InputLabel, Input, Container, Typography, Box, Button } from "@mui/material"
import * as React from "react"
import './orderSetup.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { OrderSteps } from "./orderSteps"
import { useNavigate } from "react-router-dom"

export const OrderSetup = (props) => {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [adressFlatNumber, setAddressFlatNumber] = React.useState('');
  const [itemDescription, setItemDescription] = React.useState('');
  const [itemWeight, setItemWeight] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState('');
  const navigate = useNavigate();

  return (
    <Box className="page-content">
      
      <Container maxWidth="md" className="order-form-container">
      <OrderSteps activeStep={0} />
        <div className="">
          <Typography variant="body2">Create an order. Send link to buyer. Wait for them to accept an order and then for the Wolt courier.</Typography>
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
          <InputLabel htmlFor="address">Your address</InputLabel>
          <Input id="address" type="address" fullWidth value={address} onChange={(e)=> {setAddress(e.target.value)}} />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="address-flat-number">Flat number</InputLabel>
          <Input id="address-flat-number" fullWidth value={adressFlatNumber} onChange={(e)=> {setAddressFlatNumber(e.target.value)}} />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="item-description">Item description</InputLabel>
          <Input id="item-description" fullWidth value={itemDescription} onChange={(e)=> {setItemDescription(e.target.value)}} />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="item-weight">Item weight (kg)</InputLabel>
          <Input id="item-weight" type="number" fullWidth value={itemWeight} onChange={(e)=> {setItemWeight(e.target.value)}} />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="item-price">Price ($)</InputLabel>
          <Input id="item-price" type="number" inputProps={{"min":"0.00", "max":"10000.00", "step":"0.01"}} fullWidth value={itemPrice} onChange={(e)=> {setItemPrice(e.target.value)}} />
        </div>
        <div className="form-field">
          <Button variant="contained" onClick={() => navigate(`hashlink/link`)}>CREATE</Button>
        </div>

      </Container>
    </Box>

  )
}