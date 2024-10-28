require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Fuel = require("./models/country");
const { updateFuelPrices } = require("./Scrapers/scraper");
const { updateCurrencyRates } = require("./Scrapers/CurrencyScraper");
const cron = require("node-cron");
const app = express();
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin:
      "https://fuelpricecalculator2-jt8phrkp9-franzfelinis-projects.vercel.app",
  })
);

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
    console.log("Updated");
    await updateFuelPrices();
    console.log("Updated");
  } catch (err) {
    console.error(err);
  }
});

app.listen(3001, () => console.log("Server started"));
