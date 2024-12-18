import React from "react";
import { logout, userName } from "../services/authService.ts";

export const Navbar: React.FC = () => {
  return (
    <div className="navbar flex space-between align-center">
      <h3>Hello {userName}!</h3>
      <button className="secondary" onClick={() => { logout() }}>
        Logout
      </button>
    </div>
  );
};
