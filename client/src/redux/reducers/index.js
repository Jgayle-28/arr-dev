import { combineReducers } from 'redux';
import alerts from './alertReducer';
import auth from './authReducer';
import profile from './profileReducer';
import dashboard from './dashboardReducer';

export default combineReducers({
  auth,
  profile,
  dashboard,
  alerts,
});
