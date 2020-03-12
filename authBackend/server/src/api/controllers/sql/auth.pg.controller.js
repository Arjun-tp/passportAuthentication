const httpStatus = require("http-status");
// const bcrypt = require("bcryptjs");
// const salt = bcrypt.genSaltSync(10);
const logger = require("../../utils/logger");


const controller = "[auth.pg.controller]";
/* Model included */
const authService = require("../../services/sql/auth.service");


exports.addAdmin = async (req, res, next) => {
  const methodName = "[register]";
  try {
    await authService.createUser(req.body)
    console.log('register==============', req.body)
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

