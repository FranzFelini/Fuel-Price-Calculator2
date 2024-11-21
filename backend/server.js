require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Fuel = require("./models/country");
const { updateFuelPrices } = require("./Scrapers/scraper");
const { updateCurrencyRates } = require("./Scrapers/CurrencyScraper");
const cron = require("node-cron");
const app = express();
const logger = require("./loggers/logger");
const morgan = require("morgan");

app.use(
  cors({
    origin: "fuelpricecalculator2-g4w8xz4xv-franzfelinis-projects.vercel.app",
  })
);

app.get("/", (req, res) => {
  return res.send("running");
});

app.use(
  cors({
    origin: "*",
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

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

const countriesRouter = require("./routes/countries");
app.use("/countries", countriesRouter);

const currencyRouter = require("./routes/currencies");
app.use("/currencies", currencyRouter);

cron.schedule("0 0 * * *", async () => {
  try {
    await updateCurrencyRates();
    logger.info("Updated Currency Rates");
    await updateFuelPrices();
    logger.info("Updated Fuel Prices");
  } catch (err) {
    logger.error(err);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
