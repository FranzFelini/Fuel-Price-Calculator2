require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Fuel = require("./models/country");
const { updateFuelPrices } = require("./Scrapers/scraper");
const { updateCurrencyRates } = require("./Scrapers/CurrencyScraper");
const cron = require("node-cron");
const app = express();

const allowedOrigins = [
  "https://fuelpricecalculator2-hn4ylkv2i-franzfelinis-projects.vercel.app",
  "https://fuelpricecalculator2-ip82tsliw-franzfelinis-projects.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  return res.send("running");
});

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
