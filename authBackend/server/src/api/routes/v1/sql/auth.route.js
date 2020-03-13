const express = require("express");
const authController = require("../../../controllers/sql/auth.pg.controller");

const router = express.Router();

router.route("/addAdmin").post(authController.addAdmin);
router.route("/login").post(authController.login);
router.route("/addUser").post(authController.addUser);
router.route("/getAllUsers").get(authController.getAllUsers);



module.exports = router;
