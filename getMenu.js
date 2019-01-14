const Xray = require("x-ray"),
	  request = require("request"),
	  fs = require("fs"),
	  xray = new Xray(),
	  mongoose = require("mongoose"),
	  dish = require("./models/dish")


function getMenu(menu){
	xray('http://menu.dining.ucla.edu/Menus','.menu-block',[{
	title: 'h3',
	menuItems: ['.recipelink']
	}])(function(err,data){
		//console.log(data);
		let count=0;
		data.forEach(function(menu){
			let dh = menu.title;
			if(dh=="FEAST at Rieber"){dh="Feast";}
			DiningHall.findOne({name: dh}, function(err, foundDH){
				menu.menuItems.forEach(function(item){
					let found = false;
					foundDH.menu.forEach(function(existingItemId){
						dish.findOne({_id: existingItemId}, function(err, existingItem){
							if(err) console.log(err);
							else if(item == existingItem.name) found=true;
						});
						if(found) break;
					});
					if(!found){
						count++;
						// console.log(item);
						dish.create({name: item, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"}, function(err,newDish){
							foundDH.menu.push(newDish);
							// console.log(newDish.name);
						});
					}
				});
				foundDH.save();
			});
		});
		menu.array = data
	});
}

module.exports = getMenu;
