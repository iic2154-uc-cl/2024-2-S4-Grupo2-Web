/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import React from 'react';
import { Stepper, Step, Button, Typography } from '@material-tailwind/react';
import CheckIcon from './TailwinSvgIcons/CheckIcon';

export default function StepperWithContent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div id="stepper_container" className="w-full px-24 py-4">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <CheckIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography variant="h6" color={activeStep === 0 ? 'blue' : 'blue-gray'}>
              Tipo de publicación
            </Typography>
            <Typography
              color={activeStep === 0 ? 'blue' : 'gray'}
              className="font-normal"
            >
              None
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <CheckIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography variant="h6" color={activeStep === 1 ? 'blue' : 'blue-gray'}>
              Imágnes
            </Typography>
            <Typography
              color={activeStep === 1 ? 'blue' : 'gray'}
              className="font-normal"
            >
              None
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <CheckIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography variant="h6" color={activeStep === 2 ? 'blue' : 'blue-gray'}>
              Información
            </Typography>
            <Typography
              color={activeStep === 2 ? 'blue' : 'gray'}
              className="font-normal"
            >
              None
            </Typography>
          </div>
        </Step>
      </Stepper>
      <div className="mt-32 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
