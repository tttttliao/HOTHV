var express = require("express");
var router = express.Router();

router.get("/feast-menu", function(req, res) {
    res.render("feast-menu");
});

let arr = ["Its Awesome!!!!", "I loved it","There's no way you can miss it!"];

router.get("/Tarako-Pasta-review", function(req, res) {
    const obj = {comments:[]};
    for (let i = 0; i < arr.length; i++){
        obj.comments.push({"text": arr[i]});
    }
    res.render("Tarako-Pasta-review", obj);
});

router.post("/Tarako-Pasta-review", function(req, res){ 
});

router.get("/Tarako-Pasta-review/new-comment",function(req,res){
    res.render("new-comment");
});

module.exports = router;
