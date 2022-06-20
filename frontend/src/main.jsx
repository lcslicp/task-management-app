import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import InProgressTab from './components/tabcomponents/InProgressTab';
import ToDoTab from './components/tabcomponents/ToDoTab';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
  <Routes>
       <Route path="/" element={<App />} />
       <Route path="/todo" element={<ToDoTab />} />
       <Route path="/inprogress" element={<InProgressTab />} />
  </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)

