'use strict';

const notification = require('../models/notification').Notification; 

module.exports.findNotificationById =  (ptyId, next) => {
		notification.findOne({"notId":ptyId}, function(err, result) {
			if (err) next(err);
			next(null, result);
		}); 


};

module.exports.findAll=  ( next) => {
	notification.find({}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

/*module.exports.findValidNotification=  ( next) => {
	notification.find({'$and': [ { "sendAt": {'$lt': new Date() } }, { "status"="ACTIVE" } ] }, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};*/

module.exports.create1 = (productReq, next) => {
	console.log("notification in impl..4");
	notification.create(productReq,function(err, result) {
		console.log("notification in impl..5");
		if (err) {next(err);}
		else{
		 next(null, result);			
		}
	});
};

module.exports.update = function (productReq, next) {

		notification.findOneAndUpdate({"notId":productReq.notId},productReq,{new: true},function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				console.log("pikazza"+ result);
				next(null, result);
			}
		});
};

