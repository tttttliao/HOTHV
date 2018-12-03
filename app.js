// var firebase = require("firebase");
// var config = {
//   apiKey: "AIzaSyAE1b45NBYVD26qCBr2hKezxZEclNsV2Hw",
//   authDomain: "bruineating.firebaseapp.com",
//   databaseURL: "https://bruineating.firebaseio.com/",
//   storageBucket: "bruineating.appspot.com",
// };
// firebase.initializeApp(config);
var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose")

mongoose.connect("mongodb://localhost/Belp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static('public'));

// Comment Schema
var commentSchema = new mongoose.Schema({
    Restaurant: String,
    Dish: String,
    Rating: String,
    Comment: String 
});
var Comment = mongoose.model("Comment", commentSchema);


// DiningHall Schema
var diningHallSchema = new mongoose.Schema({
    name: String,
    image: String
});

var DiningHall = mongoose.model("DiningHall", diningHallSchema);

var DiningHalls = [
        {name: "Feast", image:"http://feast.hhs.ucla.edu/wp-content/uploads/2011/09/IMG_95141.jpg"},
        {name: "Bruin Plate", image:"http://bruinplate.hhs.ucla.edu/img/Home_NewFreshSlide.jpg"},
        {name: "De Neve", image:"http://feast.hhs.ucla.edu/wp-content/uploads/2011/09/IMG_94941.jpg"},
        {name: "Covel", image:"https://housing.ucla.edu/sites/g/files/yaccgq796/f/styles/panopoly_image_original/public/hh_ds_covel_drupal_0.jpg?itok=Oxo_plxD"},
        {name:"Cafe 1919", image:"https://s3-media2.fl.yelpcdn.com/bphoto/yaWUTaR6K0TuaTfdEV_SvQ/o.jpg"},
        {name:"Bruin Cafe", image:"https://s3-media1.fl.yelpcdn.com/bphoto/kOGPvFZzM-CoM2fMvYmavw/o.jpg"},
        {name:"Hedrick Study", image:"https://dailybruin.com/images/2017/01/quad.hedrickstudy.AD_-640x426.jpg"},
        {name:"Rendevous", image:"https://www.sustain.ucla.edu/wp-content/uploads/2013/05/RNDZ_3_web_960x450.jpg"},
        {name:"De Neve Late Night", image:"https://www.collegemagazine.com/wp-content/uploads/2017/05/cel-lisboa-60314.jpg"}
        ]; 

// DiningHalls.forEach(function(diningHall){
//     DiningHall.create(
//         {
//             name: diningHall.name,
//             image: diningHall.image
//         }, function(err,diningHall){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log("DiningHall created" );
//                 console.log(diningHall);
//             }
//         }
//     );
// });

// firebase.database().ref('users/').set(DiningHalls);

app.get("/",function(req,res){
    DiningHall.find({},function(err,diningHall){
        if(err){
            console.log(err);
        }else{
            res.render("DiningHalls", {DiningHalls:diningHall});
        }
    });
    //res.render("DiningHalls", {DiningHalls:DiningHalls});
});

app.get("/DiningHalls",function(req,res){
    DiningHall.find({},function(err,diningHall){
        if(err){
            console.log(err);
        }else{
            res.render("DiningHalls", {DiningHalls:diningHall});
        }
    });
});

app.post("/DiningHalls", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newDiningHall = {name:name, image:image}
    DiningHalls.push(newDiningHall);
    res.redirect("/DiningHalls")
});

app.get("/DiningHalls/:id", function(req, res){
    res.render("show");
});

app.get("/feast-menu", function(req, res) {
    res.render("feast-menu");
})

let arr = ["Its Awesome!!!!", "I loved it","There's no way you can miss it!"];

app.get("/Tarako-Pasta-review", function(req, res) {
    const obj = {comments:[]};
    for (let i = 0; i < arr.length; i++){
        obj.comments.push({"text": arr[i]});
    }
    res.render("Tarako-Pasta-review", obj);
})

app.post("/Tarako-Pasta-review", function(req, res){
    
});

app.get("/Tarako-Pasta-review/new-comment",function(req,res){
    res.render("new-comment");
});

app.listen(3000,"localhost",function(){
    console.log("Yelp Dining");
});


