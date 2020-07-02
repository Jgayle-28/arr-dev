import { TOGGLE_MENU } from '../actions/types';

// Toggle menu for mobile
export const toggleMenu = () => (dispatch) => {
  dispatch({ type: TOGGLE_MENU });
};
