import React from 'react';

import Header from './components/Header';
import DocMenu from './components/DocMenu';
import UserMenu from './components/UserMenu';
import Edit from './components/Edit';
import DocUserContainer from './components/DocUserContainer';

function App () {
  return (
    <div className="app">
      <Header />
      <DocMenu />
      <UserMenu />
      <Edit />
      <DocUserContainer />
    </div>
  )
}

export default App;
