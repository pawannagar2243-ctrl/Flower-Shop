import { useState } from 'react'
import Navbar from './Navbar';
import {BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Footer from './Footer';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
	  <Footer/>	
    </BrowserRouter>
  )
}

export default App
