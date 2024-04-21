import Header from './components/header/Header'
import Main from './components/main/Main'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main>
        <Main />
      </main>
      
    </BrowserRouter>
  )
}

export default App
