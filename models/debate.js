// debate schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var debateSchema = new Schema({
	  authorID:  { type: Number }
	, option1:  { type: String }
	, option2:  { type: String }
	, option1Args:  { type: String }
	, option2Args:  { type: String }
	, option1Votes:  { type: Number, default: 0 }
	, option2Votes:  { type: Number, default: 0 }
	, tags: { type: [] }
})

mongoose.model('debate', debateSchema)