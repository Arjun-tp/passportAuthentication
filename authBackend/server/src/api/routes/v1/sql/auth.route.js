const express = require("express");
const passport = require("passport");
const authController = require("../../../controllers/sql/auth.pg.controller");

const router = express.Router();

router.route("/addAdmin").post(
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    console.log("User=====", user);
  }),
  authController.addAdmin
);
router.route("/login").post(authController.login);

module.exports = router;
