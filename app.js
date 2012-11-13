
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
	, passport = require('passport')
	, GoogleStrategy = require('passport-google').Strategy
  , mock = require('./mocks');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
    console.log('GoogleStrategy used!!!');

    var users = require('./db/users');
    users.getUserByEmail(profile.emails[0], function(user){
        //if no user can be found, then create a new one
        if(typeof user === 'undefined'){
          user = 
          {
            name: profile.displayName,
            email: profile.emails[0],
            location: '',
            occupation: '',
            political: '',
            os: '',
            music: '',
            about: ''
          }
          users.insertUser(user, function(){
          });
          profile.xory = user;
          profile.identifier = identifier;
          return done(null, profile);
        }
        else{
          //if the user can be found then attach that user's info from the db
          console.log('user from auth method', user)
          profile.xory = user;
          profile.identifier = identifier;
          return done(null, profile);
        }
    });
  }
));

var app = express();

var MemStore = express.session.MemoryStore();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser()); 
  app.use(express.session({secret:'test secret', store: MemStore}));
	app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/register', routes.register);
app.get('/user', routes.user);
app.get('/user/:id', routes.editUser);
app.get('/editUser/:id', routes.editUser);
app.post('/saveUser/:id', routes.saveUser);
app.get('/debate/:id', routes.debate);
app.get('/editDebate/:id', routes.editDebate);
app.post('/editDebate/:id', routes.saveDebate);
app.get('/deleteDebate/:id', routes.deleteDebate);
app.get('/createDebate', routes.createDebate);
app.get('/auth/google', 
  passport.authenticate('google'),
  function(req, res){
	});
app.get('/auth/google/return', 
  passport.authenticate('google'),
  function(req, res) {
		res.redirect('/');
	});
app.get('/logout', routes.logout);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
