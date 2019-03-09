import states from '../state';
import { USER_MESSAGE } from '../actionTypes';

export function userMessage (state = states.userMessage, action) {
  switch (action.type) {
    case USER_MESSAGE:
      return {...state, ...action.data};
    default:
      return state;
  }
}