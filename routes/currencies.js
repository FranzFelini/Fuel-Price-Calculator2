const express = require("express");
const router = express.Router();
const Currency = require("../models/currency");

router.get("/", async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.json(currencies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
