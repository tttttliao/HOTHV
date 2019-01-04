var mongoose = require("mongoose");

// Comment Schema
var commentSchema = new mongoose.Schema({
    rating: String,
    comment: String,
    author: {
    	id:{
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "User"
    	},
    	username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);