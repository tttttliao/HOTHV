var mongoose   = require("mongoose");
	comment    = require("./models/comment");
    DiningHall = require("./models/DiningHall");

var DH = [
        {name: "Feast", image:"http://feast.hhs.ucla.edu/wp-content/uploads/2011/09/IMG_95141.jpg", description:"Plop down in the middle where everybody walks sit in window and stare oooh, a bird, yum so sleep everywhere, but not in my bed. Eat the fat cats food wake up human for food at 4am make muffins lick butt, yet i could pee on this if i had the energy, fooled again thinking the dog likes me yet sit by the fire. Dismember a mouse and then regurgitate parts of it on the family room floor ask to go outside and ask to come inside and ask to go outside and ask to come inside dont wait for the storm to pass, dance in the rain tuxedo cats always looking dapper and push your water glass on the floor."},
        {name: "Bruin Plate", image:"http://bruinplate.hhs.ucla.edu/img/Home_NewFreshSlide.jpg", description:"Plop down in the middle where everybody walks sit in window and stare oooh, a bird, yum so sleep everywhere, but not in my bed. Eat the fat cats food wake up human for food at 4am make muffins lick butt, yet i could pee on this if i had the energy, fooled again thinking the dog likes me yet sit by the fire. Dismember a mouse and then regurgitate parts of it on the family room floor ask to go outside and ask to come inside and ask to go outside and ask to come inside dont wait for the storm to pass, dance in the rain tuxedo cats always looking dapper and push your water glass on the floor."},
        {name: "De Neve", image:"http://feast.hhs.ucla.edu/wp-content/uploads/2011/09/IMG_94941.jpg", description:"Plop down in the middle where everybody walks sit in window and stare oooh, a bird, yum so sleep everywhere, but not in my bed. Eat the fat cats food wake up human for food at 4am make muffins lick butt, yet i could pee on this if i had the energy, fooled again thinking the dog likes me yet sit by the fire. Dismember a mouse and then regurgitate parts of it on the family room floor ask to go outside and ask to come inside and ask to go outside and ask to come inside dont wait for the storm to pass, dance in the rain tuxedo cats always looking dapper and push your water glass on the floor."},
        {name: "Covel", image:"https://housing.ucla.edu/sites/g/files/yaccgq796/f/styles/panopoly_image_original/public/hh_ds_covel_drupal_0.jpg?itok=Oxo_plxD", description:"Plop down in the middle where everybody walks sit in window and stare oooh, a bird, yum so sleep everywhere, but not in my bed. Eat the fat cats food wake up human for food at 4am make muffins lick butt, yet i could pee on this if i had the energy, fooled again thinking the dog likes me yet sit by the fire. Dismember a mouse and then regurgitate parts of it on the family room floor ask to go outside and ask to come inside and ask to go outside and ask to come inside dont wait for the storm to pass, dance in the rain tuxedo cats always looking dapper and push your water glass on the floor."},
        {name:"Cafe 1919", image:"https://s3-media2.fl.yelpcdn.com/bphoto/yaWUTaR6K0TuaTfdEV_SvQ/o.jpg", description:"Plop down in the middle where everybody walks sit in window and stare oooh, a bird, yum so sleep everywhere, but not in my bed. Eat the fat cats food wake up human for food at 4am make muffins lick butt, yet i could pee on this if i had the energy, fooled again thinking the dog likes me yet sit by the fire. Dismember a mouse and then regurgitate parts of it on the family room floor ask to go outside and ask to come inside and ask to go outside and ask to come inside dont wait for the storm to pass, dance in the rain tuxedo cats always looking dapper and push your water glass on the floor."},
        {name:"Bruin Cafe", image:"https://s3-media1.fl.yelpcdn.com/bphoto/kOGPvFZzM-CoM2fMvYmavw/o.jpg", description:"Plop down in the middle where everybody walks sit in window and stare oooh, a bird, yum so sleep everywhere, but not in my bed. Eat the fat cats food wake up human for food at 4am make muffins lick butt, yet i could pee on this if i had the energy, fooled again thinking the dog likes me yet sit by the fire. Dismember a mouse and then regurgitate parts of it on the family room floor ask to go outside and ask to come inside and ask to go outside and ask to come inside dont wait for the storm to pass, dance in the rain tuxedo cats always looking dapper and push your water glass on the floor."},
        {name:"Hedrick Study", image:"https://dailybruin.com/images/2017/01/quad.hedrickstudy.AD_-640x426.jpg", description:"Plop down in the middle where everybody walks sit in window and stare oooh, a bird, yum so sleep everywhere, but not in my bed. Eat the fat cats food wake up human for food at 4am make muffins lick butt, yet i could pee on this if i had the energy, fooled again thinking the dog likes me yet sit by the fire. Dismember a mouse and then regurgitate parts of it on the family room floor ask to go outside and ask to come inside and ask to go outside and ask to come inside dont wait for the storm to pass, dance in the rain tuxedo cats always looking dapper and push your water glass on the floor."},
        {name:"Rendevous", image:"https://www.sustain.ucla.edu/wp-content/uploads/2013/05/RNDZ_3_web_960x450.jpg", description:"Plop down in the middle where everybody walks sit in window and stare oooh, a bird, yum so sleep everywhere, but not in my bed. Eat the fat cats food wake up human for food at 4am make muffins lick butt, yet i could pee on this if i had the energy, fooled again thinking the dog likes me yet sit by the fire. Dismember a mouse and then regurgitate parts of it on the family room floor ask to go outside and ask to come inside and ask to go outside and ask to come inside dont wait for the storm to pass, dance in the rain tuxedo cats always looking dapper and push your water glass on the floor."},
        {name:"De Neve Late Night", image:"https://www.collegemagazine.com/wp-content/uploads/2017/05/cel-lisboa-60314.jpg", description:"Plop down in the middle where everybody walks sit in window and stare oooh, a bird, yum so sleep everywhere, but not in my bed. Eat the fat cats food wake up human for food at 4am make muffins lick butt, yet i could pee on this if i had the energy, fooled again thinking the dog likes me yet sit by the fire. Dismember a mouse and then regurgitate parts of it on the family room floor ask to go outside and ask to come inside and ask to go outside and ask to come inside dont wait for the storm to pass, dance in the rain tuxedo cats always looking dapper and push your water glass on the floor."}
        ]; 

function seedDB(){
	//remove all comments
	comment.deleteMany({},function(err){
		if(err) console.log(err);
		else console.log("Removed all comments");
	});
	//Remove all DHs
	DiningHall.remove({},function(err){
		if(err){
			console.log(err);
		}else {
			console.log("removed all DiningHalls");
			//Create DH again
			DH.forEach(function(diningHall){
			    DiningHall.create(
			        {
			            name: diningHall.name,
			            image: diningHall.image,
			            description: diningHall.description
			        }, function(err,diningHall){
			            if(err){
			                console.log(err);
			            }else{
			                console.log("DiningHall created" );
			                console.log(diningHall);
			                comment.create({
			                	comment: "Awesome Place",
			                	author: "Iris",
			                	rating: "5"
			                }, function(err, comment){
			                	if(err) console.log(err);
			                	else{
			                		diningHall.comments.push(comment);
			                		diningHall.save();
			                		console.log("comment created");
			                	}
			                });
			            }
			        }
			    );
			});
		}
	});
}

module.exports = seedDB;