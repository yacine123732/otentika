var express = require('express');
require('dotenv').config();
const session = require('express-session');
var path = require('path');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var db = require('./config/db.js');
var mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.k1o24.mongodb.net/${process.env.DB_NAME}`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', function (err) {
   console.log("error connection to DB")
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const routerApp = express.Router();
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'secret',saveUninitialized: true,resave: true,cookie:{maxAge:3600000}}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
require('./functions/auth.js')(passport,LocalStrategy);
require('./routes/main.js')(routerApp,passport);
app.use('/api', routerApp)
module.exports = app;
