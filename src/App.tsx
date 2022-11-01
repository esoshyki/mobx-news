import React from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react';

import Counter from './store/counter';
import Articles from './components/News';

function App() {
  return (
    <Articles />
  );
}



export default App;
