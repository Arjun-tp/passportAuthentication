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

exports.fetchUserByEmail = async obj => {
  const methodName = "[fetchUserByEmail]";
  try {
    const criteria = {
      where: {
        email: obj.email
      }
    };
    return await User.findOne(criteria);
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};

exports.fetchUserByActivationCode = async obj => {
  const methodName = "[fetchUserByActivationCode]";
  try {
    const criteria = {
      where: {
        activationCode: obj.activationCode
      }
    };
    return await User.findOne(criteria);
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};

exports.fetchUserByActivationCodeStashed = async (obj) => {
  const methodName = "[fetchUserByActivationCodeStashed]";
  try {
    const criteria = {
      where: {
        activationCodeStashed: obj.id
      }
    };
    return await User.findOne(criteria);
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};

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

exports.resetPassword = async function(body, params, passwordInDb) {
  const methodName = "[resetPassword]";
  try {
    /*let compare = await bcrypt.compareSync(
      body.currentPassword,
      passwordInDb.password
    );

    if (compare) {
      const updateQuery = {
        password: bcrypt.hashSync(body.newPassword, salt)
      };
      const criteria = {
        where: {
          uuid: params.id
        }
      };
      return await User.update(updateQuery, criteria);
    } else {
      logger.error(model, methodName, "Password Compare failed");
      return false;
    }*/
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};

exports.resetForgotPassword = async body => {
  const methodName = "[resetForgotPassword]";
  try {
    /*const updateQuery = {
      password: bcrypt.hashSync(body.password, salt)
    };
    const criteria = {
      where: {
        uuid: body.id
      }
    };
    return await User.update(updateQuery, criteria);*/
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};
