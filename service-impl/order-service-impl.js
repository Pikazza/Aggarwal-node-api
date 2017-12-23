
const orderRepository = require('../repository/order-repository'); 
const SequenceImpl = require('../service-impl/sequence');
const logger = require('../config/logger');
const order = require('../models/order').Order;
const OrderNotFoundError= require('../exceptions/order-not-found-error');
const apiUtils = require('../util/api-utils');
const _ = require('lodash');

module.exports.getAll = (userType, userId, next) => {
		  orderRepository.findAll(userType, userId, function(err, result) {
		  if (err) next(err);
		  next(null, result);
	}); 
};

module.exports.getByOrderId = (userType, userId, orderId, next) => {
	orderRepository.findByOrderId(userType, userId, orderId, function(err, result) {
		if (err){
			next(err);
		}
		if(!result) {
			next(new OrderNotFoundError("No Orders found for the franchisee id "+orderId));
		  }
		else{
			let or= new order(result);
			next(null, result);
		}	
	});		
};

module.exports.getByDate = (userType, userId, startDate, endDate, next) => {
	logger.info("coming to impl get by date");
	orderRepository.findByDate(userType, userId, startDate, endDate, function(err, result) {
		if (err){
			next(err);
		}
		else{
			next(null, result);
		}	
	});		
};

module.exports.create = (orderReq ,next) => {
	SequenceImpl.getSequence("order", function(err, sequenceId){
	  	if (err){
	  		next(err);
	  	}
	  	else{
	  		orderReq.orderId=sequenceId;
	  		if(orderReq.listOfItems){
	  			_.forEach(orderReq.listOfItems, function(item){
			  		if(item.images){
						_.forEach(item.images, function(image){
							if(image.image){
									image.image=apiUtils.uploadImage("order_"+(_.random(10000, 99)),image.image);
								}
								console.log("pikazza image.image"+ image.image)
						});
			  		}
			  	});
	  		}
			orderRepository.create(orderReq ,function(err, result){
				if(err){
					next(err);
				}
				else{
					next(null, result)
				}
			});
		}
	});
}

module.exports.update = (orderId, orderReq ,next) => {

	orderRepository.findByOrderId('ADMIN', 0, orderId, function(err, result) {
		if (err){
			next(err);
		}
		if(!result) {
			next(new OrderNotFoundError("No Orders found for the franchisee id "+orderId));
		  }
		else if(orderId != orderReq.orderId){
			next(new OrderNotFoundError("Order id passed in URL "+orderId+
			" is not same as Order id "+orderReq.orderId +" passed in body"));
		}
		else{
			result.orderStatus=orderReq.orderStatus;
			result.totalAmountToBePaid=orderReq.totalAmountToBePaid;
			result.paymentStatus=orderReq.paymentStatus;
			orderRepository.update(result, function(err, updatedOrder){
				next(null, updatedOrder);
			});
		}	
	});	
}