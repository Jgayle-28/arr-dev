import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IntroText from './IntroText';
import CreateProfileContainer from './CreateProfile/CreateProfileContainer';

const useStyles = makeStyles((theme) => ({
  container: { width: 700 },
  actionBtnWrapper: {
    margin: '20px 0 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const NewProfileStepperContainer = () => {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextClick = () => {
    console.log('clicked');
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const handleBackClick = () => {
    console.log('clicked');
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const getStepContent = (currentStep) => {
    switch (currentStep) {
      case 0:
        return <IntroText />;
      case 1:
        return <CreateProfileContainer />;
      default:
        break;
    }
  };
  return (
    <div className={classes.container}>
      {getStepContent(currentStep)}
      <div className={classes.actionBtnWrapper}>
        {!currentStep > 0 && (
          <Button onClick={handleNextClick} variant='contained' color='primary'>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewProfileStepperContainer;
