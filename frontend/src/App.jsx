import './App.css';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes';
import Dashboard from './pages/Dashboard';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';

function App() {

  return (

      <Routes>
        {/* public routes */}
        <Route element={<PublicRoutes />} >
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        </Route>
        {/* protected routes  */}
        <Route path='/' element={<ProtectedRoutes />}>
        <Route path='/dashboard'  element={<Dashboard />} />
        <Route path='/:id' element={<Dashboard />} />
        {/* catch all  */}
        </Route>
      </Routes>

  );
}

export default App;