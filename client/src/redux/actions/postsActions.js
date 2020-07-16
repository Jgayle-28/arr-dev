import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_POSTS,
  UPDATE_LIKES,
  ADD_POST,
  DELETE_POST,
  POST_ERROR,
  DELETE_PROFILE_POST,
} from '../actions/types';

// Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('api/posts');
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
export const likePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      // payload: { postId: postId, post: res.data.post },
      payload: { postId: postId, likes: res.data.likes },
    });
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
export const unLikePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data.likes },
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
    setAlert('Post Created', 'success', 'TR');
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
