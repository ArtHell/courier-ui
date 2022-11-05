import { Box, Step, StepLabel, Stepper } from "@mui/material";
import * as React from "react"
import './orderSteps.css'
import PostAddIcon from '@mui/icons-material/PostAddRounded';
import AddLinkIcon from '@mui/icons-material/AddLinkRounded';
import DriveEtaIcon from '@mui/icons-material/DriveEtaRounded';

export const DeliverySteps = (props) => {
  const steps = [
    'Delivery details',
    'Payment',
    'Tracking'
  ];

  return (
    <Box className="steps steps-container">
      <Stepper activeStep={props.activeStep || -1} alternativeLabel>
          <Step key={'step-0'}>
            <StepLabel className="step-label" StepIconComponent={PostAddIcon}>Delivery details</StepLabel>
          </Step>
          <Step key={'step-1'}>
          <StepLabel className="step-label" StepIconComponent={AddLinkIcon}>Payment</StepLabel>
        </Step>
        <Step key={'step-2'}>
          <StepLabel className="step-label" StepIconComponent={DriveEtaIcon}>Tracking</StepLabel>
        </Step>
      </Stepper>
    </Box>
  )
}