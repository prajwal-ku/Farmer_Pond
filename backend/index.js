import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import http from "http";
import { Server } from "socket.io";

dotenv.config(); // Load environment variables

const app = express();
const server = http.createServer(app); // Create HTTP Server
const io = new Server(server, { cors: { origin: "*" } }); // Enable WebSockets

app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Enable CORS

//  Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

//  User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: { type: String, unique: true },
  address: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

//  Sensor Data Schema & Model
const sensorSchema = new mongoose.Schema({
  pond_id: String,
  pH: Number,
  tds: Number,
  waterLevel: Number,
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model("SensorData", sensorSchema);

//  Authentication Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized access" });
    req.user = decoded;
    next();
  });
};

//  Register API
app.post("/api/auth/register", async (req, res) => {
  console.log("🔹 Register API hit", req.body);

  const { name, mobile, email, address, password } = req.body;

  try {
    if (!name || !mobile || !email || !address || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, mobile, email, address, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "✅ Registration successful" });
  } catch (error) {
    console.error("❌ Error during registration:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

//  Login API
app.post("/api/auth/login", async (req, res) => {
  console.log("⚡ Login API hit", req.body);

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "✅ Login successful", token });
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

//  ESP32 Data Upload API (Supports Real-time Updates)
app.post("/api/upload", async (req, res) => {
  console.log("📡 Received Data from ESP32:", req.body);

  const { pond_id, pH, tds, waterLevel } = req.body;

  if (!pond_id || pH === undefined || tds === undefined || waterLevel === undefined) {
    return res.status(400).json({ message: "❌ Missing fields", received: req.body });
  }

  try {
    // Emit data in real-time to all clients (WebSocket)
    io.emit("sensorData", { pond_id, pH, tds, waterLevel, timestamp: new Date() });

    // OPTIONAL: Store data in MongoDB (Remove if you don't want to store)
    const newData = new SensorData({ pond_id, pH, tds, waterLevel });
    await newData.save();

    res.status(201).json({ message: "✅ Data received and broadcasted", data: newData });
  } catch (error) {
    console.error("❌ Error saving data:", error);
    res.status(500).json({ message: "Failed to store data", error: error.message });
  }
});

//  Get Sensor Data API
app.get("/api/data", async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 });
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ message: "Failed to retrieve data", error: error.message });
  }
});

//  WebSocket Connection
io.on("connection", (socket) => {
  console.log("🟢 A client connected");

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

//  Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));