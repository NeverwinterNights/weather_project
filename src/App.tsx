import React from 'react';

import './App.css';
import { useSelector } from 'react-redux';

import { Header } from './components/header/Header';
import { AppRootStateType } from './state/store';

const App = React.memo(() => {
  console.log('object');

  const theme = useSelector<AppRootStateType, boolean>(state => state.theme.dayNight);

  return (
    <div
      className="App"
      style={theme ? { backgroundColor: '#4fbb65' } : { backgroundColor: 'white' }}
    >
      <Header />
    </div>
  );
});

export default App;
