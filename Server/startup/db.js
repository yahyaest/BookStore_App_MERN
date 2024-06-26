const mongoose = require("mongoose");
const logger = require("./logging");
const config = require("config");

module.exports = function () {
  try {
    const db = config.get("db");

    console.log(
      `DB : mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/bookstoreDocker-app?authSource=admin`
    );

    mongoose
      .connect(
        // db,
        `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/bookstoreDocker-app?authSource=admin`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => logger.info(`Connected to ${db} ...`))
      .catch((err) => logger.error(`Could not connect to ${db} ...`, err));
  } catch (err) {
    logger.error(`Could not connect to ${db} ...`, err);
  }
};
