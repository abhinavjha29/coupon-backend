const sequelize = require("./util/dbconnection");
const express = require("express");
const cors = require("cors");
const UserRoute = require("./routes/UserRouter");
const CouponRouter = require("./routes/CoupunRoute");
const testRouter = require("./controller/uploadFile");
const UserModel = require("./models/user");
const CoupounModel = require("./models/CouponDetailModel");
require("dotenv").config();
const PORT = process.env.PORT;
console.log(PORT);
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
CoupounModel.hasMany(UserModel);
UserModel.belongsTo(CoupounModel);
app.use("/user", UserRoute);
app.use("/coupon", CouponRouter);
// app.use("/test", testRouter);
async function startServer() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log("Listening on port 3800");
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
