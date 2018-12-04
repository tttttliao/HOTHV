var mongoose = require("mongoose");
// DiningHall Schema
var diningHallSchema = new mongoose.Schema({
    name: String,
    image: String
});

module.exports = mongoose.model("DiningHall", diningHallSchema);