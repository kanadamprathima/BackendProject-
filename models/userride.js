"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userride extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // userride.belongsTo(models.user);
      userride.belongsTo(models.ride);
      userride.belongsTo(models.user);
    }
  }
  userride.init(
    {
      address: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["accept", "pending", "Reject"],
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "userride",
    }
  );
  return userride;
};
