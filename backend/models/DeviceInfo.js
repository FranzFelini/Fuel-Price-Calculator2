const mongoose = require("mongoose");

const deviceinfoSchema = new mongoose.Schema(
  {
    OS: {
      type: String,
      required: true,
    },
    osVersion: {
      type: String,
      required: true,
    },
    Browser: {
      type: String,
      required: true,
      default: "Unknown",
    },
    Version: {
      type: String,
      required: true,
      default: "Unknown",
    },
    Mobile: {
      type: Boolean,
      required: true,
      default: false,
    },
    cookiesEnabled: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { collection: "DeviceInfo" }
);

const DeviceInfo = mongoose.model("DeviceInfoModel", deviceinfoSchema);
module.exports = DeviceInfo;
