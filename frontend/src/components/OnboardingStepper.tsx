import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Upload", "Preview", "Setup", "Training", "Testing", "Deploy"];

type AutoMLOnboardingStepperProps = {
  step: number;
};

export default function AutoMLOnboardingStepper({
  step,
}: AutoMLOnboardingStepperProps) {
  return (
    <Box sx={{ width: "100%", paddingBottom: "2rem" }}>
      <Stepper activeStep={step}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
