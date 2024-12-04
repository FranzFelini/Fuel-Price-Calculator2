require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const requestIp = require("request-ip");
const UserAgent = require("./models/userAgent");

const app = express();

// CORS setup
app.use(
  cors({
    origin: "*", // Adjust as needed
  })
);

// Parse JSON bodies
app.use(express.json());

// Middleware to capture IP address
app.use(requestIp.mw({ trustProxy: true })); // Use this if you're behind a proxy

// Route to log user-agent and IP address
app.post("/log-user-agent", async (req, res) => {
  console.log("POST /log-user-agent hit"); // Debugging
  const userAgent = req.body.userAgent;
  const ipAddress = req.clientIp;

  console.log("Captured IP Address:", ipAddress); // Debugging

  const newUserAgent = new UserAgent({
    userAgent: userAgent,
    ipAddress: ipAddress,
  });

  try {
    await newUserAgent.save();
    res.send("User-Agent and IP address logged successfully");
  } catch (err) {
    console.error("Error saving User-Agent:", err);
    res.status(500).send("Error logging User-Agent");
  }
});

// Simple root route for testing server
app.get("/", (req, res) => {
  return res.send("Server is running!");
});

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1);
  }
};

connectDB();

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
