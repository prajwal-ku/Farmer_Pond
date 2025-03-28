import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";



function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Store error message
  const [loggedInMessage, setLoggedInMessage] = useState(""); // For showing login success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submitting
    setLoggedInMessage(""); // Clear the message if already shown

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Show login success message
        setLoggedInMessage("Logged in successfully!");

        // Delay redirection by 2 seconds to show the success message
        setTimeout(() => {
          localStorage.setItem("token", data.token); // Store JWT token
          navigate("/dashboard"); // Redirect to Dashboard
        }, 1000); // 1-second delay
      } else {
        setError(data.message); // Show error from backend
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="container d-flex justify-content-center" style={{ marginTop: "120px" }}>
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>} {/* Show error if any */}
        {loggedInMessage && <div className="alert alert-success">{loggedInMessage}</div>} {/* Show login success message */}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="form-control mb-2"
          />

          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="btn btn-success w-100">Login</button>

        </form>

        <p className="mt-3 text-center">
          Don't have an account? <a href="/register" className="text-primary">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
