require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Fuel = require("./models/country");
const { updateFuelPrices } = require("./Scrapers/scraper");
const { updateCurrencyRates } = require("./Scrapers/CurrencyScraper");
const cron = require("node-cron");
const app = express();

app.get("/", (req, res) => {
  return res.send("running");
});

app.use(
  cors({
    origin: "fuelpricecalculator2-g4w8xz4xv-franzfelinis-projects.vercel.app",
  })
);

app.use(express.json());

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
