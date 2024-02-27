const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

async function generateaccesstoken(id) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY);
}
const salt = 10;
const postUserDetail = async (req, res) => {
  try {
    const { name, password } = req.body;

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        console.log(err);
      }
      const data = await UserModel.create({
        name,

        password: hash,
      });

      res.status(201).json({ detail: data });
    });
  } catch (err) {
    console.log(err);
    res.status(501).json({ messege: "Internal Server Error" });
  }
};

const checkLoginDetail = async (req, res) => {
  try {
    const { name, password } = req.body;
    const reqdata = await UserModel.findAll({ where: { name } });
    //console.log(reqdata) ;
    if (reqdata.length == 0) {
      return res
        .status(404)
        .json({ success: false, messege: "user not found" });
    }
    if (reqdata.length > 0) {
      bcrypt.compare(password, reqdata[0].password, async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ messege: "something went wrong" });
        }
        if (result === false) {
          console.log(result);

          return res
            .status(401)
            .json({ success: false, messege: "incorrect password" });
        } else {
          console.log("true");
          return res.status(200).json({
            success: true,
            messege: "user logged succesfully",
            token: await generateaccesstoken(reqdata[0].id),
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(501).json({ messege: "Internal Server Error" });
  }
};
module.exports = { postUserDetail, checkLoginDetail };
