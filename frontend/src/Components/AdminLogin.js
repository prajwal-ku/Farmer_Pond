import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        role: "admin",
      });

      if (response.status === 200) {
        setMessage(" Login Successful! Redirecting to Admin Dashboard...");
        localStorage.setItem("adminToken", response.data.token);
        setTimeout(() => navigate("/admin-dashboard"), 2000);
      }
    } catch (err) {
      setError(" Invalid Credentials! Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", marginTop: "80px" }}>
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h2 className="text-center text-primary">Admin Login</h2>
        {message && <div className="alert alert-success text-center">{message}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <div className="input-group">
              <input 
                type={passwordVisible ? "text" : "password"} 
                className="form-control" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <p className="mt-3 text-center">
          New Admin? <Link to="/admin-register">Register Here</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
