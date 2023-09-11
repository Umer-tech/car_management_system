import {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER} from "../utils/config";
import { Sequelize } from 'sequelize';
import { initUserModel } from './users';
import { initCarModel } from './cars';
import { initRentalModel } from './rental';


const sequelize = new Sequelize(
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST, // Your database host
    dialect: 'mysql', // The database dialect
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

// Initialize and associate the models
initUserModel(sequelize);
initCarModel(sequelize);
initRentalModel(sequelize);

// Define associations here if needed
// For example, if User has a relationship with Car and Rental:
export const User = sequelize.models.User;
export const Car = sequelize.models.Car;
export const Rental = sequelize.models.Rental;

//Accociation

//User and Rental
Rental.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

User.hasMany(Rental, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});

//Car and Rental
Rental.belongsTo(Car, {
  foreignKey: "car_id",
  targetKey: "car_id",
});

Car.hasMany(Rental, {
  foreignKey: "car_id",
  sourceKey: "car_id",
});


//Syncing
User.sync()
  .then(() => {
    console.log("User table created");
  })
Car.sync()
  .then(() => {
    console.log("Car table created");
  })
Rental.sync()
  .then(() => {
    console.log("Rental table created");
  })
// Export the sequelize instance
export default  sequelize ;