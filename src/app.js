var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

//import router application
const indexRouter = require('./routes/index');
const api_router_books = require('../src/routes/api_router_books');
const api_router_users = require('../src/routes/api_router_users');
const api_router_user_information = require('../src/routes/api_router_user_information');
const api_router_cart = require('../src/routes/api_router_cart');
const api_router_payment = require('../src/routes/api_router_payment');
const api_router_feedback = require('../src/routes/api_router_feedback');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

//configure routers on application
app.use('/', indexRouter);
app.use('/api/books', api_router_books);
app.use('/api/users', api_router_users);
app.use('/api/users/information', api_router_user_information);
app.use('/api/cart', api_router_cart);
app.use('/api/payment', api_router_payment);
app.use('/api/feedback', api_router_feedback);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
