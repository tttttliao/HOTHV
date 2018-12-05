var mongoose = require("mongoose");
// DiningHall Schema
var diningHallSchema = new mongoose.Schema({
    name: String,
    image: String,
    comments:[
    	{
    		type:mongoose.Schema.Types.ObjectId,
    		ref: "Comment"
    	}
    ]
});

module.exports = mongoose.model("DiningHall", diningHallSchema);