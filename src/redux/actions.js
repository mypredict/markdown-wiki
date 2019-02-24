import {
  LOCKING_DOC_MENU,
  TOGGLE_DOC_MENU,
  LOCKING_USER_MENU,
  TOGGLE_USER_MENU,
  CHANGE_CONTAINER_TYPE
} from './actionTypes';

// 菜单状态控制
export const lockingDocMenuCreator = bool => ({
  type: LOCKING_DOC_MENU,
  data: bool
});

export const toggleDocMenuCreator = bool => ({
  type: TOGGLE_DOC_MENU,
  data: bool
});

export const lockingUserMenuCreator = bool => ({
  type: LOCKING_USER_MENU,
  data: bool
});

export const toggleUserMenuCreator = bool => ({
  type: TOGGLE_USER_MENU,
  data: bool
});

// 菜单切换展示容器
export const changeContainerTypeCreator = type => ({
  type: CHANGE_CONTAINER_TYPE,
  data: type
});
