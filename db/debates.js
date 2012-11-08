// returns the last 10 debates
exports.getDebates = function(done){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	var debates = db.collection("debates");
	//find debates
	debates.find().limit(10).sort({ createdDate: 1 }).toArray(function(err, post){
		done(post);
	});
}

//returns 1 debate with a matching _id
exports.getDebateByID = function(_id, done){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	var debates = db.collection("debates");
	//find debates
	debates.findOne({_id: _id}, function(err, post){
		d('date', post.createDate)
		done(post);
	});
}

// inserts a debate
exports.insertDebate = function(debate, done){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	//get collection
	var debates = db.collection("debates");
	//insert the debate
	debates.insert(debate);
}




////////////////////////////
function d(name, obj){
  console.log(name + ': ');
  console.log(obj);
}