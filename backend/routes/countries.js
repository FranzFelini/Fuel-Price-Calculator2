const express = require("express");
const router = express.Router();
const Fuel = require("../models/country");

// Midleware
async function getCountryByName(req, res, next) {
  let country;
  const { name } = req.params;
  try {
    country = await Fuel.findOne({ name: { $regex: new RegExp(name, "i") } });
    if (!country) {
      return res.status(404).json({ message: "Cannot find that country" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.country = country;
  next();
}

// GetOne
router.get("/:name", getCountryByName, (req, res) => {
  res.json(res.country);
});

// GetALL

router.get("/", async (req, res) => {
  try {
    const countries = await Fuel.find();
    console.log("Got all the countries");
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
