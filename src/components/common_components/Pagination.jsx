import React, { useState, useEffect } from 'react';

import './Pagination.scss';

function Pagination (props) {
  const { count = 0, rowsPerPageOptions = 5, callback = () => {} } = props;
  const [countPage, setCountPage] = useState(1);      // 总页数
  const [currentPage, setCurrentPage] = useState(1);  // 当前页
  const [skipPage, setSkipPage] = useState(1);        // 跳转框显示数
  const [rowsPerPage, setRowsPerPage] = useState(5);  // 每页行数

  useEffect(() => {
    callback(0, rowsPerPageOptions);
    setRowsPerPage(rowsPerPageOptions);
    setCountPage(Math.ceil(count / rowsPerPageOptions) || 1);
  }, [count, rowsPerPageOptions]);
  
  // 每页行数
  function changeRowsPerPage (e) {
    setRowsPerPage(Number(e.target.value));
    setCountPage(Math.ceil(count / Number(e.target.value)));
    setCurrentPage(Math.ceil(((currentPage - 1) * rowsPerPage + 1) / Number(e.target.value)));
    setSkipPage(Math.ceil(((currentPage - 1) * rowsPerPage + 1) / Number(e.target.value)));
  }

  // 跳转页面
  function handlePageSkip (e) {
    if (~~e.target.value <= 0) {
      setCurrentPage(1);
      setSkipPage(0);
    } else {
      setCurrentPage(Math.min(~~e.target.value, countPage));
      setSkipPage(Math.min(~~e.target.value, countPage));
    }
  }

  // 前进后退
  function switchPage (num) {
    if (currentPage + num > 0 && currentPage + num <= countPage) {
      setCurrentPage(currentPage + num);
      setSkipPage(currentPage + num);
    }
  }

  useEffect(() => {
    callback((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  }, [countPage, currentPage, rowsPerPage]);

  console.log('pagination');
  return (
    <div className="pagination">
      <div className="page-count">
        <span>每页个数 :</span>
        <select name="rowsPerPage" value={rowsPerPage} onChange={changeRowsPerPage}>
          <option>5</option>
          <option>10</option>
          <option>20</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
      <div className="page-skip">
        <span>跳转到 :</span>
        <input type="text" value={skipPage} onChange={handlePageSkip} />
      </div>
      <div className="page-nav">
        <button
          className="button-common button-icon"
          onClick={() => switchPage(-1)}>
          <svg
            className="icon pagination-icon"
            aria-hidden="true"
            style={{color: currentPage <= 1 && '#bbb'}}>
            <use xlinkHref="#icon-pagination-last" />
          </svg>
        </button>
        <span>{currentPage}/{countPage}</span>
        <button className="button-common button-icon"
          onClick={() => switchPage(1)}>
          <svg
            className="icon pagination-icon"
            aria-hidden="true"
            style={{color: currentPage >= countPage && '#bbb'}}>
            <use xlinkHref="#icon-pagination-next" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;