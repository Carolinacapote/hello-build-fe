import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignUpForm } from "./pages/SignUpForm.tsx";
import { LoginForm } from "./pages/LoginForm.tsx";
import { Profile } from "./pages/Profile.tsx";
import { isAuthenticated } from "./services/authService.ts";
import './styles/main.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/profile"
          element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/profile" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
