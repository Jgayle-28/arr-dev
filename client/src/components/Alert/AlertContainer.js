import React from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../redux/actions/alertActions';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function AlertContainer({ alerts, removeAlert }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {alerts &&
        alerts.length > 0 &&
        alerts.map((alert, i) => {
          if (alert.position === 'DEFAULT') {
            // Return normal alert
            return (
              <Fade in={true} key={i}>
                <Alert
                  severity={alert.alertType}
                  onClose={() => removeAlert(alert.id)}>
                  {alert.msg}
                </Alert>
              </Fade>
            );
          } else {
            // Return a positioned alert
            let vertical;
            let horizontal;
            // Establish alert position
            switch (alert.position) {
              case 'TR':
                vertical = 'top';
                horizontal = 'right';
                break;
              case 'TL':
                vertical = 'top';
                horizontal = 'left';
                break;
              case 'TC':
                vertical = 'top';
                horizontal = 'center';
                break;
              case 'BR':
                vertical = 'bottom';
                horizontal = 'right';
                break;
              case 'BL':
                vertical = 'bottom';
                horizontal = 'left';
                break;
              case 'BC':
                vertical = 'bottom';
                horizontal = 'center';
                break;
              default:
                break;
            }
            return (
              <Snackbar
                key={i}
                TransitionComponent={Slide}
                anchorOrigin={{ vertical, horizontal }}
                open={true}
                onClose={() => removeAlert(alert.id)}
                key={vertical + horizontal}>
                <Alert
                  severity={alert.alertType}
                  onClose={() => removeAlert(alert.id)}>
                  {alert.msg}
                </Alert>
              </Snackbar>
            );
          }
        })}
    </div>
  );
}
AlertContainer.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { removeAlert })(AlertContainer);
