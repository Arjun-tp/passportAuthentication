// const User = require('../models/sql/user.model'),
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const mysqldb = require("../../../config/sequelize");
const User = mysqldb.User;
const logger = require("../../utils/logger");
const randomstring = require("randomstring");
const model = "[user.model]";
// const uploadfile = require('./../../utils/uploadFiles')
const authCodeTimeOut = 900000; //6hours = 21600000


exports.createUser = async query => {
  const methodName = "[createUser]";
  try {

    const queryParams = {
      where: {
        email: query.email
      }
    };
    let emailCheck = await User.findOne(queryParams);

  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};

