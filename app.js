/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , url = require('url');


var app = express();
var baseURL = 'http://localhost:8888';
var neo4jURL = 'http://localhost:7474/plugin';
var debug = require('debug')('boa');

// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// middleware prima del router
app.use(function (){
  var rex = new RegExp("\/((directions)|(stations)|(routes)|(runs)).*");
 
  return function (req, res, next) {
    var match = req.url.match(rex);
    if (match !== null) {
      http.get(neo4jURL + req.url, function(response) {
        debug('got response for ' + req.url);
        res.set('Content-Type', 'application/json');
        response.pipe(res); response.once('and', next);
      }).on('error', function (err) {
        debug(err.message);
        next(err);
      })
    } else {
      next(); 
    }
  }
}());

// Routes

app.get('/', routes.index);
app.get('/home', routes.home);




// penultimo middleware
app.use(function(req, res, next){
  res.send(404, 'Sorry cant find that!');
});
 
// catch degli errori, ultimissimo middleware
app.use(function(err, req, res, next) {
  debug("error! \n" + err.message || err);
  debug(err.stack || "");
  res.send(500, 'Something broke!');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
 
