import axios from 'axios';
import { setAlert } from './alertActions';
import { getCurrentProfile, getProfileById } from './profileActions';
import {
  GET_POSTS,
  GET_POST,
  DELETE_POST_COMMENT,
  ADD_POST_COMMENT,
  UPDATE_LIKES,
  ADD_POST,
  DELETE_POST,
  POST_ERROR,
  DELETE_PROFILE_POST,
  CLEAR_FOCUS_POST,
} from '../actions/types';

// Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response },
    });
  }
};

// Like post
export const likePost = (postId, userId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    // Update main likes
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId: postId, likes: res.data.likes },
    });
    // Update Likes in profile
    dispatch(getCurrentProfile());
    // Update Likes in focusProfile if in user profile
    if (userId) {
      dispatch(getProfileById(userId));
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response,
        status: err.response,
      },
    });
  }
};

// Unlike post
export const unLikePost = (postId, userId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data.likes },
    });
    // Update Likes in profile
    dispatch(getCurrentProfile());
    // Update Likes in focusProfile if in user profile
    if (userId) {
      dispatch(getProfileById(userId));
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/posts/${postId}`);
    console.log('RES', res.data);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    dispatch({
      type: DELETE_PROFILE_POST,
      payload: res.data.userPosts,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('api/posts', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success', 'TR'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get single post
export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response },
    });
  }
};

// Add post comment
export const addPostComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_POST_COMMENT,
      payload: res.data.comments,
    });
    dispatch(setAlert('Comment Posted', 'success', 'TR'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete post comment
export const deletePostComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: DELETE_POST_COMMENT,
      payload: commentId,
    });
    setAlert('Comment Deleted', 'success', 'TR');
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Clear focus post
export const clearFocusPost = (postId, commentId) => async (dispatch) => {
  dispatch({
    type: CLEAR_FOCUS_POST,
  });
};
