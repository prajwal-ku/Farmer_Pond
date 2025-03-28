import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css"; // Ensure you have styles for better UI

const Home = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  const [searchText, setSearchText] = useState("");
  const handleInputChange = (e) => {
    console.log("Typing:", e.target.value); // Debugging output
    setSearchText(e.target.value);
  };

  return (
    <div className="home-container">
      {/* Search Bar */}
      <div className="search-container">
        <input type="text" placeholder="Search doctors, clinics, hospitals, etc."  value={searchText}
        onChange={handleInputChange}/>
        <button>🔍</button>
      </div>

      {/* Service Cards */}
      <div className="services">
        <div className="service-card" onClick={() => navigate("/ai-symptoms")}>
          <img src="patient.png" alt="Find symptoms" />
          <h3>Know about your symptoms</h3>
        </div>

        <div className="service-card" onClick={() => navigate("/appointment")}>
          <img src="appointment.png" alt="appointment" />
          <h3>Book an Appointment</h3>
        </div>

        <div className="service-card" onClick={() => navigate("/find-doctors")}>
          <img src="doctor.png" alt="Find Doctors" />
          <h3>Find Doctors Near You</h3>
        </div>
      </div>
    </div>
    
  );
};

export default Home;