import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType, position) => (dispatch) => {
  const id = uuidv4();
  // Send position = 'DEFAULT' for no alert placement
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, position, id },
  });
  // Default remove Alert
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, 3000);
};
export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });
};
