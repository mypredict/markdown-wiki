import states from '../state';
import { DOCUMENT_MESSAGE, VERSION_NUMBER } from '../actionTypes';

export function documentMessage (state = states.documentMessage, action) {
  switch (action.type) {
    case DOCUMENT_MESSAGE:
      return {...state, ...action.data};
    default:
      return state;
  }
}

export function versionNumber (state = states.versionNumber, action) {
  switch (action.type) {
    case VERSION_NUMBER:
      return action.data;
    default:
      return state;
  }
}