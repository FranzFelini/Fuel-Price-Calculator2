require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const Fuel = require("./models/country");
const { updateFuelPrices } = require("./Scrapers/scraper");
const { updateCurrencyRates } = require("./Scrapers/CurrencyScraper");
const cron = require("node-cron");
const UserAgent = require("./models/userAgent");
const requestIp = require("request-ip");

const app = express();

app.use(
  cors({
    origin: "*", // Promijeniti
  })
);

app.use(express.json());

app.use(requestIp.mw());

app.post("/log-user-agent", async (req, res) => {
  const userAgent = req.body.userAgent;
  const ipAddress = req.clientIp;

  console.log("Captured IP Address:", ipAddress);

  const newUserAgent = new UserAgent({
    userAgent: userAgent,
    ipAddress: ipAddress,
  });

  try {
    await newUserAgent.save();
    res.send("User-Agent logged successfully");
  } catch (err) {
    console.error("Error saving User-Agent:", err);
    res.status(500).send("Error logging User-Agent");
  }
});
app.get("/", (req, res) => {
  return res.send("Server is running!");
});

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

const countriesRouter = require("./routes/countries");
app.use("/countries", countriesRouter);

const currencyRouter = require("./routes/currencies");
app.use("/currencies", currencyRouter);

cron.schedule("0 0 * * *", async () => {
  try {
    await updateCurrencyRates();
    console.log("Updated Currency Rates");
    await updateFuelPrices();
    console.log("Updated Fuel Prices");
  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
