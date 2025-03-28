import React from "react";
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer py-4 mt-auto" style={{ backgroundColor: "#004aad", color: "#f8f9fa" }}>
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        
        {/* Left Side: Copyright */}
        <div>
          <p className="mb-0 fw-bold" style={{ color: "#ffffff" }}>
            © 2025 <span className="fw-bold">Smart Healthcare</span>. All rights reserved.
          </p>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="text-end">
          <p className="fw-bold mb-2 fs-5" style={{ color: "#ffffff" }}>Follow Us</p>
          <div className="d-flex gap-3 justify-content-end">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={26} style={{ color: "#f8f9fa" }} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={26} style={{ color: "#f8f9fa" }} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={26} style={{ color: "#f8f9fa" }} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={26} style={{ color: "#f8f9fa" }} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={26} style={{ color: "#f8f9fa" }} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
