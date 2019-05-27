import React, { useEffect } from 'react';

import Loading from './common_components/Loading';

function Login (props) {
  useEffect(() => {
    login();
  });

  function login () {
    fetch(`${props.location.pathname}${props.location.search}`, {method: 'GET'})
      .then(response => response.text())
      .then(data => {
        const query = decodeURIComponent(props.location.search.split('state=')[1]) || '';
        data && props.history.push(`/home?${query}`);
      })
      .catch(err => {
        console.log(err)
      });
  }

  const fontStyle = {
    position: 'fixed',
    width: '100%',
    height: '5rem',
    top: '50%',
    textAlign: 'center',
    color: '#33a3a2',
    fontSize: '1.2rem'
  };

  return (
    <div className="login-page">
      <Loading />
      <div style={fontStyle}>正在登陆请稍等...</div>
    </div>
  );
}

export default Login;