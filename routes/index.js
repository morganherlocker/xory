
/*
 * GET home page.
 */

exports.index = function(req, res){
  var debates = require('../db/debates');
  var newDebates = debates.getDebates(function(newDebates){
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
//  res.render('editUser', {greeting: getGreeting(req), user: req.session.passport.user.xory});
};

/*
 * GET logout
 */
exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};

/*
 * GET user
 */
exports.user = function(req, res){
  var gravatar = require('gravatar');
  var profilePic = gravatar.url('morgan.herlocker@gmail.com')
  var name = req.params.name;
  var users = require('../db/users');

  if(typeof name === 'undefined'){
    if(typeof req.session.passport.user === 'undefined'){
      res.redirect('/');
    }
    else{
      users.getUserByName(req.session.passport.user.xory.name, function(user){
        res.render('user', {greeting: getGreeting(req), profilePic: profilePic, user: user, owner: true});
      });
    }
  }
  else{
    name = name.replace('.', ' ');
    users.getUserByName(name, function(user){
      var owner = false;
      //check to see if this is the owner!!!
      res.render('user', {greeting: getGreeting(req), profilePic: profilePic, user: user});
    });
  }
}

/*
 * GET editUser
 */
exports.editUser = function(req, res){
  var gravatar = require('gravatar');
  var profilePic = gravatar.url('morgan.herlocker@gmail.com')
  var _id = req.params.id;
  var users = require('../db/users');
  var ObjectId = require('mongolian').ObjectId;

  users.getUserByID(new ObjectId(_id), function(user){
    res.render('editUser', {greeting: getGreeting(req), profilePic: profilePic, user: user});
  });
}

/*
 * POST saveUser
 */
exports.saveUser = function(req, res){
  var gravatar = require('gravatar');
  var profilePic = gravatar.url('morgan.herlocker@gmail.com')
  var _id = req.params.id;
  var users = require('../db/users');
  var ObjectId = require('mongolian').ObjectId 

  users.getUserByID(new ObjectId(_id), function(user){
    user.name = req.body.name;
    user.about = req.body.about;
    user.political = req.body.political;
    user.os = req.body.os;
    user.music = req.body.music;

    users.saveUser(user);
    res.redirect('/auth/google/');
   // res.render('user', {greeting: getGreeting(req), profilePic: profilePic, user: user});
  });
}

/*
 * GET debate
 */
exports.debate = function(req, res){
  var _id = req.params.id;
  var debates = require('../db/debates');
  var ObjectId = require('mongolian').ObjectId 

  debates.getDebateByID(new ObjectId(_id), function(debate){
    var isOwner = false;
    if(typeof req.session.passport.user !== 'undefined'){
      if (req.session.passport.user.xory.name === debate.authorName){
        isOwner = true;
      }
    }
    var markdown = require('node-markdown').Markdown
    debate.option1Args = markdown(debate.option1Args);
    debate.option2Args = markdown(debate.option2Args);

    res.render('debate', {greeting: getGreeting(req), debate: debate, isOwner: isOwner});
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
        authorName: req.session.passport.user.xory.name,
        "createDate" : new Date(),
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