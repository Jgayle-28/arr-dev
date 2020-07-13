import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
// Views
import Home from '../views/Home';
import Community from '../views/Community';
import Settings from '../views/Settings';
import UserProfile from '../views/Profiles/UserProfile';
import FocusProfile from '../views/Profiles/FocusProfile';
import EditProfile from '../views/Profiles/EditProfile';

const Routes = (props) => {
  // console.log('PROPS FROM ROUTER', props);
  return (
    <Switch>
      <PrivateRoute path='/home' component={Home} />
      <PrivateRoute path='/community' component={Community} />
      <PrivateRoute path='/settings' component={Settings} />
      {/* Profile Routes */}
      <PrivateRoute path='/profile' component={UserProfile} />
      <PrivateRoute path='/profile' component={EditProfile} />
      <PrivateRoute path='/user-profile/:id' component={FocusProfile} />
    </Switch>
  );
};
export default Routes;
