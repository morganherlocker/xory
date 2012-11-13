// returns the last 10 users
exports.getUsers = function(done){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	var users = db.collection("users");
	//find users
	users.find().limit(10).sort({ createdDate: 1 }).toArray(function(err, post){
		done(post);
	});
}

//returns one user with a matching name
exports.getUserByName = function(name, done){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	var users = db.collection("users");
	//find users
	users.findOne({name: name}, function(err, post){
		done(post);
	});
}

//returns one user with a matching email
exports.getUserByEmail = function(email, done){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	var users = db.collection("users");
	//find users
	users.findOne({email: email}, function(err, user){
		done(user);
	});
}

// inserts a user
exports.insertUser = function(user, done){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	//get collection
	var users = db.collection("users");
	//insert the user
	users.insert(user, function(err, data){

	});
}

// saves a user
exports.saveUser = function(user){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	//get collection
	var users = db.collection("users");
	//insert the user
	users.save(user);
}

// deletes a user
exports.deleteuser = function(user){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	//get collection
	var users = db.collection("users");
	//insert the user
	users.remove(user);
}



////////////////////////////
function d(name, obj){
  console.log(name + ': ');
  console.log(obj);
}