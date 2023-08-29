module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    "car",
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
      license_plate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Car;
};
