const fs = require("fs");
const { Sequelize, Op, literal, where } = require("sequelize");
const csvParser = require("csv-parser");
const CouponModel = require("../models/CouponDetailModel"); // Adjust the path as needed
const UserModel = require("../models/user");

const readFile = async (req, res) => {
  try {
    // Read the uploaded CSV file
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          const resp = await CouponModel.bulkCreate(results);
          console.log("Data inserted successfully:", resp);
          res.status(200).json({
            message: " data inserted into the database ",
          });
        } catch (error) {
          console.log("Error inserting data :", error);
          res
            .status(500)
            .json({ error: "Error inserting CSV data into the database" });
        }
      });
  } catch (error) {
    console.log("Error handling file upload:", error);
    res.status(500).json({ error: "Error handling file upload" });
  }
};

const sendCouponCode = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const resp = await UserModel.findByPk(userId);
    if (resp.CouponId) {
      const data = await CouponModel.findByPk(resp.CouponId);
      const today = new Date();
      if (data.expires < today) {
        return res.status(400).json({ error: "Token expired" });
      } else {
        return res.status(200).json({ data });
      }
    }

    const coupon = await CouponModel.findOne({
      where: {
        maxUses: {
          [Op.gt]: 0,
        },
        expiryDate: {
          [Op.gt]: literal("CURRENT_DATE + INTERVAL 2 DAY"),
        },
      },
      order: literal("RAND()"),
    });

    if (coupon) {
      console.log(coupon);
      await CouponModel.update(
        { maxUses: coupon.maxUses - 1 },
        { where: { id: coupon.id } }
      );
      await UserModel.update(
        { CouponId: coupon.id },
        { where: { id: req.user.id } }
      );
      return res.status(202).json({ data: coupon });
    } else {
      return res.status(404).json({ error: "No coupon found" });
    }
  } catch (error) {
    console.log("Error fetching random coupon number:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = sendCouponCode;

module.exports = { readFile, sendCouponCode };
