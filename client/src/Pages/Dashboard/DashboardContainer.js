import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../../components/NavBar';
import LeftNav from '../../components/LeftNav';
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';
import NewProfileStepper from '../../views/Profiles/NewProfileStepper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: 15,
    marginTop: 65,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const DashboardContainer = (props) => {
  const { getCurrentProfile, auth, profile } = props;
  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile();
  }, []);
  // console.log('PROPS DASHBOARD', props);
  return (
    <Fragment>
      <Alert />
      {auth.isAuthenticated && (
        <Fragment>
          <NavBar />
          <div className={classes.root}>
            <CssBaseline />
            <LeftNav />
            <div className={classes.content}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {props.children}
                </Grid>
              </Grid>
            </div>
          </div>
          {!profile.loading && profile && profile.userProfile === null ? (
            <Modal
              // title='Welcome to Remnant Remains'
              hideHeader
              hideCloseBtn
              disableBackgroundClick
              hideFooter
              isOpen={true}
              content={<NewProfileStepper />}
            />
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};
DashboardContainer.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(
  DashboardContainer
);
