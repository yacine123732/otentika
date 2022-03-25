
var User = require('../models/User.js');
let bcrypt = require('bcrypt');
module.exports = function(passport,localstrategy){
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    User.findById(user._id, function (err, user) {
      done(err, user);
    });
  });
  passport.use(new localstrategy({
    usernameField: 'email', 
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req,email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          console.log(user.password);
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
}