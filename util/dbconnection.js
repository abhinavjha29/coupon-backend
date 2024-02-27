const Sequelize = require("sequelize");
require("dotenv").config({ path: "./.env" });
const password = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;
const host = process.env.DB_HOST;
console.log(password, username, host);
const sequelize = new Sequelize("couponapp", username, password, {
  dialect: "mysql",
  host: host,
});
module.exports = sequelize;
