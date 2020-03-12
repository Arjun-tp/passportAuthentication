const express = require("express");

const authController = require("../../../controllers/sql/auth.pg.controller");


const router = express.Router();

router.route('/register').post(authController.register);
router.route("/login").post(authController.login);
// router.route('/resetPassword').post(validate(resetPassword), authController.resetPassword);

module.exports = router;





