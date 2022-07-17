import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import { UserContext } from './context/userContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import TaskPage from './pages/TaskPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const [loggedUser, setLoggedUser] = useState();

  return (
    <UserContext.Provider value={ [loggedUser, setLoggedUser] }>
      <Routes>
        {/* public routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/*' element={<NotFoundPage />} />

        {/* protected routes  */}
        <Route path='/' element={<ProtectedRoutes />}>
        <Route path='/dashboard'  element={<Dashboard />} />
        <Route path='/:id' element={<TaskPage />} />
        {/* catch all  */}
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
