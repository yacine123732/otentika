var Category = require('../models/categories.js')
var mongoose = require('mongoose');
module.exports = function(app){

  app.get('/', function(req, res){
    let Cat_instane = new Category({ name: 'zoo',description : 'bla bla bla' });
    Cat_instane.save();
    res.send("hello");
  });

  
}

/* GET home page. */
