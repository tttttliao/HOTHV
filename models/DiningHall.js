var mongoose = require("mongoose");
// DiningHall Schema
var diningHallSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[
    	{
    		type:mongoose.Schema.Types.ObjectId,
    		ref: "Comment"
    	}
    ],
    menu:[
    	{
    		type:mongoose.Schema.Types.ObjectId,
    		ref: "Dish"
    	}
    ]
});

module.exports = mongoose.model("DiningHall", diningHallSchema);