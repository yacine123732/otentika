var User = require('../controllers/user.js')
module.exports = function(app,parser){

  app.post('/login', User.login);
  app.post('/register',User.register);
  app.get('/test',function(req,res){
    console.log(req.session)
    res.send(req.session);
  })
  app.post('/user/:id/update',User.updateProfile)
  
}
