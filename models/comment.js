var mongoose = require("mongoose");

// Comment Schema
var commentSchema = new mongoose.Schema({
    Restaurant: String,
    Dish: String,
    Rating: String,
    Comment: String 
});

module.exports = mongoose.model("Comment", commentSchema);