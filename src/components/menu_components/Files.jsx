import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import TableList from '../common_components/TableList';
import './Files.scss';

const tableOptions = {
  flex: [3,2,2,1],
  headDownload: true
}
const defaultData = {
  columns: ['文件名称', '上传人', '上传时间', '下载'],
  rows: []
}

function Files (props) {
  const { username, joinURL, docFiles } = props;
  const [ tableData, setTableData ] = useState(defaultData);
  const [filesSet, setFilesSet] = useState([]);
  const [filesProgressSet, setFilesProgressSet] = useState({});

  useEffect(() => {
    if (tableData.rows.length < 1) {
      const rows = docFiles.map((file) => {
        return [file.fileName, file.username, moment(file.time).format('YYYY-MM-DD hh:mm')];
      });
      setTableData({...tableData, rows});
    }
  });

  function conversionSize (size) {
    if (size < 2 ** 10) {
      return `${size}Byte`;
    }
    if (size < 2 ** 20) {
      return `${(size / 2 ** 10).toFixed(2)}KB`;
    }
    if (size < 2 ** 30) {
      return `${(size / 2 ** 20).toFixed(2)}MB`;
    }
    return `${(size / 2 ** 30).toFixed(2)}GB`;
  }

  function inputFiles (e) {
    addFiles(e.target.files);
    e.target.value = null;
  }
  
  function dropFiles (e) {
    // drop 事件默认是用链接形式进行打开, 因此将其禁掉
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  }
  
  function addFiles (files) {
    const newFiles = removeLocalRepeatFiles(files);
    newFiles.forEach((file) => uploadFile(file));
    setFilesSet([...newFiles, ...filesSet]);
  }

  // 去除本地正在上传与服务器重复文件
  function removeLocalRepeatFiles (files) {
    const localFilesNameSet = filesSet.map((file) => file.name);
    const serverFilesNameSet = docFiles.map((file) => file.fileName);
    return [...files].filter((file) => {
      if (localFilesNameSet.includes(file.name)) {
        console.log(`${file.name}正在上传`);
        return false;
      }
      if (serverFilesNameSet.includes(file.name)) {
        console.log(`${file.name}存在同名文件`);
        return false;
      }
      return true;
    });
  }

  function removeUploadFile (fileName) {
    const newFilesSet = filesSet.filter((file) => file.name !== fileName);
    setFilesSet(newFilesSet);
  }

  function uploadFile (file) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('folder', joinURL);
    formData.append('file', file);
    xhr.open('POST', '/uploadFiles');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (JSON.parse(xhr.responseText).status === 'ok') {
          return uploadFileSuccess(file);
        }
        if (JSON.parse(xhr.responseText).status === 'repeat') {
          return uploadFileRepeat(file);
        }
        uploadFileFail(file);
      }
    }
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        updateUploadProgress(file, percentComplete);
      }
    }
    xhr.send(formData);
  }

  function updateUploadProgress (file, percentComplete) {
    setFilesProgressSet(Object.assign({}, filesProgressSet, {[file.name]: percentComplete}));
  }

  function uploadFileSuccess (file) {
    removeUploadFile(file.name);
  }

  function uploadFileRepeat (file) {
    alert(`此文档文件中已存在 ${file.name} 命名文档`);
    removeUploadFile(file.name);
  }

  function uploadFileFail (file) {
    alert(`${file.name}上传失败`);
    removeUploadFile(file.name);
  }

  function downloadCallback (file) {
    window.open(`http://192.168.31.222:8000/download?joinURL=${encodeURIComponent(joinURL)}&filename=${file[0]}`, '_self');
  }

  return (
    <div className="files-page">
      <header className="files-message">
        <div
          className="upload-files-preview"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => dropFiles(e)}>
          {
            filesSet.length <= 0
              ? <div className="file-drop-tooltip">可直接拖动文件到本区域上传</div>
              : filesSet.map((file, index) => 
                  <div className="file-upload-progress" key={index}>
                    <div className="file-upload-message">
                      <div className="file-name" title={file.name}>{file.name}</div>
                      <div className="file-size-close">
                        <span>{conversionSize(file.size)}</span>
                        <svg
                          className="icon icon-close"
                          aria-hidden="true"
                          onClick={() => removeUploadFile(file.name)}>
                          <use xlinkHref="#icon-close-page" />
                        </svg>
                      </div>
                    </div>
                    <div className="progress-track">
                      <div className="progress" style={{width: `${filesProgressSet[file.name]}%`}}></div>
                    </div>
                  </div>
                )
          }
        </div>
        <div className="add-files" title="添加新的文件">
          <input className="add-files-input" type="file" multiple onChange={inputFiles} />
          <svg className="icon files-icon" aria-hidden="true">
            <use xlinkHref="#icon-add-author" />
          </svg>
        </div>
      </header>
      <TableList
        tableOptions={tableOptions}
        tableData={tableData}
        callback={downloadCallback}
      />
    </div>
  );
}

export default connect(
  state => ({
    docName: state.documentMessage.name,
    username: state.userMessage.name,
    joinURL: state.documentMessage.joinURL,
    docFiles: state.documentMessage.files
  })
)(Files);