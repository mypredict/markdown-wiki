import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { ducumentMessageCreator } from '../../redux/actions';
import TableList from '../common_components/TableList';
import './Personal.scss';

const tableOptions = {
  flex: [2, 1],
  rowClick: true,
  rowsHover: true
}
const defaultData = {
  columns: ['文档名称', '创建时间'],
  rows: []
}

function Personal (props) {
  const { documents } = props;
  const [ tableData, setTableData ] = useState(defaultData);

  useEffect(() => {
    if (tableData.rows.length < 1) {
      const rows = documents.map((document) => {
        return [document.joinURL, document.name, moment(document.time).format('YYYY-MM-DD hh:mm')];
      });
      setTableData({...tableData, rows});
    }
  });
  function linkCallback (row) {
    getDocument(row[0]);
  }

  // 获取文档信息
  function getDocument (query) {
    fetch(`/getDocument?${query}`, { method: 'GET', credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        ducumentMessageCreator(data);
        sessionStorage.setItem('query', `?${query}`);
        window.location.reload();
      })
      .catch(err => {
        alert('文档不存在');
      })
  }

  console.log('personal')

  return (
    <div className="personal-page">
      <span className="header">个人参与过的所有文档</span>
      <TableList
        tableOptions={tableOptions}
        tableData={tableData}
        callback={linkCallback}
      />
    </div>
  );
}

export default connect(
  state => ({
    documents: state.userMessage.documents
  })
)(Personal);