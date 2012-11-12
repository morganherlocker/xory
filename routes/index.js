
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
 * GET registration page.
 */
exports.register = function(req, res){
  res.render('register', {greeting: getGreeting(req)});
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
    res.render('debate', {greeting: getGreeting(req), debate: debate});
  });
};

/*
 * GET editDebate
 */
exports.editDebate = function(req, res){
  var _id = req.params.id;
  var debates = require('../db/debates');
  var ObjectId = require('mongolian').ObjectId 

  debates.getDebateByID(new ObjectId(_id), function(debate){
    res.render('editDebate', {greeting: getGreeting(req), debate: debate});
  });
};

/*
 * GET createDebate
 */
exports.createDebate = function(req, res){
  var debate = {
      "createDate" : null,
      "authorID" : 1,
      "option1" : "",
      "option2" : "",
      "option1Args" : "",
      "option2Args" : "",
      "option1Votes" : 0,
      "option2Votes" : 0,
      "tags" : []
    }
  res.render('editDebate', {greeting: getGreeting(req), debate: debate});
}

/*
 * POST saveDebate
 */
exports.saveDebate = function(req, res){
  var _id = req.params.id;
  var debates = require('../db/debates');
  var ObjectId = require('mongolian').ObjectId 

  if(_id === 'undefined') {

    var debate = {
       // "_id" : _id,
        "createDate" : new Date(),
        "authorID" : 1,
        "option1" : req.body.option1,
        "option2" : req.body.option2,
        "option1Args" : req.body.option1Args,
        "option2Args" : req.body.option2Args,
        "option1Votes" : 0,
        "option2Votes" : 0,
        "tags" : req.body.tags.split(',')
    }
    //add data from post
    debates.insertDebate(debate);

    debates.getDebateByID(debate._id, function(debate){      
      res.redirect('/debate/'+debate._id);
    });
  }
  else {
    debates.getDebateByID(new ObjectId(_id), function(debate){
      debate.option1 = req.body.option1;
      debate.option2 = req.body.option2;
      debate.option1Args = req.body.option1Args;
      debate.option2Args = req.body.option2Args;
      debate.tags = req.body.tags.split(', ');
      //save the latest version of the debate
      debates.saveDebate(debate);
      
      res.redirect('/debate/'+_id);
    });
  }
}

/*
 * GET deleteDebate
 */
exports.deleteDebate = function(req, res){
  var _id = req.params.id;
  var debates = require('../db/debates');
  var ObjectId = require('mongolian').ObjectId 

  debates.getDebateByID(new ObjectId(_id), function(debate){
    debates.deleteDebate(debate);    
    res.redirect('/');
  });
}







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