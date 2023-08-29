module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define(
    "rental",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
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
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Rental;
};
