'use strict';

const customerServiceImpl = require('../service-impl/customer-service-impl');
const jwtAuth = require('../config/basic-jwt-auth');
const logger = require('../config/logger');
const customer = require('../models/customer');
const customerRequest = require('../models/customer-request');
const validateLoginRequest = require('../models/login-request');


exports.get = (req, res, next) => {
	if(req.query.customerId){
		logger.info("Getting Customer by id "+req.query.customerId);
		customerServiceImpl.getById(req.query.customerId, function (err , result){
			if (err) {
				next(err);
			} 
			else{
			res.status(200).json(result);
			}
		});
	}
	else{
		logger.info("Getting All Customer....");
		customerServiceImpl.getAll(req,res, function (err , result){
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
	logger.info("Rigistering new customers..");
	//customerRequest.ValidateCustomerRequest(req.body, next);
    customerServiceImpl.create(req.body, function (err , result){
		if (err) {
			next(err);
		}
		else{
		res.status(200).json(result);
		}
	});
};

exports.update = (req, res, next) => {
	logger.info("Updating existing customers..");
	customer.ValidateCustomer(req.body, next);
    customerServiceImpl.update(req.params.customerId, req.body, function (err , result){
		if (err) next(err);
		res.status(200).json(result);
	});
};

exports.login = (req, res, next) => {
logger.info(" Customer Logging in V20" );
let verified =validateLoginRequest.ValidateLoginRequest(req.body, next);
	if(verified && req.body){
	        customerServiceImpl.login(req.body, function (err , result){
			if (err){
				next(err);
			}else{
			    res.status(200).json(result);
			}
		});
	}
}; 

exports.forgotPassword = (req, res, next) => {
	logger.info(req.body.authId +" Customer Forgotten his Password  ");
    customerServiceImpl.forgotPassword(req.body.authId, function (err , result){
		if (err){
			next(err) ;
		}else{
		res.status(200).json({"status":result});
		}
	});
}; 

exports.verifyOtp = (req, res, next) => {
	logger.info(req.query.authId +" Customer verifing his OTP with "+req.query.otpNo);
    customerServiceImpl.verifyOtp(req.query.authId, req.query.otpNo, function (err , result){
		if (err){
			next(err) ;
		}else{
		res.status(200).json(result);
		}
	});
};
