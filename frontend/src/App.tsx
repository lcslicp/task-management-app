import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Dashboard from "./pages/Dashboard";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DemoLoadingScreen from "./pages/DemoLoadingScreen";

function App() {
  return (
    <Routes>
      {/* redirect root path to /signup */}
      <Route path="/" element={<Navigate to="/signup" replace />} />
      {/* public routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/demo-loading" element={<DemoLoadingScreen />} />
      </Route>
      {/* protected routes  */}
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:id" element={<Dashboard />} />
        <Route path="/profile" element={<Dashboard />} />
        {/* catch all  */}
      </Route>
    </Routes>
  );
}

export default App;
