const mongoose = require("mongoose");

const userAgentSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "UserAgents" }
);

const UserAgent = mongoose.model("UserAgent", userAgentSchema);

module.exports = UserAgent;
