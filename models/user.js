"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.ride), { foreignKey: "userId" };
      user.belongsToMany(models.ride, {
        through: "userride",
        foreignKey: "userId",
      });
    }
  }
  user.init(
    {
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.INTEGER },
      password: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["active", "pending", "deleted"],
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
