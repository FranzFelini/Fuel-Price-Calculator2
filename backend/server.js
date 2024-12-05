require("dotenv").config();
const cron = require("node-cron");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const requestIp = require("request-ip");
const UserAgent = require("./models/userAgent");
const DeviceInfo = require("./models/DeviceInfo");

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

cron.schedule("0 0 * * 0", async () => {
  app.delete("/clear-user-agents", async (req, res) => {
    try {
      const result = await UserAgent.deleteMany({});
      res.status(200).send({
        essage: "UA cleadred",
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      console.error(
        "Error clearing UA for some reason that will take you a day to find out moron, here:",
        error
      );
      res
        .status(500)
        .send({
          error:
            "Internal Server Error clearing UA collection so for the first time it's not your fault!",
        });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
