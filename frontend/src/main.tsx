
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';


ReactDOM.render(
  <BrowserRouter>

      <Routes>
       <Route path='/*' element={<App />} />
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
