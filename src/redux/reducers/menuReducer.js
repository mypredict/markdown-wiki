import states from '../state';
import {
  LOCKING_DOC_MENU,
  TOGGLE_DOC_MENU,
  LOCKING_USER_MENU,
  TOGGLE_USER_MENU
} from '../actionTypes';

export default function menu (state = states.menu, action) {
  switch (action.type) {
    case LOCKING_DOC_MENU:
      return { ...state, lockingDocMenu: action.data };
    case TOGGLE_DOC_MENU:
      return { ...state, toggleDocMenu: action.data };
    case LOCKING_USER_MENU:
      return { ...state, lockingUserMenu: action.data };
    case TOGGLE_USER_MENU:
      return { ...state, toggleUserMenu: action.data };
    default:
      return state;
  }
}
