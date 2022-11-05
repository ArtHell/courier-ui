import { InputLabel, Input, Container, Typography, Box, Button } from "@mui/material"
import * as React from "react"
import './payment.css'
import 'react-phone-input-2/lib/style.css'
import { DeliverySteps } from "./deliverySteps"

export const Payment = (props) => {

  return (
    <Box className="page-content">
      
      <Container maxWidth="md" className="order-form-container">
      <DeliverySteps activeStep={1} />
        <div className="">
          <Typography variant="body2">Payment was successful. You'll be redirected to tracking page soon.</Typography>
        </div>
      </Container>
    </Box>

  )
}