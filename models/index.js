const Joi = require("joi");
const dbConfig = require("../config/db-config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST, // Your database host
    dialect: dbConfig.DIALECT, // The database dialect
  }
);

//Authentificate Connection

(async function authenticateConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = require("./users")(sequelize, Sequelize.DataTypes);
db.models.Car = require("./cars")(sequelize, Sequelize.DataTypes);
db.models.Rental = require("./rental")(sequelize, Sequelize.DataTypes);

module.exports = db;
