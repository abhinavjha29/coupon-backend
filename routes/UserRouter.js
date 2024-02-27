const UserController = require("../controller/UserController");
const Express = require("express");

const router = Express.Router();

router.post("/signUp", UserController.postUserDetail);
router.post("/login", UserController.checkLoginDetail);
module.exports = router;
