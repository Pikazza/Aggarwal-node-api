'use strict';

const franchiseeSchedule = require('../models/franchisee-schedule').FranchiseeSchedule;

module.exports.create = (scheduleReq, next) => {
	console.log("its comming like charm ");
	franchiseeSchedule.create(scheduleReq, function(err, result) {
		if (err)  next(err);
		next(null, result);
	});
};

module.exports.getScheduleByFranchiseeId = (franchiseeId, next) => {
	franchiseeSchedule.findOne({"franchiseeId":franchiseeId}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.update = (scheduleReq, next) => {
	franchiseeSchedule.findOneAndUpdate({"franchiseeId":scheduleReq.franchiseeId},scheduleReq,function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				console.log("pikazza"+ result);
				next(null, result);
			}
		});
};

/*module.exports.overrideMenu = (scheduleReq, next) => {
	franchiseeSchedule.findOneAndUpdate({"franchiseeId":scheduleReq.franchiseeId},scheduleReq,function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				console.log("pikazza"+ result);
				next(null, result);
			}
		});
};*/