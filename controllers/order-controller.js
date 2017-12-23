
const orderServiceImpl = require('../service-impl/order-service-impl');
const validateOrder = require('../models/order').ValidateOrder;
const logger = require('../config/logger');
const apiUtils = require('../util/api-utils');

exports.getOrder = (req, res, next) => {

	logger.info("the decoded Jwt values is ");
	let userType = 'ADMIN';
	if(req.query.customerId){
		userType="CUSTOMER";
	}
		if(req.query.orderId){
			logger.info("Getting order by id "+req.query.orderId);
			orderServiceImpl.getByOrderId( userType, 0, req.query.orderId, function (err , result){
				if (err) {
					next(err);
				} 
				else{
				res.status(200).json(result);
				}
			});
		}
		else if( req.query.startDate || req.query.endDate){
			var startDate = apiUtils.getValidStartDate(req.query.startDate);
			var endDate = apiUtils.getValidEndDate(req.query.endDate);
			logger.info("Getting orders list by Date from "+startDate +" to "+endDate);
			orderServiceImpl.getByDate(userType, 0, startDate, endDate, function (err , result){
				if (err) {
					next(err);
				} 
				else{
				res.status(200).json(result);
				}
			});
		}
		else{
			logger.info("Getting All Orders....");
			orderServiceImpl.getAll(userType, req.query.customerId, function (err , result){
				if (err) {
					next(err);
				}
				else{
				res.status(200).json(result);
				}
			});
		}
};

exports.addOrder = (req, res, next) => {
	logger.info("Placing new Order..");
	validateOrder(req.body, next);
    orderServiceImpl.create(req.body, function (err , result){
		if (err) {
			next(err);
		}
		else{
		res.status(200).json(result);
		}
	});
};

exports.updateOrder = (req, res, next) => {
	logger.info("updateing existing Order..");
	validateOrder(req.body, next);
    orderServiceImpl.update(req.params.orderId, req.body, function (err , result){
		if (err) {
			next(err);
		}
		else{
		res.status(200).json(result);
		}
	});
};
