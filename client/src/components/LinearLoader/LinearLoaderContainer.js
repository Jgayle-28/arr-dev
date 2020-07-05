import React, { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 7,
    margin: 0,
    padding: 0,
    // borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: '0 5px 5px 0',
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const BorderLinearProgressComplete = withStyles((theme) => ({
  root: {
    height: 7,
    borderRadius: 0,
    margin: 0,
    padding: 0,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 0,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

function LinearLoaderContainer({ progress }) {
  // const classes = useStyles();

  return (
    <Fragment>
      {process !== 100 ? (
        <BorderLinearProgress variant='determinate' value={progress} />
      ) : (
        <BorderLinearProgressComplete variant='determinate' value={progress} />
      )}
    </Fragment>
  );
}
export default LinearLoaderContainer;
