var express    = require("express"),
    router     = express.Router(),
    DiningHall = require("../models/DiningHall"),
    passport   = require("passport"),
    Comment    = require("../models/comment"),
    getMenu    = require("../getMenu")

//get today's menu
var menu = {array:[]};
getMenu(menu);
var takeOut = {array:[]};
var today = new Date();
var storedDate={
    month: today.getMonth(),
    day: today.getdate()
};

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

router.get("/DiningHalls/:name/menu", function(req, res){

    var dateToday={
        month: today.getMonth(),
        day: today.getdate()
    };
    //If it's a new today, update menu
    if(dateToday.month>storedDate.month || dateToday.day>storedDate.day){
        storedDate.month=dateToday.month;
        storedDate.day=dateToday.day;
        getMenu(menu);   
    }

    //locate dininghall
    DiningHall.findOne({name: req.params.name}, function(err, diningHall){
        if(err){
            res.send("We do not have the dininghall you are looking for");
            console.log(err);
        } 
        else{
            let menuToday = [];
            menu.array.forEach(function(item){
                let title = diningHall.name;
                if(title== "Feast") 
                    title="FEAST at Rieber";
                //console.log(title);
                if(item.title==title){
                    //console.log(item.title);
                    if(title== "FEAST at Rieber")
                        menuToday.push("Feast");
                    else
                        menuToday.push(title);
                    item.menuItems.forEach(function(menuItem){
                        menuToday.push(menuItem)
                    });
                }
            });
            // console.log("Menu :"+menuToday)
            res.render("menu",{menuToday:menuToday, dininghall:diningHall});
        }
    });
});
        
router.get("/DiningHalls/:name/:id", function(req, res){
    DiningHall.findOne({name: req.params.name}, function(err, diningHall){
        if(err){console.log(err);} 
        else{
            let found = false;
            diningHall.menu.forEach(function(dish){
                if(dish==req.params.id){
                    found = true;
                    res.render("dish", {dish:dish.name});
                }
            });

            if(!found){
                res.send("We do not have any information for the dish you are looking for.");
            }
        }
    });
});

module.exports = router;