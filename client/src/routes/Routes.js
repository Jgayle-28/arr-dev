import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
// Views
import Home from '../views/Home';
import UserProfile from '../views/Profiles/UserProfile';
import FocusProfile from '../views/Profiles/FocusProfile';
import EditProfile from '../views/Profiles/EditProfile';
import Users from '../views/Users';

const Routes = (props) => {
  console.log('PROPS FROM ROUTER', props);
  return (
    <Switch>
      {/* <Route component={Routes} /> */}

      <PrivateRoute
        // exact
        // path={`${props.match.path}/profile`}
        path='/home'
        component={Home}
      />

      <PrivateRoute
        // exact
        // path={`${props.match.path}/profile`}
        path='/profile'
        component={UserProfile}
      />
      <PrivateRoute
        // exact
        // path={`${props.match.path}/edit-profile`}
        path='/profile'
        // path='/edit-profile'
        component={EditProfile}
      />
      <PrivateRoute
        // exact
        // path={`${props.match.path}/user-profile/:name`}
        path='/user-profile'
        // path='/user-profile/:name'
        component={FocusProfile}
      />
      <PrivateRoute
        // exact
        // path={`${props.match.path}/users`}
        path='/community'
        component={Users}
      />
    </Switch>
  );
};
export default Routes;
