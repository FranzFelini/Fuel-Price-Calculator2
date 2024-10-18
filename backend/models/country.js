const mongoose = require("mongoose");

const fuelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    diesel_price: { type: Number, required: true },
    gasoline_price: { type: Number, required: true },
  },
  { collection: "fuel" }
);

module.exports = mongoose.model("country", fuelSchema);
