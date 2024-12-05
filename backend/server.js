require("dotenv").config();
const cron = require("node-cron");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const requestIp = require("request-ip");
const UserAgent = require("./models/userAgent");
const DeviceInfo = require("./models/DeviceInfo");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(bodyParser.json()); // To parse JSON bodies
app.use(requestIp.mw({ trustProxy: true }));

app.post("/log-device-info", async (req, res) => {
  const os = req.body.os;
  const osVersion = req.body.osVersion;
  const browser = req.body.Browser;
  const version = req.body.Version;
  const mobile = req.body.Mobile;
  const cookieEnabled = req.body.cookieEnabled;

  console.log(
    "CAPTURED DATA = [",
    "OS:",
    os,
    "osVersion: ",
    osVersion,
    "Browser: ",
    browser,
    "Version: ",
    version,
    "Mobile: ",
    mobile,
    "Are Cookies enabled:",
    cookieEnabled,
    "]"
  );
  const newDeviceInfo = new DeviceInfo({
    OS: os,
    osVersion: osVersion,
    Browser: browser,
    Version: version,
    Mobile: mobile,
    cookieEnabled: cookieEnabled,
  });

  try {
    await newDeviceInfo.save();
    res.send("Data sucessfully saved into the database !");
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
const DeviceInfoModel = require("./models/DeviceInfo");
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

cron.schedule("0 0 * * *", async () => {
  try {
    await updateCurrencyRates();
    console.log("Updated");
    await updateFuelPrices();
    console.log("Updated");
  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
