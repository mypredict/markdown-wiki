import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { versionNumberCreator } from '../../redux/actions';
import TableList from '../common_components/TableList';
import './Version.scss';

const tableOptions = {
  flex: [1, 2, 3, 2],
  rowClick: true,
  rowsHover: true
}
const defaultData = {
  columns: ['版本号', '提交人', '提交说明', '提交时间'],
  rows: []
}

function Version (props) {
  const { users, versionNumber, versionNumberCreator } = props;
  const [ tableData, setTableData ] = useState(defaultData);

  useEffect(() => {
    if (tableData.rows.length < 1) {
      const rows = users.map((user, index) => {
        return [index + 1, index + 1, user.name, user.note, moment(user.time).format('YYYY-MM-DD hh:mm')];
      });
      setTableData({...tableData, rows});
    }
  });

  function versionCallback (row) {
    versionNumberCreator(row[0]);
  }

  console.log('version')

  return (
    <div className="version-page">
      <header className="version-message">
        <span>当前版本为 : {versionNumber}</span>
      </header>
      <TableList
        tableOptions={tableOptions}
        tableData={tableData}
        callback={versionCallback}
      />
    </div>
  );
}

export default connect(
  state => ({
    users: state.documentMessage.users,
    versionNumber: state.versionNumber
  }),
  {
    versionNumberCreator
  }
)(Version);