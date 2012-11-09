
/*
 * GET home page.
 */

exports.index = function(req, res){
  var debates = require('../db/debates');
  var newDebates = debates.getDebates(function(newDebates){
    debug('newDebates in callback for index.js route:', newDebates);
    res.render('index', { title: 'xory', greeting: getGreeting(req), newDebates: newDebates});
  });
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
  var _id = req.params.id;
  var mock = require('../mocks');
  var debates = require('../db/debates');
  var ObjectId = require('mongolian').ObjectId 

  debates.getDebateByID(new ObjectId(_id), function(debate){
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    debug(_id, _id);
    debug('debate returned from by id query', debate)
    res.render('debate', {greeting: getGreeting(req), debate: debate});
  });
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