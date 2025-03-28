import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DashboardNavbar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole"); // Clear user session
    navigate("/"); // Redirect to home
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          {userRole === "admin" && "Admin Dashboard"}
          {userRole === "doctor" && "Doctor Dashboard"}
          {userRole === "patient" && "Patient Dashboard"}
        </Link>
        <div className="d-flex">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
