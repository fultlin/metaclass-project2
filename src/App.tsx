import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import './styles/App.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Main />
      </main>
    </BrowserRouter>
  );
}

export default App;