import states from '../state';
import {
  LOCKING_MENU,
  TOGGLE_MENU
} from '../actionTypes';

export function menu (state = states.menu, action) {
  switch (action.type) {
    case LOCKING_MENU:
      return { ...state, lockingMenu: action.data };
    case TOGGLE_MENU:
      return { ...state, toggleMenu: action.data };
    default:
      return state;
  }
}
