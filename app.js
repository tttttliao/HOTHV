var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    comment       = require("./models/comment"),
    DiningHall    = require("./models/DiningHall"),
    seedDB        = require("./seeds"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user")

var authRoutes    = require("./routes/auth"),
    indexRoutes   = require("./routes/index"),
    archiveRoutes = require("./routes/archive")


seedDB();
mongoose.connect("mongodb://localhost/Belp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static('public'));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});
app.use(authRoutes);
app.use(indexRoutes);
app.use(archiveRoutes);


app.listen(3000,"localhost",function(){
    console.log("Belp");
});


