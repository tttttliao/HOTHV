var mongoose = require("mongoose");
// DiningHall Schema
var diningHallSchema = new mongoose.Schema({
    name: String,
    image: String
});

var DiningHall = mongoose.model("DiningHall", diningHallSchema);