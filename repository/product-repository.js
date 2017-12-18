'use strict';

const product = require('../models/product').Product;
const franchiseeRepository = require('../repository/franchisee-repository'); 

module.exports.findProductById =  (ptyId, next) => {
	product.findOne({"itemId":ptyId}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.findProductByCategory=  (catOne,catTwo, next) => {
	console.log(catOne + catTwo);
	let query={ };
	if (catOne && catTwo){
		query={"category1":catOne,"category2":catTwo};
	}
	else if(catOne){
		query={"category1":catOne};
	}
	else if(catTwo){
		query={"category2":catTwo};
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
	product.create(productReq,{new : true}, function(err, result) {
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

