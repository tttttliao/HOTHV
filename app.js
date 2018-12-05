var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    comment    = require("./models/comment"),
    DiningHall = require("./models/DiningHall"),
    seedDB     = require("./seeds")

seedDB();
mongoose.connect("mongodb://localhost/Belp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static('public'));

//SHOW
//Home Page
app.get("/",function(req,res){
    DiningHall.find({},function(err,diningHall){
        if(err){
            console.log(err);
        }else{
            res.render("DiningHalls", {DiningHalls:diningHall});
        }
    });
});

//Dining Hall Page is the same as the home page
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


//Dining Hall info page
app.get("/DiningHalls/:name", function(req, res){
    DiningHall.findOne({name: req.params.name}).populate("comments").exec(function(err,foundDH){
        if(err) console.log(err);
        else{
            console.log(foundDH);
            res.render("show",{DiningHall:foundDH});
        }
    });
});

app.get("/DiningHalls/:name/comments/new", function(req, res) {
    DiningHall.findOne({name: req.params.name}, function(err, diningHall){
        if(err) console.log(err);
        else{
            res.render("new-comment", {dininghall:diningHall});
        }
    });
});

app.post("/DiningHalls/:name/comments", function(req, res){
    //lookup dininghall using id
    DiningHall.findOne({name: req.params.name}, function(err, DH){
        if(err) {console.log(err); res.redirect("/DiningHalls");}
        else{
            comment.create(req.body.comment, function(err,comment){
                if(err) console.log(err);
                else{
                    DH.comments.push(comment);
                    DH.save();
                    res.redirect(`/DiningHalls/${req.params.name}`);
                }
            });
        }
    });
    //create new comment
    //connect new comment to dininghall
    //redirect to dininghall info page
});

app.get("/feast-menu", function(req, res) {
    res.render("feast-menu");
});

let arr = ["Its Awesome!!!!", "I loved it","There's no way you can miss it!"];

app.get("/Tarako-Pasta-review", function(req, res) {
    const obj = {comments:[]};
    for (let i = 0; i < arr.length; i++){
        obj.comments.push({"text": arr[i]});
    }
    res.render("Tarako-Pasta-review", obj);
});

app.post("/Tarako-Pasta-review", function(req, res){ 
});

app.get("/Tarako-Pasta-review/new-comment",function(req,res){
    res.render("new-comment");
});

app.listen(3000,"localhost",function(){
    console.log("Yelp Dining");
});


