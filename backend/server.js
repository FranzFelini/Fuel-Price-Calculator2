require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Fuel = require("./models/country");
const { updateFuelPrices } = require("./Scrapers/scraper");
const { updateCurrencyRates } = require("./Scrapers/CurrencyScraper");
const cron = require("node-cron");

const app = express();

// Define allowed origins
const allowedOrigins = [
  "https://fuelpricecalculator2-hn4ylkv2i-franzfelinis-projects.vercel.app",
  "https://fuelpricecalculator2-ip82tsliw-franzfelinis-projects.vercel.app",
  "http://localhost:3000", // Ensure your local development server is allowed
];

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // If no origin is provided (like from a direct curl request), allow it
      if (!origin) return callback(null, true);

      // If origin is in the allowed list, allow it
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Permissions-Policy header configuration (with only basic features)
app.use((req, res, next) => {
  // Set Permissions-Policy header to restrict usage of certain features
  // We are now only enabling very basic features and ignoring unsupported ones
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()" // Disable potentially problematic features
  );
  next();
});

// Middleware to parse JSON
app.use(express.json());

// Test route to check if the server is running
app.get("/", (req, res) => {
  return res.send("Server is running!");
});

// MongoDB connection
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

// Define routes
const countriesRouter = require("./routes/countries");
app.use("/countries", countriesRouter);

const currencyRouter = require("./routes/currencies");
app.use("/currencies", currencyRouter);

// Set up cron job to update fuel prices and currency rates every day at midnight
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

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
