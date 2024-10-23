const mongoose = require("mongoose");

const fuelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    diesel_price: { type: Number, required: true },
    gasoline_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { collection: "fuel" }
);

fuelSchema.pre("save", function (next) {
  this.date = Date.now();
  next();
});

const Fuel = mongoose.model("country", fuelSchema);
module.exports = Fuel;
