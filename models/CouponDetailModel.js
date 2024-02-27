// Import Sequelize module
const { DataTypes } = require("sequelize");

// Import sequelize instance (assuming it's already configured)
const sequelize = require("../util/dbconnection"); // Adjust the path as needed

// Define the Coupon model
const Coupon = sequelize.define("Coupon", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  couponNo: {
    type: DataTypes.STRING, // Assuming coupon number is a string
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATEONLY, // Assuming expiry date is a date
    allowNull: false,
  },
  maxUses: {
    type: DataTypes.INTEGER, // Assuming max uses is an integer
    allowNull: false,
  },
  used: {
    type: DataTypes.INTEGER,
    defultValue: 0,
  },
});

// Sync the model with the database

module.exports = Coupon;
