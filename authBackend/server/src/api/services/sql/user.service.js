const mysqldb = require("../../../config/sequelize");
const User = mysqldb.User;
const UserArchive = mysqldb.UserArchive;
const logger = require("../../utils/logger");
const model = "[user.model]";
const bCryptJs = require("bcryptjs");

exports.fetchByUserId = async (query) => {
  const methodName = "[fetchByUserId]";
  try {
    const criteria = {
      where: {
        uuid: query.id
      }
    };
    return await User.findOne(criteria);
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};

exports.deleteByUserId = async (body, user) => {
  const methodName = "[deleteByUserId]";
  try {
    let comparePasswords = await bCryptJs.compareSync(
      body.password,
      user.password
    );
    if (comparePasswords) {
      const criteria = {
        where: {
          uuid: body.id
        }
      };
      const params = {
        disabled: true
      };
      let updatedUser = await User.update(params, criteria);
      if (updatedUser) {
        user.disabled = true;
        let createUSerToArchive = await UserArchive.create(user);
        if (createUSerToArchive) {
          let criteria = {
            where: {
              uuid: user.uuid
            }
          };
          return await User.destroy(criteria);
        }
      }
    } else {
      logger.error(model, methodName, "Password Compare failed");
      return false;
    }
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};

exports.updateUser = async (body, params) => {
  const methodName = "[updateUser]";
  try {
    const criteria = {
      where: {
        uuid: params.id
      }
    };
    return await User.update(body, criteria);
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};

exports.resetPassword = async (body, params) => {
  const methodName = "[resetPassword]";
  try {
    const criteria = {
      where: {
        uuid: params.id
      }
    };
    return await User.update(body, criteria);
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};

/**
 * To get User details based on sent query condition
 * @param query Condition to fetch user details
 * @returns {object} user details
 */
exports.getUserDetails = async query => {
  let methodName = "[fetchByUserId]";
  try {
    return await User.findOne(query);
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};

/**
 * To get all user details
 * @returns {Array} array of all user details
 */
exports.getAllUsers = async query => {
  console.log("queryuser",query)
  // limit = 2;

  let methodName = "[getAllUsers]";
  try {
    const dbWhere = {
      attributes: { exclude: ["password", "activationCode", "updatedAt"] },
      row: true,
      nest: true
    };
    if (query.skip) {
      dbWhere["offset"] = parseInt(query.skip);
    }
    if (query.limit) {
      dbWhere["limit"] = parseInt(query.limit);
    }
    return User.findAndCountAll(dbWhere);
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};
