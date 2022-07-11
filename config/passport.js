const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function () {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username: username.toLowerCase() });
          if (!user) {
            console.log("not registered");
            return done(null, false, {
              message: "That user is not registered",
            });
          }
          const valid = await bcrypt.compare(password, user.password);
          if (valid) {
            console.log("valid");
            return done(null, user);
          } else {
            console.log("not valid");
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (err) {
          return done(err), console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
