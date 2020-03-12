const httpStatus = require("http-status");
// const bcrypt = require("bcryptjs");
// const salt = bcrypt.genSaltSync(10);
const logger = require("../../utils/logger");


const controller = "[auth.pg.controller]";
/* Model included */
const authService = require("../../services/sql/auth.service");


exports.register = async (req, res, next) => {
  const methodName = "[register]";
  let user;
  try {

    user = await authService.createUser(reqData);
    if (user) {

      return 'Done'
    }
    return 'Not Done'
  } catch (error) {
    logger.error(controller, methodName, error);
    return 'Not Done'
  }
};

/**
 *
 * Returns jwt token if valid username and password is provided
 */
exports.login = async (req, res, next) => {
  const methodName = "[login]";
  try {
    const reqData = req.body;

    return 'Done'
  } catch (error) {
    logger.error(controller, methodName, error);
    return 'Not Done'
  }
};

