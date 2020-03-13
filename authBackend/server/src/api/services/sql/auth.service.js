const mysqldb = require("../../../config/sequelize");
const User = mysqldb.User;
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const logger = require("../../utils/logger");
const randomstring = require("randomstring");
const model = "[user.model]";


exports.createUser = async query => {
  const methodName = "[createUser]";
  try {
    query.password = bcrypt.hashSync(query.password, salt);
    return User.create(query)
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};


exports.getAllUsers = async query => {
  const methodName = "[getAllUsers]";
  try {
    let getUsers = await User.findAll({raw: true});
    console.log('user===', getUsers)
    return getUsers
  }catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
}



exports.findUserByEmail = async query => {
  const methodName = "[findUserByEmail]";
  try {
    let queryParams = {
      where: {
        email: query.email
      }
    };
    let emailCheck =  await User.findOne(queryParams);

    if (emailCheck){
      // console.log('iiiiiiiiiiiiiiiiiiiiiii', emailCheck)
      return emailCheck.dataValues
    }else {
      console.log('tttttttttttttttttttt')

      return false
    }
  } catch (error) {
    logger.error(model, methodName, error);
    return false;
  }
};

