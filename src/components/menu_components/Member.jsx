import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import TableList from '../common_components/TableList';
import './Member.scss';

const defaultOptions = {
  flex: [2, 2, 1]
}
const defaultData = {
  columns: ['成员姓名', '加入时间', '编辑次数'],
  rows: []
}

function Member (props) {
  const { avatar_url, username, joinURL, users } = props;
  const [ tableData, setTableData ] = useState(defaultData);
  const [ usersInit, setUsersInit ] = useState({});

  // 取最小时间
  function sortTime (a, b) {
    if (moment(a).format('YYYYMMDDHHMM') < moment(b).format('YYYYMMDDHHMM')) {
      return a;
    }
    return b;
  }

  // 初始化数据
  useEffect(() => {
    const usersSort = {};
    users.forEach((user) => {
      if (usersSort[user.name]) {
        return usersSort[user.name] = {
          count: usersSort[user.name].count + 1,
          time: sortTime(user.time, usersSort[user.name].time)
        };
      }
      usersSort[user.name] = {
        count: 1,
        time: user.time
      };
    });
    setUsersInit(usersSort);
    const rows = Object.keys(usersSort).map((username) => {
      return [username, moment(usersSort[username].time).format('YYYY-MM-DD HH:MM'), usersSort[username].count];
    });
    setTableData({...tableData, rows});
  }, [users]);

  function copyLink () {
    const input = document.createElement('input');
    input.value = `http://localhost:3000/home/?${joinURL}`;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  console.log('member')

  return (
    <div className="member-page">
      {
        joinURL === '' ? <div style={{textAlign: "center"}}>请先创建或者加入一个文档</div>
        : (
          <div>
            <header className="header">
              <div className="head">
                <img src={avatar_url} alt="头像" />
                <ul className="message">
                  <li>个人姓名 : {username}</li>
                  <li>加入时间 : {usersInit[username] && moment(usersInit[username].time).format('YYYY-MM-DD HH:MM')}</li>
                  <li>编辑次数 : {usersInit[username] && usersInit[username].count}</li>
                </ul>
              </div>
              <div className="add-author" title="添加新的成员" onClick={copyLink}>
                <button className="button-common button-add-author">
                  <svg className="icon member-icon" aria-hidden="true">
                    <use xlinkHref="#icon-add-author" />
                  </svg>
                </button>
              </div>
            </header>
            <div className="member-container">
              <TableList
                tableOptions={defaultOptions}
                tableData={tableData}
              />
            </div>
          </div>
        )
      }
    </div>
  );
}

export default connect(
  state => ({
    avatar_url: state.userMessage.avatar_url,
    username: state.userMessage.name,
    joinURL: state.documentMessage.joinURL,
    users: state.documentMessage.users
  })
)(Member);