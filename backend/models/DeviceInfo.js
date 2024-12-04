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
    },
    Version: {
      type: String,
      required: true,
    },
    Mobile: {
      type: String,
      required: true,
    },
    cookiesEnabled: {
      type: String,
      required: true,
    },
  },
  { collection: "DeviceInfo" }
);

const DeviceInfo = mongoose.model("DeviceInfoModel", deviceinfoSchema);
module.exports = DeviceInfo;
