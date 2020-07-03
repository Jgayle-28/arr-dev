import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../../routes/PrivateRoute';
import Link from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import NavBar from '../../components/NavBar';
import LeftNav from '../../components/LeftNav';
import Routes from '../../routes/Routes';
// Views
import UserProfile from '../../views/Profiles/UserProfile';
import FocusProfile from '../../views/Profiles/FocusProfile';
import EditProfile from '../../views/Profiles/EditProfile';
import CreateProfile from '../../views/Profiles/CreateProfile';
import Users from '../../views/Users';
import Modal from '../../components/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: 15,
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
  console.log('PROPS DASHBOARD', props);
  return (
    <Fragment>
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
                  {/* <PrivateRoute exact path='/dashboard' component={Dashboard} /> */}
                  {/* <Switch>
                <Route component={Routes} />

                <PrivateRoute
                  // exact
                  path={`${props.match.path}/profile`}
                  // path={`${props.match.path}/profile`}
                  component={UserProfile}
                />
                <PrivateRoute
                  // exact
                  path={`${props.match.path}/edit-profile`}
                  // path='/edit-profile'
                  component={EditProfile}
                />
                <PrivateRoute
                  // exact
                  path={`${props.match.path}/user-profile/:name`}
                  // path='/user-profile/:name'
                  component={FocusProfile}
                />
                <PrivateRoute
                  // exact
                  path={`${props.match.path}/users`}
                  path='/users'
                  component={Users}
                />
              </Switch> */}
                </Grid>
              </Grid>
            </div>
          </div>
          {profile && profile.userProfile === null ? (
            <Modal
              title='Welcome to Remnant Remains'
              hideCloseBtn
              disableBackgroundClick
              hideFooter
              isOpen={true}
              content={<CreateProfile />}
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
