import { Box, Step, StepLabel, Stepper } from "@mui/material";
import * as React from "react"
import './orderSteps.css'

export const DeliverySteps = (props) => {

  return (
    <Box className="steps steps-container">
      <Stepper activeStep={props.activeStep || -1} alternativeLabel>
        <Step key={'step-1'}>
        <StepLabel/>
        </Step>
        <Step key={'step-2'}>
        <StepLabel/>
        </Step>
        <Step key={'step-3'}>
        <StepLabel/>
        </Step>
        <Step key={'step-4'}>
        <StepLabel/>
        </Step>
      </Stepper>
    </Box>
  )
}