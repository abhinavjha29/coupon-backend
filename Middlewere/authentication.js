const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config({ path: "./.env" });
const authenticate = async (req, res, next) => {
  try {
    const token = req.params.token;
    console.log(token);
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const response = await User.findByPk(user.userId);

    req.user = response;

    next();
  } catch (err) {
    console.log(err);
    return res.status(404).json({ err: "user not found" });
  }
};

module.exports = { authenticate };
