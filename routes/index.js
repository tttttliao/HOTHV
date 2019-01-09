var express = require("express"),
    router  = express.Router(),
    DiningHall    = require("../models/DiningHall"),
    passport      = require("passport"),
    request = require("request"),
    Xray = require("x-ray"),
    Comment       = require("../models/comment")

const xray = new Xray();
var pages = xray('http://menu.dining.ucla.edu/Menus', 'div.half-col',[{
    title: 'h3',
    menu: 'a.recipelink'
}]).write('result.json');


function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        console.log("Authorized");
        return next();
    }
    res.redirect("/login");
}

router.get("/",function(req,res){
    DiningHall.find({},function(err,diningHall){
        if(err){
            console.log(err);
        }else{
            res.render("DiningHalls", {DiningHalls:diningHall});
        }
    });
});

//Dining Hall Page is the same as the home page
router.get("/DiningHalls",function(req,res){
    DiningHall.find({},function(err,diningHall){
        if(err){
            console.log(err);
        }else{
            res.render("DiningHalls", {DiningHalls:diningHall});
        }
    });
});

router.post("/DiningHalls", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newDiningHall = {name:name, image:image}
    DiningHalls.push(newDiningHall);
    res.redirect("/DiningHalls")
});


//Dining Hall info pag
router.get("/DiningHalls/:name", function(req, res){
    DiningHall.findOne({name: req.params.name}).populate("comments").exec(function(err,foundDH){
        if(err) console.log(err);
        else{
            console.log(foundDH);
            res.render("show",{DiningHall:foundDH});
        }
    });
});

router.get("/DiningHalls/:name/comments/new", isLoggedIn, function(req, res) {
    DiningHall.findOne({name: req.params.name}, function(err, diningHall){
        if(err) console.log(err);
        else{
            res.render("new-comment", {dininghall:diningHall});
        }
    });
});

router.post("/DiningHalls/:name/comments", isLoggedIn, function(req, res){
    //lookup dininghall using name
    DiningHall.findOne({name: req.params.name}, function(err, DH){
        if(err) {console.log(err); res.redirect("/DiningHalls");}
        else{
            //create new comment
            Comment.create(req.body.comment, function(err,comment){
                if(err) console.log(err);
                else{
                    //connect new comment to dininghall
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    DH.comments.push(comment);
                    DH.save();
                    //redirect to dininghall info page
                    res.redirect(`/DiningHalls/${req.params.name}`);
                }
            });
        }
    });
});

module.exports = router;