const express = require("express");
const router = express.Router();
const Fuel = require("../models/country");

router.get("/", async (req, res) => {
  try {
    const countries = await Fuel.find();
    res.json(countries);
    console.log("returned");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
