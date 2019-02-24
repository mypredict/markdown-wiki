import React, { useState } from 'react';
import { connect } from 'react-redux';

import { lockingUserMenuCreator, toggleUserMenuCreator } from '../redux/actions';
import './Menu.scss';

function UserMenu (props) {
  const {
    lockingUserMenu,
    lockingUserMenuCreator,
    toggleUserMenu,
    toggleUserMenuCreator
  } = props;
  const menuData = [
    { title: '文档成员', iconName: 'member' },
    { title: '历史版本', iconName: 'version' },
    { title: '涉及文件', iconName: 'file' },
    { title: 'markdown语法', iconName: 'grammar' }
  ]

  function lockingMenu () {
    lockingUserMenuCreator(!lockingUserMenu);
    toggleUserMenuCreator(!toggleUserMenu);
  }

  function publishMenuEvent (type) {
    console.log(type)
  }

  return (
    <div
      className={lockingUserMenu ? "menu hover-user-menu" : "menu user-menu"}
      style={{right: toggleUserMenu ? 0 : ''}}>
      <menu className="menu-container">
        {
          menuData.map((menu, index) => {
            return (
              <span title={menu.title} key={index}>
                <svg className="icon" aria-hidden="true" onClick={() => publishMenuEvent(menu.iconName)}>
                  <use xlinkHref={`#icon-${menu.iconName}`} />
                </svg>
              </span>
            )
          })
        }
      </menu>
      <span title="锁定右菜单">
        <svg className="icon" aria-hidden="true" onClick={lockingMenu}>
          <use xlinkHref={lockingUserMenu ? '#icon-close' : '#icon-open'} />
        </svg>
      </span>
    </div>
  );
}

export default connect(
  state => ({
    lockingUserMenu: state.menu.lockingUserMenu,
    toggleUserMenu: state.menu.toggleUserMenu
  }),
  {
    lockingUserMenuCreator,
    toggleUserMenuCreator
  }
)(UserMenu);
