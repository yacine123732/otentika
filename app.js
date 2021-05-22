var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var db = require('./config/db.js');
var mongoDB = 'mongodb://'+db.USER+':'+db.PWD+'@'+db.HOST+':'+db.PORT+'/'+ db.NAME;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', function (err) {
   console.log("error connection to DB")
   });
mongoose.set('useFindAndModify', false);
const routerApp = express.Router();
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'secret',saveUninitialized: true,resave: true,cookie:{maxAge:3600000}}));
app.use(express.static(path.join(__dirname, 'public')));
require('./routes/main.js')(routerApp);
app.use('/api', routerApp)
module.exports = app;
