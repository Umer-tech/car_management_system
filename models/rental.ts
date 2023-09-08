import { Sequelize, Model, DataTypes } from 'sequelize';

class Rental extends Model {
  public car_id!: number; 
  public rent_date!: Date; 
  public return_date!: Date;

  static associate(models: any) {
    this.hasMany(models.Car);
  }
}

export function initRentalModel(sequelize: Sequelize): void {
  Rental.init(
    {
      car_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      rent_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      return_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Rental', // Make sure to set the model name
      tableName: 'rentals', // Optional: Set the database table name
    }
  );
}

