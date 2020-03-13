const JWT = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy
// const Keys = require("../config/keys");
// const UserModel = require("../api/models/sql/user.model");
const mysqldb = require("../config/sequelize");
const User = mysqldb.User;

let {Strategy, ExtractJwt} = JWT;
let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret@123",
    passReqToCallback: true
};

// JWT Authentication Middleware
module.exports = function jwtMiddleware(passport) {
    passport.use(
        new Strategy(options, async function (req, payload, done) {
            console.log('payloads', payload)
            /*let user = await User.findOne({
              uuid: 'aaa'
            });*/
            /*if (user) {
              req.user = payload;
              done(null, payload);
            } else {
              done(null, false);
            }*/
        }), (token, done) => {
            return done(null, token)
        }
    );
};


const passport = require('passport');
const LocalStrategy = require('passport-local');
passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
    User.findOne({email: email})
        .then((user) => {
            if (!user) { //password mismatch
                return done(null, false, {errors: {'email or password': 'is invalid'}});
            }
            return done(null, user);
        }).catch(done);
}));