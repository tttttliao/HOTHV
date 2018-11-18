var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyAE1b45NBYVD26qCBr2hKezxZEclNsV2Hw",
  authDomain: "bruineating.firebaseapp.com",
  databaseURL: "https://bruineating.firebaseio.com/",
  storageBucket: "bruineating.appspot.com",
};
firebase.initializeApp(config);
var express = require("express");
var app = express();
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static('public'));

app.get("/",function(req,res){
    res.render("landing");
});


var DiningHalls = [
        {name: "Feast", image:"http://feast.hhs.ucla.edu/wp-content/uploads/2011/09/IMG_95141.jpg"},
        {name: "Bruin Plate", image:"http://bruinplate.hhs.ucla.edu/img/Home_NewFreshSlide.jpg"},
        {name: "De Neve", image:"http://feast.hhs.ucla.edu/wp-content/uploads/2011/09/IMG_94941.jpg"}
        ]; 

firebase.database().ref('users/').set(DiningHalls);

app.get("/DiningHalls",function(req,res){
    
        res.render("DiningHalls", {DiningHalls:DiningHalls});
});

app.post("/DiningHalls", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newDiningHall = {name:name, image:image}
    DiningHalls.push(newDiningHall);
    res.redirect("/DiningHalls")
});

app.get("/feast-menu", function(req, res) {
    res.render("feast-menu");
})

app.get("/Tarako-Pasta-review", function(req, res) {
    res.render("Tarako-Pasta-review");
})

app.get("/new-comment",function(req,res){
    res.render("new-comment");
});

app.listen(3000,"localhost",function(){
    console.log("Yelp Dining");
});


