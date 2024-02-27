// const Express = require("express");
// const auth = require("../Middlewere/authentication");
// const couponController = require("../controller/CouponController");
// const { parseCSVAndInsert } = require("../controller/CouponController");

// router.get("/your_route", async (req, res) => {
//   try {
//     await parseCSVAndInsert("C:\\Users\\ASUS\\Desktop\\MOCK_DATA.csv");
//     res.status(200).send("CSV data inserted into the database successfully");
//   } catch (error) {
//     res
//       .status(500)
//       .send("Error inserting CSV data into the database: " + error.message);
//   }
// });
const express = require("express");
const router = express.Router();
const File = require("../controller/uploadFile"); // Adjust the path as needed
const upload = require("../controller/multer"); // Adjust the path as needed
const auth = require("../Middlewere/authentication");
// Route to handle file upload
router.post("/upload", upload.single("file"), File.readFile);
router.get("/couponCode/:token", auth.authenticate, File.sendCouponCode);

module.exports = router;
