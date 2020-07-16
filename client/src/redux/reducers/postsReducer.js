import {
  GET_POSTS,
  GET_POST,
  DELETE_POST_COMMENT,
  ADD_POST_COMMENT,
  UPDATE_LIKES,
  ADD_POST,
  DELETE_POST,
  POST_ERROR,
} from '../actions/types';

const initialState = {
  userPosts: [],
  focusPost: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        userPosts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        focusPost: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        userPosts: [payload, ...state.userPosts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        // filter out the deleted post
        userPosts: state.userPosts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        // Map through posts and find post by id
        // If post found update likes -> else return the post
        userPosts: state.userPosts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_POST_COMMENT:
      return {
        ...state,
        focusPost: { ...focusPost, comments: payload },
        loading: false,
      };
    case DELETE_POST_COMMENT:
      return {
        ...state,
        focusPost: {
          ...focusPost,
          comments: state.focusPost.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
