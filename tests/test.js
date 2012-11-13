/*var debate = require('../mocks').debate;
debug('debate', debate);

var Mongolian = require("mongolian");

// Create a server instance with default host and port
var server = new Mongolian;

// Get database
var db = server.db("test3");
var debates = db.collection('debates');
debug('results before insert', debates);
debates.insert(debate);
var r = debates.find();
debug('results after insert', r);
*/

/*var debates = require('../db/debates').debates;

console.log('running function in test script...');
debates(function(data){
	console.log('CALLBACK COMPLETE');
	d('debates', data);
});*/

/*var debates = require('../db/debates');
var mockDebate = require('../mocks').debate;
debates.insertDebate(mockDebate);

var newDebates = debates.getDebates(function(data){
	var newest = data[0];
	d('newest', newest);
	debates.getDebateByID(newest._id, function(debateSelectedByID){
		d('debateSelectedByID', debateSelectedByID);
	})
});


debates.getDebateByID(newest._id, function(debateSelectedByID){
	d('debateSelectedByID', debateSelectedByID);
});
*/

var gravatar = require('gravatar');
var mmhURL = gravatar.url('morgan.herlocker@gmail.com')
d('mmhURL', mmhURL);


////////////////////////////
function d(name, obj){
  console.log(name + ': ');
  console.log(obj);
}