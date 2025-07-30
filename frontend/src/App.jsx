import "./App.css";
import { Routes, Route } from "react-router-dom";

import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Dashboard from "./pages/Dashboard";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EditProfile from "./components/EditProfile";
import DemoLoadingScreen from "./pages/DemoLoadingScreen";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/demo-loading" element={<DemoLoadingScreen />}></Route>
      </Route>
      {/* protected routes  */}
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:id" element={<Dashboard />} />
        <Route path="/profile" element={<EditProfile />} />
        {/* catch all  */}
      </Route>
    </Routes>
  );
}

export default App;
