/* modules */
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var app = express();
var serveStatic = require('serve-static');

/* routers */
var logout = require('./routes/logout');
var index = require('./routes/');
var view = require('./routes/view');
var login = require('./routes/login');
var register = require('./routes/register');
var new_ = require('./routes/new');
var uploads = require('./routes/uploads');
var subscribe = require('./routes/subscribe');
var submit = require('./routes/submit');
var eval = require('./routes/eval');


/* 미들웨어들을 등록한다. */
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(expressSession({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

/* 라우터 (컨트롤러)들을 등록한다. */
app.use('/uploads', uploads);
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/view', view);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/new', new_);
app.use('/subscribe', subscribe);
app.use('/submit', submit);
app.use('/eval', eval);

// 템플릿 엔진을 EJS로 설정한다.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
