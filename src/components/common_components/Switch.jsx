import React, { useState } from 'react';
import './Switch.scss';

function Switch ({ label, switchCallBack = () => {} }) {
  const [switchStyle, setSwitchStyle] = useState({});
  const [switchCircle, setSwitchCircle] = useState({});

  function handleSwitch () {
    if (!switchStyle.backgroundColor) {
      switchCallBack(true);
      setSwitchStyle({ backgroundColor: '#75c4c2' });
      setSwitchCircle({ left: '21px' });
    } else {
      switchCallBack(false);
      setSwitchStyle({});
      setSwitchCircle({});
    }
  }

  return (
    <button className="switch" onClick={handleSwitch} style={switchStyle}>
      <span className="switch-circle" style={switchCircle}></span>
      <span className="label">{label}</span>
    </button>
  )
}

export default Switch;
