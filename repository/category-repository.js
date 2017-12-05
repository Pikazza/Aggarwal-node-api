'use strict';

const category = require('../models/category').Category;
const franchiseeRepository = require('../repository/franchisee-repository'); 

module.exports.findProductById =  (ptyId, next) => {
	category.findOne({"categoryId":ptyId}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.findAll=  ( next) => {
	category.find({}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.create = (productReq, next) => {
	category.create(productReq, function(err, result) {
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

		category.findOneAndUpdate({"categoryId":productReq.categoryId},productReq, {new: true},function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				console.log("pikazza"+ result);
				next(null, result);
			}
		});
};

