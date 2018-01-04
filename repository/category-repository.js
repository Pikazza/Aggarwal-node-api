'use strict';

const category = require('../models/category').Category;

module.exports.findProductById =  (ptyId, next) => {
	category.findOne({"categoryId":ptyId}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.findAll=  ( next) => {
	category.findOne({}, function(err, result) {
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

		category.findOneAndUpdate({"_id":productReq._id},productReq, {new: true},function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				//console.log("pikazza         "+ result);
				next(null, result);
			}
		});
};

