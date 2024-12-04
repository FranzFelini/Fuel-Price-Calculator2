const requestIp = require("request-ip");

function getClientIp(req) {
  return req.clientIp;
}

module.exports = getClientIp;
