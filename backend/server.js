require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const requestIp = require("request-ip");
const UserAgent = require("./models/userAgent");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(requestIp.mw({ trustProxy: true }));

app.post("/log-device-info", async (req, res) => {
  const { os, osVersion, browser, version, mobile, cookieEnabled } = req.body;

  try {
    const newDeviceInfo = new DeviceInfo({
      OS: os,
      osVersion: osVersion,
      Browser: browser,
      Version: version,
      Mobile: mobile,
      cookieEnabled: cookieEnabled,
    });

    await newDeviceInfo.save();

    res.status(201).send({ message: "Device info saved successfully!" });
  } catch (error) {
    res.status(500).send({ error: "Error saving device info" });
  }
});

app.post("/log-user-info", async (req, res) => {
  console.log("POST /log-user-agent hit");
  const userAgent = req.body.userAgent;
  const ipAddress = req.clientIp;
  const WindowSize = req.body.FullSize;

  console.log("Captured IP Address:", ipAddress);
  console.log("Full window size : ", WindowSize);

  const newUserAgent = new UserAgent({
    userAgent: userAgent,
    ipAddress: ipAddress,
    screenSize: WindowSize,
  });
  try {
    await newUserAgent.save();
    res.send("User-Agent and IP address and Window Size logged successfully");
  } catch (err) {
    console.error("Error saving User-Agent:", err);
    res.status(500).send("Error logging User-Agent");
  }
});

app.get("/", (req, res) => {
  return res.send("Server is running!");
});

const countriesRouter = require("./routes/countries");
app.use("/countries", countriesRouter);
const currencyRouter = require("./routes/currencies");
app.use("/currencies", currencyRouter);

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
