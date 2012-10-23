
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'xory' });
};

/*
 * GET login page.
 */

exports.login = function(req, res){
  res.render('login');
};

/*
 * GET register page.
 */

exports.register = function(req, res){
  res.render('register');
};