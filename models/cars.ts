import { Sequelize, Model, DataTypes } from 'sequelize';

class Car extends Model {

  public car_id!: number; 
  public make!: string; 
  public model!: number; 
  public license_plate_number!: string;
  public color!: string;

  static associate(models: any) {
    this.hasMany(models.Car);
  }
}

export function initCarModel(sequelize: Sequelize): void {
  Car.init(
    {
      car_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      make: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      license_plate_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Car', 
      tableName: 'cars',

    }
  );
}

