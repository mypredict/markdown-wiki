import React, { useState } from 'react';
import { connect } from 'react-redux';

import { toggleDocMenuCreator, toggleUserMenuCreator } from '../redux/actions';
import Switch from './common_components/Switch';
import './Header.scss';

function Header (props) {
  const {
    lockingDocMenu,
    toggleDocMenu,
    toggleDocMenuCreator,
    lockingUserMenu,
    toggleUserMenu,
    toggleUserMenuCreator
  } = props;
  const [cookie, setCookie] = useState('');

  function controlMenu (menu) {
    menu === 'left' && toggleDocMenuCreator(!toggleDocMenu);
    menu === 'right' && toggleUserMenuCreator(!toggleUserMenu);
  }

  return (
    <header className="app-header">
      <button
        className="button-common button-icon"
        title={lockingDocMenu ? "显隐左菜单" : ""}
        onClick={() => lockingDocMenu && controlMenu('left')}>
        <svg
          className="icon"
          aria-hidden="true"
          style={{
            opacity: lockingDocMenu ? 1 : 0,
            rotate: toggleDocMenu ? '180deg' : '360deg'
          }}>
          <use xlinkHref="#icon-controlMenu" />
        </svg>
      </button>
      <a>markdown多人在线编辑</a>
      <span>{'所在文档名字'}</span>
      <Switch label="实时刷新" />
      <div className="head-container">
        {
          cookie ? <img src={'https://'} alt="已登录"/> :
          <a href={`https://github.com/login/oauth/authorize?client_id=a9a11fbab7c3d5fe46e9&state=${'url'}`} title="github快捷登录">
            <svg className="icon" aria-hidden="true" style={{color: '#333'}}>
              <use xlinkHref="#icon-github" />
            </svg>
          </a>
        }
      </div>
      <button
        className="button-common button-icon"
        title={lockingUserMenu ? "显隐右菜单" : ""}
        onClick={() => lockingUserMenu && controlMenu('right')}>
        <svg
          className="icon"
          aria-hidden="true"
          style={{
            opacity: lockingUserMenu ? 1 : 0,
            rotate: toggleUserMenu ? '360deg' : '180deg'
          }}>
          <use xlinkHref="#icon-controlMenu" />
        </svg>
      </button>
    </header>
  );
}

export default connect(
  state => ({
    lockingDocMenu: state.menu.lockingDocMenu,
    toggleDocMenu: state.menu.toggleDocMenu,
    lockingUserMenu: state.menu.lockingUserMenu,
    toggleUserMenu: state.menu.toggleUserMenu
  }),
  {
    toggleDocMenuCreator,
    toggleUserMenuCreator
  }
)(Header);