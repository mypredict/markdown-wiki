import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import DialogBox from './common_components/DialogBox';
import './Edit.scss';

function Edit (props) {
  const { lockingMenu, toggleMenu, versionNumber, userMessage, ducumentMessage } = props;
  const dragLine = useRef(null);
  const editBox = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);  // 鼠标在可以拖动
  const [mouseCoordinate, setMouseCoordinate] = useState(0);  // 鼠标按下时的X坐标
  const [remEditBoxWidth, setRemEditBoxWidth] = useState(0);  // 鼠标按下时编辑框宽度
  const [dragLineBgc, setDragLineBgc] = useState(''); // 鼠标按下时拖动线背景色
  const [editBoxWidth, setEditBoxWidth] = useState('50%');  // 编辑框宽度
  const [editBoxContent, setEditBoxContent] = useState('');  // 编辑框内容
  const [isInput, setIsInput] = useState(false);  // 输入框开始工作

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

  useEffect(() => {
    if (ducumentMessage.users[versionNumber - 1] && !isInput) {
      setEditBoxContent(ducumentMessage.users[versionNumber - 1].content);
    }
  });

  // 中间分界拖动
  function mouseDown (e) {
    if (e.target === dragLine.current) {
      setIsMouseDown(true);
      setMouseCoordinate(e.clientX);
      setRemEditBoxWidth(editBox.current.offsetWidth);
      setDragLineBgc('#eee');
    }
  }

  function mouseMove (e) {
    isMouseDown && setEditBoxWidth(remEditBoxWidth + e.clientX - mouseCoordinate);
  }

  function mouseUp () {
    setIsMouseDown(false);
    setRemEditBoxWidth(editBox.current.offsetWidth);
    setDragLineBgc('');
  }

  function handleTextareaChange (e) {
    setIsInput(true);
    setEditBoxContent(e.target.value)
    document.querySelectorAll('table').forEach((table) => {
      if (!Array.from(table.parentNode.classList).includes('div-table')) {
        const divElement = document.createElement('div');
        divElement.className = 'div-table';
        // table.parentNode.replaceChild(divElement, table);
        // divElement.appendChild(table);
        console.log(table.parentNode.className)
      }
    });
  }

  const [ dialogBoxDisplay, setDialogBoxDisplay ] = useState(false);
  function handleSubmit (note) {
    setDialogBoxDisplay(false);
    if (note) {
      const updateMessage = {
        note,
        joinURL: ducumentMessage.joinURL,
        index: ducumentMessage.users.length + 1,
        content: editBoxContent,
        username: userMessage.name
      }
      fetch('/submit', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updateMessage)
      })
        .then(response => response.text())
        .then(data => {
          if (data === 'submitSuccess') {
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  console.log('edit')

  return (
    <div
      className="edit"
      style={{ paddingLeft: lockingMenu ? toggleMenu ? "5rem" : 0 : 0 }}>
      <DialogBox display={dialogBoxDisplay} input={true} tooltip={"请输入版本介绍信息"} callback={handleSubmit} />
      <textarea
        className="edit-box"
        ref={editBox}
        style={{width: editBoxWidth + 'px'}}
        placeholder="编辑文章..."
        spellCheck="false"
        value={editBoxContent}
        onChange={(e) => handleTextareaChange(e)}>
      </textarea>
      <div className="dragLine" ref={dragLine} style={{background: dragLineBgc}} />
      <div className="preview">
        <ReactMarkdown source={editBoxContent} />
      </div>
      <button
        className="button-common buttom-icon button-submit"
        title="提交"
        onClick={() => setDialogBoxDisplay(true)}>
        <svg
          className="icon"
          aria-hidden="true">
          <use xlinkHref="#icon-upload" />
        </svg>
      </button>
    </div>
  );
}

export default connect(
  state => ({
    lockingMenu: state.menu.lockingMenu,
    toggleMenu: state.menu.toggleMenu,
    versionNumber: state.versionNumber,
    userMessage: state.userMessage,
    ducumentMessage: state.documentMessage
  })
)(Edit);