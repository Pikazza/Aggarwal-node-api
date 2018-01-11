'use strict';

const notificationServiceImpl = require('../service-impl/notification-service-impl');
const logger = require('../config/logger');
const apiUtils = require('../util/api-utils');
exports.get = (req, res, next) => {
	//logger.info("Getting store products...");
		
	if(req.query.notId){
		logger.info("Getting store products... base on ids");
		notificationServiceImpl.findNotificationById(req.query.notId, function (err , result){
			if (err) {
				next(err);
			} 
			else{
			res.status(200).json(result);
			}
		});
	}else{
		logger.info("Getting store products...");
		notificationServiceImpl.findAllNotification(function (err , result){
			if (err) {
				next(err);
			}
			else{
			res.status(200).json(result);
			}
		});
	}
};

exports.add = (req, res, next) => {
	logger.info("Rigistering new product..");
    notificationServiceImpl.create(req.body, function (err , result){
		if (err) {
			next(err);
		}
		else{
		res.status(200).json(result);
		}
	});
};

exports.update = (req, res, next) => {
	logger.info("Updating existing Product.."+req.params.notId);
    notificationServiceImpl.update(req.params.notId, req.body, function (err , result){
		if (err) next(err);
		res.status(200).json(result);
	});
};