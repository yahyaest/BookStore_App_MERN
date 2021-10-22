require("dotenv").config();
const configProd = require("../config/production");
const logger = require("../startup/logging");

module.exports = function () {
  if (!configProd.jwtPrivateKey) {
    logger.error("FATAL ERROR : jwtPrivateKey is not defined.");
    throw new Error("FATAL ERROR : jwtPrivateKey is not defined.");
  }
};
