"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ride extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ride.belongsTo(models.user, { foreignKey: "userId" });
    }
  }
  ride.init(
    {
      pickuplat: { type: DataTypes.FLOAT, allowNull: false },
      pickuplong: { type: DataTypes.FLOAT, allowNull: false },
      droplat: { type: DataTypes.FLOAT, allowNull: false },
      droplong: { type: DataTypes.FLOAT, allowNull: false },
      amount: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "ride",
    }
  );
  return ride;
};
