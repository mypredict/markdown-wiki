import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import './Edit.scss';
import Loading from './common_components/Loading';

function Edit (props) {
  const {
    lockingDocMenu,
    toggleDocMenu,
    lockingUserMenu,
    toggleUserMenu
  } = props;
  const dragLine = useRef(null);
  const editBox = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);  // 鼠标在可以拖动
  const [mouseCoordinate, setMouseCoordinate] = useState(0);  // 鼠标按下时的X坐标
  const [remEditBoxWidth, setRemEditBoxWidth] = useState(0);  // 鼠标按下时编辑框宽度
  const [editBoxWidth, setEditBoxWidth] = useState('50%');  // 编辑框宽度
  const [editBoxContent, setEditBoxContent] = useState(''); // 编辑框内容

  useEffect(() => {
    document.documentElement.addEventListener('mousedown', mouseDown);
    document.documentElement.addEventListener('mousemove', mouseMove);
    document.documentElement.addEventListener('mouseup', mouseUp);
    return () => {
      document.documentElement.removeEventListener('mousedown', mouseDown);
      document.documentElement.removeEventListener('mousemove', mouseMove);
      document.documentElement.removeEventListener('mouseup', mouseUp);
    };
  });

  // 中间分界拖动
  function mouseDown (e) {
    if (e.target === dragLine.current) {
      setIsMouseDown(true);
      setMouseCoordinate(e.clientX);
      setRemEditBoxWidth(editBox.current.offsetWidth);
    }
  }

  function mouseMove (e) {
    isMouseDown && setEditBoxWidth(remEditBoxWidth + e.clientX - mouseCoordinate);
  }

  function mouseUp () {
    setIsMouseDown(false);
    setRemEditBoxWidth(editBox.current.offsetWidth);
  }

  return (
    <div
      className="edit"
      style={{
        paddingLeft: lockingDocMenu ? toggleDocMenu ? '5rem' : 0 : 0,
        paddingRight: lockingUserMenu ? toggleUserMenu ? '5rem' : 0 : 0
      }}
    >
      {/* <Loading /> */}
      <textarea
        className="edit-box"
        ref={editBox}
        style={{width: editBoxWidth + 'px'}}
        placeholder="编辑文章..."
        value={editBoxContent}
        onChange={(e) => setEditBoxContent(e.target.value)}>
      </textarea>
      <div className="dragLine" ref={dragLine}></div>
      <div className="preview" style={{marginRight: toggleUserMenu ? 0 : '0.5rem'}}>
        <ReactMarkdown source={editBoxContent} />
      </div>
    </div>
  );
}

export default connect(
  state => ({
    lockingDocMenu: state.menu.lockingDocMenu,
    toggleDocMenu: state.menu.toggleDocMenu,
    lockingUserMenu: state.menu.lockingUserMenu,
    toggleUserMenu: state.menu.toggleUserMenu
  })
)(Edit);