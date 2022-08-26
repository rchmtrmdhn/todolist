import React from 'react'
import ReactDOM from 'react-dom/client'
import Todolist from './Todolist'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from './About'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Todolist/>} />
      <Route path="/about" element={<About/>} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
