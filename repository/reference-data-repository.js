'use strict';

const referenceData =require('../models/reference-data').ReferenceData;

module.exports.findAll = (next) => {
	console.log("coming to ref date repo");
	// referenceData.find({}, function(err, result) {
	// 	console.log("coming to ref date repo "+JSON.stringify(result));
	// 	if (err) next(err);
	// 	next(null, result);
	// }); 
		referenceData.findOne({}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.findRefById =  (refId, next) => {
		console.log("coming to ref date repo  " +refId);
	referenceData.findOne({"refId":refId}, function(err, result) {
		if (err){
			 next(err);
		}
		next(null, result);
	}); 
};

module.exports.update = function (productReq, next) {
		referenceData.findOneAndUpdate({"_id":productReq._id},productReq,{new: true},function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				next(null, result);
			}
		});
};