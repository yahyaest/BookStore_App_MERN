const express = require("express");
require("dotenv").config();
const app = express();
const logger = require("./startup/logging");
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();
require("./startup/config")();

const port = process.env.PORT || config.get("port");

console.log("Environment :", app.get("env"));

const server = app.listen(port, () => {
  logger.info(`Listening on ${port}...`);
});

module.exports = server;
