import states from '../state';
import {
  CHANGE_CONTAINER_TYPE
} from '../actionTypes';

export default function container (state = states.container, action) {
  console.log(456)
  switch (action.type) {
    case CHANGE_CONTAINER_TYPE:
      return { ...state, type: action.data};
    default:
      return state;
  }
}