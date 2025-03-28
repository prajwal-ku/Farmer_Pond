import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import DashboardNavbar from "./Components/DashboardNavbar";
import Home from "./Components/Home";
import ContactUs from "./Components/ContactUs";
import AdminLogin from "./Components/AdminLogin";
import DoctorLogin from "./Components/DoctorLogin";
import PatientLogin from "./Components/PatientLogin";
import AdminRegister from "./Components/AdminRegister";
import DoctorRegister from "./Components/DoctorRegister";
import PatientRegister from "./Components/PatientRegister";
import AdminDashboard from "./Components/AdminDashboard";
import DoctorDashboard from "./Components/DoctorDashboard";
import PatientDashboard from "./Components/PatientDashboard";
import Footer from "./Components/Footer";

function Layout() {
  const location = useLocation();

  const dashboardRoutes = [
    "/admin-dashboard", "/doctor-dashboard", "/patient-dashboard"
  ];
  const isDashboard = dashboardRoutes.includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      {isDashboard ? <DashboardNavbar /> : <Navbar />}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Authentication Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/doctor-register" element={<DoctorRegister />} />
          <Route path="/patient-register" element={<PatientRegister />} />

          {/* Dashboard Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
        </Routes>
      </div>
      {!isDashboard && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
