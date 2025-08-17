import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import PublicRoutes from "./components/routes/PublicRoutes";
import Dashboard from "./pages/Dashboard";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DemoLoadingScreen from "./components/ui-states/DemoLoadingScreen";
import LogoutLoadingUI from "./components/ui-states/LogoutLoadingUI";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<PublicRoutes />}>
        <Route index element={<Navigate to="/signup" replace />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="demo-loading" element={<DemoLoadingScreen />} />
      </Route>
      {/* protected routes  */}
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path=":id" element={<Dashboard />} />
        <Route path="profile" element={<Dashboard />} />
        <Route path="logging-out" element={<LogoutLoadingUI />} />
        {/* catch all  */}
      </Route>
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}

export default App;
