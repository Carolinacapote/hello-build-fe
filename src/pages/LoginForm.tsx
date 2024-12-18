import React, { useState } from "react";
import { login } from "../services/authService.ts";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      login(username, password);
      navigate("/profile");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="main-container background-gradient flex align-center justify-center">
      <div className="card sm-card">
        <form onSubmit={handleLogin}>
          <figure className="flex justify-center">
            <img src="./images/github-logo.png" alt="GitHub Logo" width={150} />
          </figure>
          <h2 className="text-center">Login</h2>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="mt-16"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center padding-20">
            <Link to="/signup">SIGN UP</Link>
          </div>
          <button
            className="secondary w-100"
            type="submit"
            disabled={!isFormValid}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
