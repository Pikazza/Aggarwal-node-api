'use strict';

const product = require('../models/product').Product; 

module.exports.findProductById =  (ptyId, next) => {

	let array=[];
	if (ptyId.indexOf(',') > -1) {
		array = ptyId.split(',');
		console.log("list of ids "+ptyId );
		console.log("list of ids "+array );
			product.find( { "itemId": {"$in":array } } , function(err, result) {
			if (err) next(err);
			next(null, result);
		});
	}else{
		product.findOne({"itemId":ptyId}, function(err, result) {
			if (err) next(err);
			next(null, result);
		}); 

	}

};

module.exports.search =  (ptyId, next) => {

		product.find( {'$or':[
			{"itemName": { "$regex": ptyId}},
			{"category1": { "$regex": ptyId}}, 
			{"category2": { "$regex": ptyId}}, 
			{"category3": { "$regex": ptyId}}, 
			{"category4": { "$regex": ptyId}}
			 ]}, function(err, result) {
			if (err) next(err);
			next(null, result);
			}); 

};

module.exports.findProductByCategory=  (catOne,catTwo, catThree, next) => {
	console.log(catOne + catTwo);
	let query={ };
	if (catOne && catTwo && catThree){
		query={"category1":catOne,"category2":catTwo,"category3":catThree};
	}
	else if(catOne){
		query={"category1":catOne};
	}
	else if(catTwo){
		query={"category2":catTwo};
	}else if(catThree){
		query={"category3":catThree};
	}
console.log("the  cat based query"+ JSON.stringify(query));
	product.find(query , function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.findAll=  ( next) => {
	product.find({}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.create = (productReq, next) => {
	product.create(productReq, function(err, result) {
		if (err)  next(err);
		next(null, result);
	});
};

module.exports.update = function (productReq, next) {
	//var ss = new franchisee(partyReq);
	/*partyReq.save(function(err, result) {
			if (err)  next(err);
			next(null, result);
		});*/

		product.findOneAndUpdate({"itemId":productReq.itemId},productReq,{new: true},function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				console.log("pikazza"+ result);
				next(null, result);
			}
		});
};

module.exports.updateCategory4 = function (oldValue,newValue, next) {
		product.update({"category4":oldValue},{"category4":newValue},{multi: true},function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				next(null, result);
			}
		});
};

module.exports.updateCategory3 = function (oldValue,newValue, next) {
		product.update({"category3":oldValue},{"category3":newValue},{multi: true},function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				next(null, result);
			}
		});
};
module.exports.updateCategory2 = function (oldValue,newValue, next) {
		product.update({"category2":oldValue},{"category2":newValue},{multi: true},function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				next(null, result);
			}
		});
};
module.exports.updateCategory1 = function (oldValue,newValue, next) {
		product.update({"category1":oldValue},{"category1":newValue},{multi: true},function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				next(null, result);
			}
		});
};