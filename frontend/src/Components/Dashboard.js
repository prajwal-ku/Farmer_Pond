import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { io } from "socket.io-client";

const socket = io("http://192.168.32.187:5000"); // WebSocket connection

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [ponds, setPonds] = useState([]);
  const [selectedPond, setSelectedPond] = useState(null);
  const [showAddPond, setShowAddPond] = useState(false);
  const [pondData, setPondData] = useState({ name: "", length: "", width: "", depth: "" });
  const [sensorData, setSensorData] = useState({ pH: "--", tds: "--", waterLevel: [] });

  // Check authentication and load ponds
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedToken);
      const storedPonds = JSON.parse(localStorage.getItem(`ponds_${decodedToken.email}`)) || [];
      setPonds(storedPonds);

      // Auto-select pond with ID 476655
      const preselectedPond = storedPonds.find((pond) => pond.id === 476655);
      if (preselectedPond) {
        setSelectedPond(preselectedPond);
      }
    } catch (error) {
      console.error("Token error:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // WebSocket listener for sensor data
  useEffect(() => {
    socket.on("sensorData", (data) => {
      console.log("Received sensor data:", data);
      if (selectedPond?.id === 476655) {
        setSensorData({
          pH: data.pH,
          tds: data.tds,
          waterLevel: [...sensorData.waterLevel, data.waterLevel],
        });
      }
    });

    return () => socket.off("sensorData");
  }, [selectedPond, sensorData.waterLevel]);

  // Reset sensor data when a different pond is selected
  useEffect(() => {
    if (selectedPond?.id !== 476655) {
      setSensorData({ pH: "--", tds: "--", waterLevel: [] });
    }
  }, [selectedPond]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddPond = () => setShowAddPond(true);

  const generatePondId = () => Math.floor(100000 + Math.random() * 900000);

  const handleSubmitPond = () => {
    if (!pondData.name || !pondData.length || !pondData.width || !pondData.depth) {
      alert("Please fill all fields!");
      return;
    }

    const newPond = {
      id: generatePondId(),
      name: pondData.name,
      length: pondData.length,
      width: pondData.width,
      depth: pondData.depth,
      waterLevel: [],
      pH: "--",
      tds: "--",
    };

    const updatedPonds = [...ponds, newPond];
    setPonds(updatedPonds);
    localStorage.setItem(`ponds_${user.email}`, JSON.stringify(updatedPonds));

    setShowAddPond(false);
    setPondData({ name: "", length: "", width: "", depth: "" });
  };

  const handleSelectPond = (pond) => {
    setSelectedPond((prev) => (prev?.id === pond.id ? null : pond));
  };

  return (
    <div>
      <div className="d-flex justify-content-between px-4 py-2 bg-dark text-white">
        <h2>Farmer Dashboard</h2>
        <div>
          <button className="btn btn-success me-2" onClick={handleAddPond}>
            Add Pond
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {showAddPond && (
        <div className="container mt-3 p-3 border rounded shadow bg-light">
          <h5>Add New Pond</h5>
          <input
            type="text"
            className="form-control my-1"
            placeholder="Pond Name"
            value={pondData.name}
            onChange={(e) => setPondData({ ...pondData, name: e.target.value })}
          />
          <input
            type="number"
            className="form-control my-1"
            placeholder="Length (m)"
            value={pondData.length}
            onChange={(e) => setPondData({ ...pondData, length: e.target.value })}
          />
          <input
            type="number"
            className="form-control my-1"
            placeholder="Width (m)"
            value={pondData.width}
            onChange={(e) => setPondData({ ...pondData, width: e.target.value })}
          />
          <input
            type="number"
            className="form-control my-1"
            placeholder="Depth (m)"
            value={pondData.depth}
            onChange={(e) => setPondData({ ...pondData, depth: e.target.value })}
          />
          <button className="btn btn-primary me-2 mt-1" onClick={handleSubmitPond}>
            Submit
          </button>
          <button className="btn btn-secondary mt-1" onClick={() => setShowAddPond(false)}>
            Cancel
          </button>
        </div>
      )}

      <div className="container mt-3">
        <h5 className="text-center">Welcome, {user?.name || "Farmer"}!</h5>
        <div className="d-flex flex-wrap gap-3 justify-content-center mt-3">
          {ponds.map((pond) => (
            <div
              key={pond.id}
              className="card p-3 text-center shadow"
              style={{ width: "150px", cursor: "pointer" }}
              onClick={() => handleSelectPond(pond)}
            >
              <h6 className="mb-1">{pond.name}</h6>
              <small style={{ color: "blue" }}>ID: {pond.id}</small>
            </div>
          ))}
        </div>
      </div>

      {selectedPond && (
        <div className="container mt-3 p-3 border rounded shadow bg-light">
          <h6>{selectedPond.name}</h6>
          <p>
            <b>ID:</b> <span style={{ color: "blue" }}>{selectedPond.id}</span>
          </p>
          <p>Length: {selectedPond.length}m</p>
          <p>Width: {selectedPond.width}m</p>
          <p>Depth: {selectedPond.depth}m</p>

          {selectedPond.id === 476655 ? (
            <>
              <div className="d-flex justify-content-center gap-2">
                <div className="card p-2 text-center shadow" style={{ width: "120px" }}>
                  <h6>Water Level</h6>
                  <p>{sensorData.waterLevel.length > 0 ? sensorData.waterLevel[sensorData.waterLevel.length - 1] : "--"} ft</p>
                </div>
                <div className="card p-2 text-center shadow" style={{ width: "120px" }}>
                  <h6>Water pH</h6>
                  <p>{sensorData.pH}</p>
                </div>
                <div className="card p-2 text-center shadow" style={{ width: "120px" }}>
                  <h6>TDS Level</h6>
                  <p>{sensorData.tds}</p>
                </div>
              </div>

              <h6 className="mt-3">Water Level Over Time</h6>
              <Line
                data={{
                  labels: sensorData.waterLevel.map((_, index) => `Reading ${index + 1}`),
                  datasets: [
                    {
                      label: "Water Level (feet)",
                      data: sensorData.waterLevel,
                      borderColor: "blue",
                      fill: false,
                    },
                  ],
                }}
              />
            </>
          ) : (
            <p className="text-muted">No sensor data available for this pond.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;