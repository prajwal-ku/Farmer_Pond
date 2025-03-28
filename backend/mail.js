import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();  // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());  // Allow frontend requests

// ✅ Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,  // TLS port (Use 465 for SSL)
  secure: false,  
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  
  },
  tls: {
    rejectUnauthorized: false,  
  },
});

// ✅ Email API Route
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "❌ All fields are required" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "agrisure2025@gmail.com",
    subject: "New Contact Form Message",
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "✅ Email sent successfully" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

// ✅ Start Server
const PORT = process.env.MAIL_PORT || 5001;
app.listen(PORT, () => console.log(`📧 Mail server running on port ${PORT}`));
