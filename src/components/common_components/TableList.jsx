import React, {useState} from 'react';

import Pagination from '../common_components/Pagination';
import './TableList.scss';

/*
  const propsType = {
    tableOptions: {
      flex: [],
      rowsPerPageOptions: 5,
      rowClick: false,
      rowsHover: false,
      headDownload: false
    },
    tableData: {
      columns: [],
      rows: []
    },
    callback: (data) => {}
  }
*/

function TableList (props) {
  const { tableOptions, tableData, callback = () => {} } = props;
  const [startCount, setStartCount] = useState(0);
  const [endCount, setEndCount] = useState(0);

  function paginationCallback (startCount, endCount) {
    setStartCount(startCount);
    setEndCount(endCount);
  }

  function handleDownload () {
    console.log(1)
  }

  return (
    <div className="table-container">
      <ul className="table-list">
        <li className="table-row">
          {
            tableData.columns.map((column, columnIndex) => (
              <span key={columnIndex} style={{flex: tableOptions.flex ? tableOptions.flex[columnIndex] : 1}}>{column}</span>
            ))
          }
        </li>
        {
          tableData.rows.slice(startCount, endCount).map((row, rowIndex) => (
            <li
              key={rowIndex}
              className={`table-row ${tableOptions.rowsHover && "rows-hover"}`}
              onClick={() => tableOptions.rowClick && callback(row)}>
              {
                row.map((column, columnIndex) => {
                  if (tableOptions.rowClick && columnIndex === 0) {
                    return '';
                  }
                  return (
                    <span
                      key={columnIndex}
                      title={column}
                      style={{
                        flex: tableOptions.flex
                          ? tableOptions.rowClick
                            ? tableOptions.flex[columnIndex - 1]
                            : tableOptions.flex[columnIndex]
                          : 1}}>
                      {column}
                    </span>
                  );
                })
              }
              {
                tableOptions.headDownload && (
                  <span style={{flex: 1}}>
                    <button className="button-common button-download" title="下载文件">
                      <svg
                        className="icon icon-download"
                        aria-hidden="true"
                        onClick={() => handleDownload()}>
                        <use xlinkHref="#icon-download" />
                      </svg>
                    </button>
                  </span>
                )
              }
            </li>
          ))
        }
      </ul>
      <Pagination
        count={tableData.rows.length}
        rowsPerPageOptions={tableOptions.rowsPerPageOptions || 5}
        callback={paginationCallback}
      />
    </div>
  );
}

export default TableList;