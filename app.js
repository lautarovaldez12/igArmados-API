var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products')
const componentsRouter = require('./routes/components')
const categoryRouter = require('./routes/category')
const markRouter = require('./routes/mark');
const guaranteeRouter = require('./routes/guarantee');

var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/products',productsRouter);
app.use('/api/components',componentsRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/marks', markRouter)
app.use('/api/guarantees',guaranteeRouter)

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
