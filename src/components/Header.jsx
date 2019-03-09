import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { toggleMenuCreator, userMessageCreator, ducumentMessageCreator } from '../redux/actions';
import DialogBox from './common_components/DialogBox';
import Loading from './common_components/Loading';
import './Header.scss';

function Header (props) {
  const {
    lockingMenu,
    toggleMenu,
    avatar_url,
    username,
    documentName,
    joinURL,
    toggleMenuCreator,
    userMessageCreator,
    ducumentMessageCreator
  } = props;
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    // 登录后获取个人信息
    if (document.cookie && avatar_url === '') {
      getUserMessage();
    }
    const query = decodeURI(window.location.search);
    // 登陆后通过链接加入文档
    if (document.cookie && query) {
      joinDocument(query);
    }
    // 登陆后还没有文档信息时从sessionStorage拿
    if (document.cookie && joinURL === '' && !query && sessionStorage['query']) {
      getDocument(sessionStorage['query']);
    }
  });

  // 获取个人信息
  function getUserMessage () {
    fetch('/user', { method: 'GET', credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        data && userMessageCreator(data);
      })
      .catch(err => {
        alert('请重新登录');
      });
  }

  // 加入新的文档
  function joinDocument (query) {
    fetch(`/join${query}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'isHave') {
          return getDocument(query);
        }
        if (data === 'noDucument') {
          alert('文档不存在');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  // 获取文档信息
  function getDocument (query) {
    fetch(`/getDocument${query}`, { method: 'GET', credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        ducumentMessageCreator(data);
        sessionStorage.setItem('query', query);
      })
      .catch(err => {
        alert('文档不存在');
      })
  }

  // 登出
  function handleLogout () {
    fetch('/logout', { method: 'GET' })
      .then(response => response.text())
      .then(data => {
        data && window.location.reload();
      });
  }

  // 创建新文章
  const [ dialogBoxDisplay, setDialogBoxDisplay ] = useState(false);
  function dialogBoxCallback (value) {
    if (value && document.cookie) {
      setLoading(true);
      fetch('/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({name: value, username })
      })
        .then(response => response.text())
        .then(data => {
          if (data === 'repeat') {
            alert('文档名重复了');
          } else if (data === 'serverError') {
            alert('服务器错误');
          } else {
            getDocument(`?${data}`);
          }
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          alert('创建失败');
        });
    }
    setDialogBoxDisplay(false);
  }

  console.log('header');

  return (
    <header className="app-header">
      { loading && <Loading /> }
      <DialogBox display={dialogBoxDisplay} input={true} tooltip={'请输入文档名称'} callback={dialogBoxCallback} />
      <button
        className="button-common button-icon"
        title={lockingMenu ? "显隐左菜单" : ""}
        onClick={() => lockingMenu && toggleMenuCreator(!toggleMenu)}>
        <svg
          className="icon"
          aria-hidden="true"
          style={{
            opacity: lockingMenu ? 1 : 0,
            rotate: toggleMenu ? '180deg' : '360deg'
          }}>
          <use xlinkHref="#icon-controlMenu" />
        </svg>
      </button>
      <span>markdown多人在线编辑</span>
      {/* <button className="button-common button-create" title="查看未提交的保存">
        {documentName}
      </button> */}
      <span>{documentName}</span>
      <button
        className="button-common button-create"
        onClick={() => document.cookie ? setDialogBoxDisplay(true) : alert("请登录")}>
        创建新文档
      </button>
      <div className="head-container">
        {
          document.cookie
            ? (
              <div className="head">
                <img src={avatar_url} alt="已登录" />
                <div className="logout-container">
                  <button
                    className="button-common button-logout"
                    onClick={handleLogout}>
                    注销
                  </button>
                </div>
              </div>
            )
            : (
              <a href={`https://github.com/login/oauth/authorize?client_id=a9a11fbab7c3d5fe46e9&state=${'url'}`} title="github快捷登录">
                <svg className="icon" aria-hidden="true" style={{color: '#333'}}>
                  <use xlinkHref="#icon-github" />
                </svg>
              </a>
            )
        }
      </div>
    </header>
  );
}

export default connect(
  state => ({
    lockingMenu: state.menu.lockingMenu,
    toggleMenu: state.menu.toggleMenu,
    avatar_url: state.userMessage.avatar_url,
    username: state.userMessage.name,
    documentName: state.documentMessage.name,
    joinURL: state.documentMessage.joinURL
  }),
  {
    toggleMenuCreator,
    userMessageCreator,
    ducumentMessageCreator
  }
)(Header);