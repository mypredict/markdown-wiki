import React from 'react';

import TableList from '../common_components/TableList';
import './Files.scss';

const tableOptions = {
  flex: [3,2,2,1],
  headDownload: true
}
const tableData = {
  columns: ['文件名称', '上传人', '上传时间', '下载'],
  rows: [
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56'],
    ['这是文件的名称', '这是一个姓名', '2018-12-23 24:56']
  ]
}

function upload (e) {
  console.log(e.target.value)
}

function Files () {
  return (
    <div className="files-page">
      <header className="files-message">
        <div className="upload-files-preview">
          上传文件
        </div>
        <div className="add-files" title="添加新的文件">
          <input className="add-files-input" type="file" onChange={upload} />
          <svg className="icon files-icon" aria-hidden="true">
            <use xlinkHref="#icon-add-author" />
          </svg>
        </div>
      </header>
      <TableList
        tableOptions={tableOptions}
        tableData={tableData}
      />
    </div>
  );
}

export default Files;