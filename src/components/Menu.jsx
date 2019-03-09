import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Menu.scss';
import {
  lockingMenuCreator,
  toggleMenuCreator,
  toggleLayerContainerDisplayCreator
} from '../redux/actions';

function Menu (props) {
  const {
    lockingMenu,
    lockingMenuCreator,
    toggleMenu,
    toggleMenuCreator,
    toggleLayerContainerDisplayCreator
  } = props;
  const menuData = [
    { title: '文档成员', iconName: 'member' },
    { title: '历史版本', iconName: 'version' },
    { title: '涉及文件', iconName: 'files' },
    { title: '个人信息', iconName: 'personal'},
    { title: 'markdown语法', iconName: 'markdown' }
  ]

  function handleLockingMenu () {
    lockingMenuCreator(!lockingMenu);
    toggleMenuCreator(!toggleMenu);
  }

  return (
    <div
      className={`menu-page ${!lockingMenu && "hover-menu"}`}
      style={{left: toggleMenu ? 0 : ''}}>
      <menu className="menu-container">
        {
          menuData.map((menu, index) => (
            <NavLink to={`/home/${menu.iconName}`} title={menu.title} key={index}>
              <svg
                className="icon icon-active"
                aria-hidden="true"
                onClick={() => toggleLayerContainerDisplayCreator(true)}>
                <use xlinkHref={`#icon-${menu.iconName}`} />
              </svg>
            </NavLink>
          ))
        }
      </menu>
      <span title="锁定菜单">
        <svg className="icon" aria-hidden="true" onClick={handleLockingMenu}>
          <use xlinkHref={lockingMenu ? '#icon-close' : '#icon-open'} />
        </svg>
      </span>
    </div>
  );
}

export default connect(
  state => ({
    lockingMenu: state.menu.lockingMenu,
    toggleMenu: state.menu.toggleMenu
  }),
  {
    lockingMenuCreator,
    toggleMenuCreator,
    toggleLayerContainerDisplayCreator
  }
)(Menu);
