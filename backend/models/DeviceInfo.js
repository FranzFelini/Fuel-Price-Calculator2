const mongoose = require("mongoose");

const DeviceinfoSchema = new mongoose.schema(
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

const DeviceInfoModel = mongoose.model("DeviceInfo", DeviceinfoSchema);
module.exports = DeviceInfoModel;
