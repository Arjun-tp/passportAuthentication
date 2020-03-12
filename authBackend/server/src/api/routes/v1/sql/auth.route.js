const express = require("express");
const passport = require("passport");
const authController = require("../../../controllers/sql/auth.pg.controller");

const router = express.Router();

router.route("/addAdmin").post(authController.addAdmin);
router.route("/login").post(authController.login);

module.exports = router;
