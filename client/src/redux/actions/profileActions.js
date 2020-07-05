import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';
import axios from 'axios';
import { setAlert } from './alertActions';

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create OR Updated user profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(
      setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success', 'TR')
    );
    if (!edit) {
      history.push('/home');
    }
  } catch (err) {
    console.error(err.response.message);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'error', 'DEFAULT'))
      );
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Upload user profile picture
export const uploadProfilePicture = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
      '/api/profile/upload/profile-picture',
      formData,
      config
    );
    // dispatch({
    //   type: GET_PROFILE,
    //   payload: res.data,
    // });
  } catch (err) {
    console.error(err.response.message);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'error', 'DEFAULT'))
      );
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Upload user profile cover photo
export const uploadCoverPhoto = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
      '/api/profile/upload/cover-photo',
      formData,
      config
    );
    // dispatch({
    //   type: GET_PROFILE,
    //   payload: res.data,
    // });
  } catch (err) {
    console.error(err.response.message);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'error', 'DEFAULT'))
      );
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
