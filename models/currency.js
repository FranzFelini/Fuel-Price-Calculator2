const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
  },
  { collection: "currency" }
);

const Currency = mongoose.model("currency", CurrencySchema);
module.exports = Currency;
