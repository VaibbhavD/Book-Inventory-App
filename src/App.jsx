import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import BookTable from './components/BookTable';
import { ToastContainer } from 'react-toastify';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
      <BookTable />
      <ToastContainer />
    </Router>
  )
}

export default App
