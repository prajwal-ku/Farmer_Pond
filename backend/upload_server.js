import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Define Sensor Data Schema
const sensorSchema = new mongoose.Schema({
  pond_id: String,
  pH: Number,
  tds: Number,
  waterLevel: Number,
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model("SensorData", sensorSchema);

// ✅ API to Receive ESP32 Data
app.post("/upload", async (req, res) => {
  console.log("📡 ESP32 Data:", req.body);
  const { pond_id, pH, tds, waterLevel } = req.body;

  if (!pond_id || pH === undefined || tds === undefined || waterLevel === undefined) {
    return res.status(400).json({ message: "❌ Missing fields", received: req.body });
  }

  try {
    const newData = new SensorData({ pond_id, pH, tds, waterLevel });
    await newData.save();
    res.status(201).json({ message: "✅ Data stored successfully", data: newData });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Failed to store data", error: error.message });
  }
});

// ✅ API to Fetch Data for `pond_id: 476655`
app.get("/data", async (req, res) => {
  try {
    const data = await SensorData.find({ pond_id: "476655" }).sort({ timestamp: -1 });
    res.json(data);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Failed to retrieve data", error: error.message });
  }
});

// ✅ Start Upload Server
const PORT = process.env.UPLOAD_PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Upload Server running on port ${PORT}`));
