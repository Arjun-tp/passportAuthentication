const JWT = require("passport-jwt");
// const Keys = require("../config/keys");
const UserModel = require("../api/models/sql/user.model");

let { Strategy, ExtractJwt } = JWT;
let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret@123",
  passReqToCallback: true
};

// JWT Authentication Middleware
module.exports = function jwtMiddleware(passport) {
  passport.use(
    new Strategy(options, async function(req, payload, done) {
      let user = await UserModel.default.findOne({
        _id: payload._id
      });
      if (user) {
        req.user = payload;
        done(null, payload);
      } else {
        done(null, false);
      }
    })
  );
}
