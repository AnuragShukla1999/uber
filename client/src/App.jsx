import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import UserSignup from './pages/userSignup';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/login' element={<UserLogin/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
