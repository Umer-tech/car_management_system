import { Sequelize, Model, DataTypes } from 'sequelize';

// Define the User model by extending Sequelize's Model class
class User extends Model {
  // Define your User model attributes here
  public user_id!: number; // User ID (automatically generated by Sequelize)
  public name!: string; // User's username
  public email!: string; // User's email address
  public password!: string;
  public address!: string;
  public isAdmin!: Boolean;

  static associate(models: any) {
    // Define associations here, e.g., User hasMany Car
    this.hasMany(models.Car);
    // Add other associations as needed
  }
}

// Initialize and export the User model
export function initUserModel(sequelize: Sequelize): void {
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User', // Make sure to set the model name
      tableName: 'users', // Optional: Set the database table name

    }
  );
}

