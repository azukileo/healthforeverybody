
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , models = require('./models')
  , lib = require('./lib')
  , http = require('http')
  , path = require('path')
//  , form = require('express-form2')
//  , field = form.field
  , expressValidator = require("express-validator");

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(expressValidator);  //app.use(app.router);の前でないとエラーになり
  // csrf対策
  //app.use(express.csrf());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

//tokenを作るメソッド
function csrf(req, res, next) {
  //localsがexpress version3以降のhelperです。
  res.locals.token = req.session._csrf;
  next();
}

//第二引数にcsrfメソッドを書きます。
app.get('/', csrf, function(req, res) {
  res.render('index');
});

app.configure('development', function(){
  models.init('localhost', 'forum_dev');
  app.use(express.errorHandler());
});

app.configure('production', function() {
	models.init('localhost', 'forum_prod');
	app.use(express.errorHandler());
});

app.configure('test', function() {
	models.init('test', 'forum_test');
	app.use(express.errorHandler());
});

// これはエクスプレス３以降使わなくなった　Dynamic View Helper
//app.dynamicHelpers(lib.dynamicHelpers);

// Routes
app.get('/', routes.index);
app.get('/regist', routes.regist);
app.post('/registUser', routes.useExpressValidator);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});