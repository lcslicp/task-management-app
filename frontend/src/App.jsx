import './App.css';
import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import TaskPage from './pages/TaskPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />

      {/* protected routes  */}

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/:id' element={<TaskPage />} />
        {/* catch all  */}
        <Route path='*' element={<NotFoundPage />} />

    </Routes>
  );
}

export default App;
