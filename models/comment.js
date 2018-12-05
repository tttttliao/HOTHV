var mongoose = require("mongoose");

// Comment Schema
var commentSchema = new mongoose.Schema({
    rating: String,
    comment: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);