const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/dbconnection");

const UserDetails = sequelize.define("UserDetails", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UserDetails;
