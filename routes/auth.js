var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user"),
    mongoose = require("mongoose")




router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/")
        });
    });
});

//Login
router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }),function(req, res){
});

//Logout
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        console.log("Authorized");
        return next();
    }
    res.redirect("/login");
}

module.exports = router;