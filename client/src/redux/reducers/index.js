import { combineReducers } from 'redux';
import alerts from './alertReducer';
import auth from './authReducer';
import profile from './profileReducer';
import dashboard from './dashboardReducer';
import posts from './postsReducer';

export default combineReducers({
  auth,
  profile,
  posts,
  dashboard,
  alerts,
});
