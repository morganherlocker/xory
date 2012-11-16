// returns comments for a debate
exports.getCommentsbyDebateID = function(debateID, done){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	var comments = db.collection("comments");
	//find comments
	comments.find({debateID: debateID}).sort({ createdDate: 1 }).toArray(function(err, comments){
		done(comments);
	});
}

//returns one comment with a matching name
exports.getCommentByID = function(_id, done){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	var comments = db.collection("comments");
	//find comments
	

	comments.findOne({_id: _id}, function(err, comment){
		done(comment);
	});
}

// inserts a comment
exports.insertComment = function(comment, done){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	//get collection
	var comments = db.collection("comments");
	//insert the comment
	comments.insert(comment, function(err, data){

	});
}

// saves a comment
exports.saveComment = function(comment){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	//get collection
	var comments = db.collection("comments");
	//insert the comment
	comments.save(comment);
}

// deletes a comment
exports.deleteComment = function(comment){
	var Mongolian = require("mongolian");
	// Create a server instance with default host and port
	var server = new Mongolian;
	// Get database
	var db = server.db("test3");
	//get collection
	var comments = db.collection("comments");
	//insert the comment
	comments.remove(comment);
}



////////////////////////////
function d(name, obj){
  console.log(name + ': ');
  console.log(obj);
}