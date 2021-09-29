require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const companyRouter = require('./routes/company');
const noAuthRouter = require('./routes/noauth');
const { setUpWallet } = require('./config/ethConfig');
const { startFlow } = require('./util/superfluidUtil');

//setUpWallet();
//startFlow('0x31FE62268319EBe89ae7Db434769871eA146Aa85');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/company', companyRouter);
app.use('/noauth', noAuthRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
});

module.exports = app;
