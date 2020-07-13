import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  IntroTextWrapper: { color: '#3E3F42' },
  leadText: { letterSpacing: 0.5 },
  bodyText: { color: '#6B6C6F', letterSpacing: 0.3 },
});

const IntroText = () => {
  const classes = useStyles();
  return (
    <div className={classes.IntroTextWrapper}>
      <Typography
        gutterBottom
        variant='h5'
        component='h3'
        className={classes.leadText}>
        Welcome to Remnant Remains...
      </Typography>

      <p className={classes.bodyText}>
        It looks like its your first time here. Please take a moment and create
        a profile. Do not worry if you desire to change anything after creating
        your profile you may do so by clicking the 'edit button' in your profile
      </p>
    </div>
  );
};

export default IntroText;
