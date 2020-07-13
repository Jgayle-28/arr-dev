import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    // marginTop: 50,
    // marginRight: 20,
    // color: '#1665D8',
    // '&:hover': {
    //   color: '#1665D8',
    // },
    backgroundColor: '#1665D8',
    '&:hover': {
      backgroundColor: '#1665D8',
    },
  },
}));

const CustomButtonContainer = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <Button
      // disableElevation
      variant='contained'
      className={classes.button}
      // endIcon={}
      // startIcon={}
      {...rest}>
      {children}
    </Button>
  );
};

export default CustomButtonContainer;
