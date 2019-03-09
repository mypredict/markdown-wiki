import React, { useState } from 'react';

import './DialogBox.scss';

function DialogBox (props) {
  const { display = false, input = false, tooltip, callback = () => {} } = props;
  const [ inputs, setInputs ] = useState('');

  function handleSubmit () {
    if (!input) {
      return callback(true);
    }
    inputs !== '' ? callback(inputs) : alert('请输入内容');
  }

  return (
    <div className="dialog-box" style={{display: display ? "block" : "none"}}>
      <div className="dialog-box-container">
        <div className="tooltip">
          {tooltip}
          {
            input && (
              <input
                type="text"
                autoFocus
                placeholder="输入信息..."
                onKeyPress={(e) => e.which === 13 && handleSubmit()}
                onChange={(e) => setInputs(e.target.value)}/>
            )
          }
        </div>
        <div className="active">
          <button className="button-common button-dialog" onClick={() => callback(false)}>取消</button>
          <button className="button-common button-dialog" onClick={handleSubmit}>确定</button>
        </div>
      </div>
    </div>
  );
}

export default DialogBox;