import {
  GET_PROFILE,
  DELETE_PROFILE_POST,
  GET_PROFILES,
  GET_FOCUS_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
  userProfile: null,
  focusProfile: null,
  profiles: [],
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        userProfile: payload,
        loading: false,
      };
    case DELETE_PROFILE_POST:
      // Update userPosts from payload
      let profile = state.userProfile;
      profile.userPosts = payload;
      return {
        ...state,
        userProfile: { ...state.userProfile, profile },
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_FOCUS_PROFILE:
      return {
        ...state,
        focusProfile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
