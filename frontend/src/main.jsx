import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App';
import SignupPage from './pages/SignupPage';
// import LoginPage from './pages/LoginPage';

ReactDOM.render(
  <BrowserRouter>
  <Routes>
       <Route path="/" element={<App />} />
       <Route path="/signup" element={<SignupPage />} />
       {/* <Route path="/login" element={<LoginPage />} /> */}
  </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)

