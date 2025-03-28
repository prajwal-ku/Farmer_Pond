import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose"; //  Import mongoose
import { connectDB } from "./dbConnect.js"; // Import connection function
import connections from "./dbConnect.js"; // Import database connections

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//  Connect to MongoDB Atlas
connectDB();

// 2️⃣ **Schemas & Models (Using Separate DB Connections)**
const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "admin" }
});

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  specialization: String,
  experience: Number
});

const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  medicalHistory: Array
});

// Define Models in Specific Databases
const Admin = connections.admin.model("Admin", adminSchema);
const Doctor = connections.doctor.model("Doctor", doctorSchema);
const Patient = connections.patient.model("Patient", patientSchema);

// 3️⃣ **JWT Authentication Middleware**
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized access" });
    req.user = decoded;
    next();
  });
};

// 4️⃣ **Register API**
app.post("/api/register", async (req, res) => {
  const { role, name, email, password, specialization, experience, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;

    if (role === "admin") {
      user = new Admin({ name, email, password: hashedPassword });
    } else if (role === "doctor") {
      user = new Doctor({ name, email, password: hashedPassword, specialization, experience });
    } else if (role === "patient") {
      user = new Patient({ name, email, password: hashedPassword, address });
    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    await user.save();
    res.status(201).json({ message: " Registration successful" });
  } catch (error) {
    res.status(500).json({ message: " Registration failed", error: error.message });
  }
});

// 5️⃣ **Login API**
app.post("/api/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user;
    if (role === "admin") user = await Admin.findOne({ email });
    else if (role === "doctor") user = await Doctor.findOne({ email });
    else if (role === "patient") user = await Patient.findOne({ email });
    else return res.status(400).json({ message: "Invalid role specified" });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: " Login successful", token });
  } catch (error) {
    res.status(500).json({ message: " Login failed", error: error.message });
  }
});

// 6️⃣ **Protected Route (Example)**
app.get("/api/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.role}`, user: req.user });
});

// 7️⃣ **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
