import {
  LOCKING_MENU,
  TOGGLE_MENU,
  TOGGLE_LAYER_CONTAINER_DISPLAY,
  VERSION_NUMBER,
  USER_MESSAGE,
  DOCUMENT_MESSAGE
} from './actionTypes';

// 菜单状态控制
export const lockingMenuCreator = bool => ({
  type: LOCKING_MENU,
  data: bool
});

export const toggleMenuCreator = bool => ({
  type: TOGGLE_MENU,
  data: bool
});

// 菜单切换展示容器
export const toggleLayerContainerDisplayCreator = bool => ({
  type: TOGGLE_LAYER_CONTAINER_DISPLAY,
  data: bool
});

// 版本切换
export const versionNumberCreator = number => ({
  type: VERSION_NUMBER,
  data: number
});

// 用户信息
export const userMessageCreator = obj => ({
  type: USER_MESSAGE,
  data: obj
});

// 文档信息
export const ducumentMessageCreator = obj => ({
  type: DOCUMENT_MESSAGE,
  data: obj
});