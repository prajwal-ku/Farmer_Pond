import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connections = {}; // Store multiple database connections

export const connectDB = async () => {
  try {
    connections.admin = mongoose.createConnection(process.env.MONGO_URI_ADMIN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connections.doctor = mongoose.createConnection(process.env.MONGO_URI_DOCTOR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connections.patient = mongoose.createConnection(process.env.MONGO_URI_PATIENT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ All Databases Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    process.exit(1);
  }
};

export default connections; // Export all connections
