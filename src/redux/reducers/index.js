import { combineReducers } from 'redux';

import menu from './menuReducer';
import container from './containerReducer';

export default combineReducers({
  menu,
  container
});