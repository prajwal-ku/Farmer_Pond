import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const closeDropdown = () => setIsOpen(false);

  return (
    <motion.nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        backgroundColor: "#004aad", // Professional blue for healthcare
        height: "80px",
      }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="container-fluid">
        {/* Logo shifted to the left */}
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ marginLeft: "20px" }}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            width="140" 
            height="60" 
            className="me-2"
            style={{ objectFit: "contain" }}
          />
          <span style={{ fontSize: "1.5rem", color: "white", fontWeight: "bold", marginLeft: "15px"}}>
            Smart Doctor-Patient Consultation
          </span>
        </Link>

        {/* Navbar Toggler for Mobile View */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="d-flex gap-2 me-3">
            <Link 
              className="btn"
              to="/" 
              style={{ 
                transition: "0.3s",
                backgroundColor: "white",
                color: "#004aad",
                border: "1px solid #004aad",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#007bff";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#004aad";
              }}
            >
              Home
            </Link>
            <Link 
              className="btn" 
              to="/about" 
              style={{ 
                transition: "0.3s",
                backgroundColor: "white",
                color: "#004aad",
                border: "1px solid #004aad",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#007bff";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#004aad";
              }}
            >
              About Us
            </Link>
            <Link 
              className="btn" 
              to="/contact" 
              style={{ 
                transition: "0.3s",
                backgroundColor: "white",
                color: "#004aad",
                border: "1px solid #004aad",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#007bff";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#004aad";
              }}
            >
              Contact Us
            </Link>
            
            {/* Dropdown for Login / Register */}
            <div className="dropdown">
              <button 
                className="btn dropdown-toggle" 
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{ 
                  transition: "0.3s",
                  backgroundColor: "white",
                  color: "#004aad",
                  border: "1px solid #004aad",
                  fontWeight: "bold",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#007bff";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "#004aad";
                }}
              >
                Login / Register
              </button>
              <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/admin-login" 
                    onClick={closeDropdown}
                    style={{ transition: "0.3s", color: "#004aad", fontWeight: "bold" }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#007bff";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                      e.target.style.color = "#004aad";
                    }}
                  >
                    Admin Login
                  </Link>
                </li>
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/doctor-login" 
                    onClick={closeDropdown}
                    style={{ transition: "0.3s", color: "#004aad", fontWeight: "bold" }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#007bff";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                      e.target.style.color = "#004aad";
                    }}
                  >
                    Doctor Login
                  </Link>
                </li>
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/patient-login" 
                    onClick={closeDropdown}
                    style={{ transition: "0.3s", color: "#004aad", fontWeight: "bold" }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#007bff";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                      e.target.style.color = "#004aad";
                    }}
                  >
                    Patient Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
