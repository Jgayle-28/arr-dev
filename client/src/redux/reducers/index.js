import { combineReducers } from 'redux';
import alerts from './alertReducer';
import auth from './authReducer';
import profile from './profileReducer';

export default combineReducers({
  auth,
  profile,
  alerts,
});
