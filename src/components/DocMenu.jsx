import React, { useState } from 'react';
import { connect } from 'react-redux';

import { lockingDocMenuCreator, toggleDocMenuCreator, changeContainerTypeCreator } from '../redux/actions';
import './Menu.scss';

function DocMenu (props) {
  const {
    lockingDocMenu,
    lockingDocMenuCreator,
    toggleDocMenu,
    toggleDocMenuCreator
  } = props;
  const menuData = [
    { title: '文档成员', iconName: 'member' },
    { title: '历史版本', iconName: 'version' },
    { title: '涉及文件', iconName: 'file' },
    { title: 'markdown语法', iconName: 'grammar' }
  ]

  function lockingMenu () {
    lockingDocMenuCreator(!lockingDocMenu);
    toggleDocMenuCreator(!toggleDocMenu);
    changeContainerTypeCreator('1234343434')
  }

  function publishMenuEvent (type) {
    console.log(type)
  }

  return (
    <div
      className={lockingDocMenu ? "menu hover-doc-menu" : "menu doc-menu"}
      style={{left: toggleDocMenu ? 0 : ''}}>
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
      <span title="锁定左菜单">
        <svg className="icon" aria-hidden="true" onClick={lockingMenu}>
          <use xlinkHref={lockingDocMenu ? '#icon-close' : '#icon-open'} />
        </svg>
      </span>
    </div>
  );
}

export default connect(
  state => ({
    lockingDocMenu: state.menu.lockingDocMenu,
    toggleDocMenu: state.menu.toggleDocMenu
  }),
  {
    lockingDocMenuCreator,
    toggleDocMenuCreator,
    changeContainerTypeCreator
  }
)(DocMenu);
