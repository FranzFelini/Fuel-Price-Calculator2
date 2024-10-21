require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Fuel = require("./models/country");
const fs = require("fs/promises");

const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", async () => {
  console.log("connected to the database");
});

app.use(express.json());

const countriesRouter = require("./routes/countries");
app.use("/countries", countriesRouter);

app.get("/getData", (req, res) => {
  res.send("Hello to you finally");
});

app.listen(3001, () => console.log("Server Started"));
