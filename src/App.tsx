import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import './App.module.scss';

function App() {
  return (
    <HashRouter>
      <Header />
      <main>
        <Main />
      </main>
    </HashRouter>
  );
}

export default App;