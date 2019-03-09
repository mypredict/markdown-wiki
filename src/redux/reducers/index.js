import { combineReducers } from 'redux';

import { menu } from './menuReducer';
import { layerContainer } from './layerContainerReducer';
import { userMessage } from './userReducer';
import { documentMessage, versionNumber } from './documentReducer';

export default combineReducers({
  menu,
  layerContainer,
  userMessage,
  documentMessage,
  versionNumber
});