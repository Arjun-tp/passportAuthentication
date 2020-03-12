const httpStatus = require("http-status");
// const bcrypt = require("bcryptjs");
// const salt = bcrypt.genSaltSync(10);
const logger = require("../../utils/logger");
const jwt = require("jsonwebtoken");

const controller = "[auth.pg.controller]";
/* Model included */
const authService = require("../../services/sql/auth.service");

exports.addAdmin = async (req, res, next) => {
  console.log("register==============", req.body);
  const methodName = "[register]";
  try {
    let findUser = await authService.findUserByEmail(req.body)
    if(!findUser) {
      return await authService.createUser(req.body);
    }else {
      return false
    }
  } catch (error) {
    logger.error(controller, methodName, error);
    return "Not Done";
  }
};

/**
 *
 * Returns jwt token if valid username and password is provided
 */
exports.login = async (req, res, next) => {
  const methodName = "[login]";
  try {
    const reqData = {
      email: req.body.email,
      password: req.body.password
    };

    jwt.sign(reqData, "secret@123", { expiresIn: "7d" }, (error, token) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({ token });
      }
    });
    return "Done";
  } catch (error) {
    logger.error(controller, methodName, error);
    return "Not Done";
  }
};

