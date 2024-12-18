import React, { useState } from "react";
import { signUp } from "../services/authService.ts";
import { useNavigate } from "react-router-dom";

export const SignUpForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();

  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      username.trim() !== "" &&
      password.trim() !== "" &&
      isEmailValid
    );
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Simple email validation
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        signUp({ firstName, lastName, email, username, password });
        alert("Usuario registrado exitosamente.");
        navigate("/login");
      } catch (error: any) {
        console.log(error)
        alert(error.message);
      }
    }
  };

  const backToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="main-container background-gradient flex align-center justify-center">
      <div className="card sm-card">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-column gap-16">
          <input placeholder="First Name*" value={firstName}
            onChange={(e) => setFirstName(e.target.value)} required />
          <input placeholder="Last Name*" value={lastName}
            onChange={(e) => setLastName(e.target.value)} required />
          <input placeholder="Email*" value={email}
            onChange={handleEmailChange} required
            className={!isEmailValid ? "invalid-input" : ""} />
          {!isEmailValid && (
            <small className="error-message">Please enter a valid email.</small>
          )}
          <input placeholder="Username*" value={username}
            onChange={(e) => setUsername(e.target.value)} required />
          <input placeholder="Password*" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            required />
          {/* Buttons */}
          <div className="flex gap-10 mt-16">
            <button type="button" onClick={backToLogin} className="primary-outline w-100">
              Back
            </button>
            <button type="submit" className="secondary w-100" disabled={!isFormValid()}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
