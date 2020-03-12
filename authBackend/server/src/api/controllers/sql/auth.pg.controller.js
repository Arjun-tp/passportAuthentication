const httpStatus = require("http-status");
// const bcrypt = require("bcryptjs");
// const salt = bcrypt.genSaltSync(10);
const logger = require("../../utils/logger");
const jwt = require("jsonwebtoken");
const mysqldb = require("../../../config/sequelize");
const User = mysqldb.User;
const controller = "[auth.pg.controller]";
/* Model included */
const authService = require("../../services/sql/auth.service");
 JWT = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy
var passport = require('passport');
// exports.addAdmin = async (req, res, next) => {
//   console.log("register==============", req.body);
//   const methodName = "[register]";
//   try {
//     let findUser = await authService.findUserByEmail(req.body)
//     if(!findUser) {
//       return await authService.createUser(req.body);
//     }else {
//       return false
//     }
//   } catch (error) {
//     logger.error(controller, methodName, error);
//     return "Not Done";
//   }
// };

// let { Strategy, ExtractJwt } = JWT;
let options = {
  jwtFromRequest: JWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret@123",
  passReqToCallback: true
};


exports.addAdmin = async (req, res, next) => {
  console.log("register==============", req.body);
  const methodName = "[register]";
  try {

    passport.use(new JwtStrategy(options, (username, password, done) => {

      User.findOne({ email: req.body.email }, function(err, user) {
    
        if (err) { return done(err); }
    
        if (!user) { 
             usr = new User({ email: req.body.email, password: req.body.password });
             usr.save(function(err) {
             if(err) {
                   console.log(err);
             } else {
                   console.log('user: ' + usr.username + " saved.");
             }
          });
    
        }
    
        // user.comparePassword(password, function(err, isMatch) {
        //   if (err) return done(err);
        //   if(isMatch) {
        //     return done(null, user);
        //   } else {
        //     return done(null, false, { message: 'Invalid password' });
        //   }
        // });
      });
    }));

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
  console.log('login==>>>>>>>>>>>', req.body);
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

