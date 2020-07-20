import { UPDATE_USER } from '../actions/types';
import { setAlert } from './alertActions';
import { loadUser } from './authActions';
import axios from 'axios';

// Login User
export const saveUserSettings = (userData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/user-settings', userData, config);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setAlert('Settings Updated', 'success', 'TR'));
  } catch (err) {
    console.error(err.response.message);
  }
};
