import { InputLabel, Input, Container, Typography, Box, Button } from "@mui/material"
import * as React from "react"
import './payment.css'
import 'react-phone-input-2/lib/style.css'
import { OrderSteps } from "./orderSteps"
import { useLocation, useParams } from "react-router-dom"

export const LinkToDelivery = (props) => {
  const { id } = useParams();
  const [itemDescription, setItemDescription] = React.useState('Memory unit 16GB');
  const [itemWeight, setItemWeight] = React.useState('2.1');
  const [itemPrice, setItemPrice] = React.useState('46');

  return (
    <Box className="page-content">

      <Container maxWidth="md" className="order-form-container">
        <OrderSteps activeStep={1} />
        <div className="">
          <Typography variant="body2">Please copy this link and share it with the customer.</Typography>
          <div className="form-field">
            <Input id="link" fullWidth value={`${window.location.origin}/${id}`} disabled onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/${id}`); alert('Copied to clipboard.'); }} />
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
        </div>
      </Container>
    </Box>

  )
}