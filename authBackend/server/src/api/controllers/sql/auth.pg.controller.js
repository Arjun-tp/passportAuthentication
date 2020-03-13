const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const logger = require("../../utils/logger");
const jwt = require("jsonwebtoken");
const mysqldb = require("../../../config/sequelize");
const User = mysqldb.User;
const controller = "[auth.pg.controller]";
const authService = require("../../services/sql/auth.service");
 JWT = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy
var passport = require('passport');
let options = {
  jwtFromRequest: JWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret@123",
  passReqToCallback: true
};


exports.addAdmin = async (req, res, next) => {
  const methodName = "[register]";
  try {
    passport.use(new JwtStrategy(options, async (username, password, done) => {
      let query = {
        email: req.body.email,
        password: req.body.password
      }
      let queryParams = {
        where: {
          email: query.email
        }
      };
      let findUser = await User.findOne(queryParams)
      if(!findUser) {
        let userCreate = await authService.createUser(query)
      }
    }));

  } catch (error) {
    console.log('eroor==', error)
    logger.error(controller, methodName, error);
    return error;
  }
};

exports.getAllUsers = async (req, res, next) => {
  const methodName = "[getAllUsers]";
  try{
    let getUsers = await authService.getAllUsers()
    if(getUsers) {
      res.json(getUsers)
    }
  }catch(error) {
    logger.error(controller, methodName, error);
    return error;
  }
}

exports.addUser = async (req, res, next) => { //add dummy user to db
  const methodName = "[addUser]";
  try{
    let addUser = await authService.createUser(req.body)
    if(addUser){
      res.json(addUser)
    }    
  }catch (error) {
    logger.error(controller, methodName, error);
    return error;
  }
}

exports.login = async (req, res, next) => {
  const methodName = "[login]";
  try {
    const reqData = {
      email: req.body.email,
      password: req.body.password
    };
    let findEmail = await authService.findUserByEmail(req.body);
    if(findEmail){
      jwt.sign(reqData, "secret@123", { expiresIn: "7d" }, async (error, token) => {
        if (error) {
          return error;
        } else { 
          let comparePassword = await bcrypt.compare(req.body.password, findEmail.password);
          if(!comparePassword) {
            return res.json(false)
          }else{
          return res.status(200).json({ token });
          }   
        }
      });
    } else {
      return false
    }
  } catch (error) {
    logger.error(controller, methodName, error);
    return error;
  }
};

