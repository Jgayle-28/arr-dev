import {
  GET_PROFILE,
  GET_PROFILES,
  GET_FOCUS_PROFILE,
  PROFILE_ERROR,
  DELETE_ACCOUNT,
  CLEAR_PROFILE,
} from '../actions/types';
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

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  // Clear profile
  // dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by user ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user${userId}`);
    dispatch({
      type: GET_FOCUS_PROFILE,
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
    // Redirect user to dashboard/home after creating profile
    if (!edit) {
      history.push('/home');
    }
    // Update profile in redux
    if (edit) {
      dispatch(getCurrentProfile());
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

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This cannot be undone.')) {
    try {
      const res = await axios.delete('/api/profile');
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });
      //  Restricted access to admin
      setAlert('Account Deleted', 'success', 'TR');
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
