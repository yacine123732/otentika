var UserSchema = require('../models/user.js')
exports.updateProfile = async function(req,res){
    let id = req.params.id
    const filter = {
        _id : id
    }
    const update = {
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
    }
    let user = await UserSchema.findOneAndUpdate(filter, update).then(function(result,err){
        if(err) console.log(err)
        else {
            console.log("succesfuly updated")
            res.send("updated")
        }
    });

}
exports.updatePassword = function(req,res){

}
exports.login =  function(req, res) {
    let _username = req.body.username
    let _password = req.body.password
    var User = new UserSchema({
        username:_username,
        password:_password
    })
    UserSchema.exists({ username: _username },function (err, user_exists) {
        if (err){
            console.log(err)
        }
        else{
            if(user_exists == true){
                UserSchema.findOne({ username: _username }).select("password,username").lean().then(result => {
                    let user_check = new UserSchema ({
                        username:result.username,
                        password:result.password
                    })
                    if (result) {
                        let match =  user_check.comparePassword(_password,function(err,res){
                        })
                        if(match){
                            console.log("Succesfully logged in")
                            sess = req.session;
                            sess.username = _username;
                            req.session.save(function () {
                                res.redirect('/api/test');
                            });
                        }
                        else {
                            console.log("wrong credentials")
                            res.sendStatus(200);
                        }
                    }
                });
        
            }
            else{
                console.log("wrong username")
                res.sendStatus(200);
            }
        }
    });
   
   
      
};
exports.register = async function(req,res){
    var user = new UserSchema({
            username : req.body.username,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            password : req.body.password,
    })
    user.save(function(err, user) {
        if (err) return console.error(err);
        console.log("user registered succussfully!");
        res.sendStatus(200);
      });
};