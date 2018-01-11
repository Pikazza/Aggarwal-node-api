'use strict';

const _ = require('lodash');

const notification = require('../models/notification').Notification;
const notificationRepository = require('../repository/notification-repository'); 

const SequenceImpl = require('../service-impl/sequence');
const apiUtils = require('../util/api-utils');
 
const ProductNotFoundError = require('../exceptions/menu-not-found-error');

module.exports.findNotificationById = (notId, next) => {
	notificationRepository.findNotificationById(notId, function(err, result) {
		if (err){
			next(err);			
		}
		if(!result){
			next(new ProductNotFoundError("No Product items found for given id"+notId));
		}
		else{
  			next(null, result);
		}	
	});		
};

module.exports.findAllNotification = ( next) => {
	notificationRepository.findAll( function(err, result) {
		if (err){
			next(err);			
		}
		else{
  			next(null, result);
		}	
	});		
};


module.exports.create = (notReq, next) => { 
console.log("notification in impl..");
		SequenceImpl.getSequence("notification", function(err, sequenceId){
			if (err){
				next(err);
			}
			else{
				console.log("notification in impl..2");
				var notify = new notification(notReq);
				notify.notId=sequenceId;
				notify.createdOn= new Date();
				notificationRepository.create(notify, function(err, result) {
					console.log("notification in impl..3");
					if (err){
						next(err);
					} 
					else{
						next(null, result);
					}
					
				});
			}
		});
}

module.exports.update = (notId, productReq, next) => {
console.log("coming to impl "+notId)
	notificationRepository.findNotificationById(notId, function(err, oneCustomer) {
		if (err){
			next(err);
		}
		if(!oneCustomer) {
			next(new ProductNotFoundError("No Product items found for given id"+notId));
		}
		else if(notId != productReq.notId){
			next(new ProductNotFoundError("Product id passed in URL "+notId+
			" is not same as Product id "+productReq.notId +" passed in body"));
		}
		else{
			let prod = new notification(oneCustomer);
			prod.notName=productReq.notName;
			prod.notDesc=productReq.notDesc;
			prod.channelType=productReq.channelType;
			prod.status=productReq.status;
			prod.sendAt=productReq.sendAt;

			notificationRepository.update(prod, function(err, result) {
				if(err) {
					next(err);
				}
				else
				{
					next(null, result);
				}
			});
		}

	});
}





