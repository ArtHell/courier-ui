import { InputLabel, Input, Container, Typography, Box, Button } from "@mui/material"
import * as React from "react"
import './deliverySetup.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { DeliverySteps } from "./deliverySteps"
import { useNavigate, useParams } from "react-router-dom"
import { testApi } from "../api/courier.api"

export const DeliverySetup = (props) => {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [adressFlatNumber, setAddressFlatNumber] = React.useState('');
  const [itemDescription, setItemDescription] = React.useState('Memory unit 16GB');
  const [itemWeight, setItemWeight] = React.useState('2.1');
  const [itemPrice, setItemPrice] = React.useState('46');
  const [feePrice, setFeePrice] = React.useState('1.9');
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const response = await testApi();

      // set state with the result
      setItemDescription(response.data);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Box className="page-content">
      <Container maxWidth="md" className="order-form-container">
        <DeliverySteps activeStep={0} />
        <div>
          <Typography variant="body2">Please provide your info and pay for the order. We will start delivery immediately.</Typography>
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
          <Input id="address" type="address" fullWidth value={address} onChange={(e) => { setAddress(e.target.value) }} />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="address-flat-number">Flat number</InputLabel>
          <Input id="address-flat-number" fullWidth value={adressFlatNumber} onChange={(e) => { setAddressFlatNumber(e.target.value) }} />
        </div>
        <Typography variant="h6" sx={{ 'marginTop': '20px' }}>Item details:</Typography>
        <div className="form-field">
          <InputLabel htmlFor="item-description">Item description</InputLabel>
          <Input id="item-description" fullWidth value={itemDescription} disabled />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="item-weight">Item weight (kg)</InputLabel>
          <Input id="item-weight" type="number" fullWidth value={itemWeight} disabled />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="item-price">Price ($)</InputLabel>
          <Input id="item-price" type="number" inputProps={{ "min": "0.00", "max": "10000.00", "step": "0.01" }} fullWidth value={itemPrice} disabled />
        </div>
        <div className="form-field">
          <InputLabel htmlFor="fee-price">Shipping fee ($)</InputLabel>
          <Input id="fee-price" type="number" inputProps={{ "min": "0.00", "max": "10000.00", "step": "0.01" }} fullWidth value={feePrice} disabled />
        </div>
        <div className="form-field">
          <Button variant="contained" onClick={() => navigate(`/${id}/payment`)}>CONFIRM</Button>
        </div>
      </Container>
    </Box>

  )
}