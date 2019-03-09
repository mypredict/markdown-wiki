import React from 'react';

import Header from './components/Header';
import Menu from './components/Menu';
import Edit from './components/Edit';
import LayerContainer from './components/LayerContainer';

function App () {
  return (
    <div className="app">
      <Header />
      <Menu />
      <Edit />
      <LayerContainer />
    </div>
  )
}

export default App;
