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
        backgroundColor: "#F4E38A", // Lighter shade of gold
        height: "80px",
      }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="container-fluid">
        
        {/* Logo shifted to the left */}
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ marginLeft: "20px" }}>
          <img 
            src="/AgriSure.png" 
            alt="Logo" 
            width="160" 
            height="140" 
            className="me-2"
            style={{ objectFit: "contain" }}
          />
          <span style={{ fontSize: "1.5rem", color: "#0B3D02", fontWeight: "bold", marginLeft: "20px"}}>Smart Water Monitoring for Your Farm-Pond!</span>
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
                backgroundColor: "#0B3D02",
                color: "white",
                border: "1px solid black",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#146D10"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#0B3D02"}
            >
              Home
            </Link>
            <Link 
              className="btn" 
              to="/about" 
              style={{ 
                transition: "0.3s",
                backgroundColor: "#0B3D02",
                color: "white",
                border: "1px solid black",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#146D10"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#0B3D02"}
            >
              About Us
            </Link>
            <Link 
              className="btn" 
              to="/contact" 
              style={{ 
                transition: "0.3s",
                backgroundColor: "#0B3D02",
                color: "white",
                border: "1px solid black",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#146D10"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#0B3D02"}
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
                  backgroundColor: "#0B3D02",
                color: "white",
                border: "1px solid black",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#146D10"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#0B3D02"}
              >
                Login / Register
              </button>
              <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/login" 
                    onClick={closeDropdown}
                    style={{ transition: "0.3s", color: "black" }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#146D10"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/register" 
                    onClick={closeDropdown}
                    style={{ transition: "0.3s", color: "black" }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#146D10"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
                  >
                    Register
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
