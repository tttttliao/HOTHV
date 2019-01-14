var mongoose = require("mongoose");
// DiningHall Schema
var dishSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[
    	{
    		type:mongoose.Schema.Types.ObjectId,
    		ref: "Comment"
    	}
    ]
});

module.exports = mongoose.model("dish", dishSchema);