var mongoose   = require("mongoose");
	comment    = require("./models/comment");
    DiningHall = require("./models/DiningHall");

var DH = [
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

function seedDB(){
	//Remove all DHs
	DiningHall.remove({},function(err){
		if(err){
			console.log(err)
		}else {
			console.log("removed all DiningHalls");
			//Create DH again
			DiningHalls.forEach(function(diningHall){
			    DiningHall.create(
			        {
			            name: diningHall.name,
			            image: diningHall.image
			        }, function(err,diningHall){
			            if(err){
			                console.log(err);
			            }else{
			                console.log("DiningHall created" );
			                console.log(diningHall);
			            }
			        }
			    );
			});
		}
	});
}

module.exports = seedDB;