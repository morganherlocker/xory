
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'xory', greeting: getGreeting(req)});
};

/*
 * GET login page.
 */
exports.login = function(req, res){
  res.redirect('/auth/google');
};

/*
 * GET logout
 */
exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};

/*
 * GET profile
 */
exports.profile = function(req, res){
  res.render('profile', {greeting: getGreeting(req), user: req.session.passport.user});
};

/*
 * GET debate
 */
exports.debate = function(req, res){
  var mock = require('../mocks');
  res.render('debate', {greeting: getGreeting(req), debate: mock.debate});
};





// helper functions

function getGreeting(req){
  var greeting = 'Welcome ';
  if(typeof req.session.passport.user === 'undefined'){
    greeting = '';
  }
  else{
    greeting += req.session.passport.user.displayName;
  }
  return greeting;
}

function debug(name, obj){
  console.log(name + ': ');
  console.log(obj);
}