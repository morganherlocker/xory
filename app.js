
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

    //return mock user for testing and building templates
    profile.xory = mock.user;

    //add db logic to retreive user info and add to profile.xory

		console.log('profile:');
		console.log(profile);
    profile.identifier = identifier;
    return done(null, profile);
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
app.get('/profile', routes.profile);
app.get('/debate/:id?', routes.debate);
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

var mockUser = 
{
  id: 1,
  username: 'Mr Weenis',
  location: 'North Korea',
  occupation: 'Nuclear Weapon Tester',
  political: 'Pragmatic Totalitarian',
  os: 'Solaris',
  music: 'Richard Cheese',
  about: 'I am just a regular old nuclear bomb carrying debater, looking for a great political discourse. I will warn you that I anger extremely easily, but it is all in good fun, and I try not to get angry at work.',
  pic: 'img/profiles/mr weenis.jpg'
}

var mockDebate = 
{
  authorID: 1,
  option1: 'Libertarianism',
  option2: 'Traditional Conservatism',
  option1Args: 'United States Congressman Ron Paul has been described as combining libertarian and conservative "small government" ideas and'
  + ' showing how the Constitution defends the individual and most libertarian views.[10] In 1975, Ronald Reagan stated, "I believe the very heart'
  + ' and soul of conservatism is libertarianism" but some libertarians criticize Reagan for unlibertarian policy positions.[11] Many '
  + 'libertarian conservatives, like Congressman Ron Paul, Congressman Justin Amash, Congressman Walter B. Jones, Congressman Tim Johnson, '
  + 'Senator Rand Paul, former President Calvin Coolidge former Senator Barry Goldwater and former New Mexico Governor Gary Johnson, affiliate '
  + 'with the Republican Party and consider themselves libertarian Republican. Some other conservative Republican politicians with libertarian'
  + ' leanings include Maine Governor Paul LePage, Senator Mike Lee, and former Florida state representative Chuck Baldwin.',
  Option2Args: 'There are many facets to this, but one way of looking at it is to say that libertarian ideas are encroaching on conservatism.'
  + 'Of course, social conservatism -- which I would argue is an implicit component of traditional conservatism (though many Christian conservatives in'
  + ' America were politically dormant prior to the 1970s) -- has been, perhaps, the most vulnerable victim of the political times.'
  + 'Most people view the arguments relating to conservative social policy simplistically. They hear the term "social conservative" and '
  +'think only of Jerry Falwell or Pat Robertson. This perception ignores the fact that conservative social policy has been a fundamental component'
  +' of traditional conservatism, an intellectual and philosophical movement going back to Edmund Burke (whom most view as the founder of modern conservatism).',
  option1Votes: 247,
  option2Votes: 173,
  tags: ['politics', 'philosophy', 'ideology']
}