var User = require('../controllers/UserController.js');
module.exports = function(app,passport){
  /* Authenticate & Signup */
  app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/api/test',
                                   failureFlash: true })
  );
  app.put('/users/:id/updatePassword',User.updatePassword);
  app.post('/register',User.register);
  // User endpoints
  app.put('/users/:id',User.updateUser)
  app.post('/users',User.register);
  app.delete('/users/:id',User.deleteUser);
  app.get('/users/:id',User.getUser);
  app.get('/users',User.getAllUsers)
  // Address endpoints
  app.post('/users/:id/address',User.addAddress);
  app.put('/users/:id/address',User.updateAddress);
  app.delete('/users/:id/address',User.deleteAddress);
  app.get('/users/:id/address',User.getAddress);
  // Image endpoints
  app.post('/users/:id/image',User.addImage);
  app.put('/users/:id/image',User.updateImage);
  app.delete('/users/:id/image',User.deleteImage);
  app.get('/users/:id/image',User.getImage);
}
