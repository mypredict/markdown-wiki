import states from '../state';
import {
  TOGGLE_LAYER_CONTAINER_DISPLAY
} from '../actionTypes';

export function layerContainer (state = states.layerContainer, action) {
  switch (action.type) {
    case TOGGLE_LAYER_CONTAINER_DISPLAY:
      return {...state, display: action.data};
    default:
      return state;
  }
}