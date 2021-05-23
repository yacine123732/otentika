var User = require('../controllers/user.js')
var passport = require('../functions/auth.js')
module.exports = function(app){
  app.post('/loginTest',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
  );
  app.post('/login', User.login);
  app.post('/register',User.register);
  app.get('/test',function(req,res){
    console.log(req.session)
    res.send(req.session);
  })
  app.post('/user/:id/update',User.updateProfile)
  
}
