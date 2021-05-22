var mongoose = require('mongoose');
var bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;
var Users = new Schema ({
    username : String,
    firstname: String,
    lastname: String,
    password: String,
    email : String

});
Users.pre('save', function(next) {
    let user = this 
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
Users.methods.comparePassword = async function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
var User = mongoose.model('Model', Users,'users');
module.exports = User;