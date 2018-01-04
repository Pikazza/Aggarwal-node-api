'use strict';

const sellerServiceImpl = require('../service-impl/seller-service-impl');
const jwtAuth = require('../config/basic-jwt-auth');
const seller = require('../models/seller');
const auth = require('basic-auth');
const logger = require('../config/logger');
const validatesellerRequest = require('../models/seller-request');
const validateLoginRequest = require('../models/login-request');
const apiUtils = require('../util/api-utils');

exports.get = (req, res, next) => {
	if(req.query.sellerId){
		logger.info("Getting seller by id "+req.query.sellerId);
		sellerServiceImpl.getById(req.query.sellerId, function (err , result){
			if (err) {
				next(err);
			} 
			else{
			res.status(200).json(result);
			}
		});
	}
	else{
		logger.info("Getting All seller....");
		sellerServiceImpl.getAll(req,res, function (err , result){
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
	logger.info("Rigistering new seller..");
	//validatesellerRequest.ValidatesellerRequest(req.body, next);
    sellerServiceImpl.create(req.body, function (err , result){
		if (err) {
			next(err);
		}
		else{
		res.status(200).json(result);
		}
	});
};


exports.update = (req, res, next) => {
	logger.info("Updating existing seller..");
	seller.Validateseller(req.body, next);
    sellerServiceImpl.update(req.params.sellerId, req.body, function (err , result){
		if (err) next(err);
		res.status(200).json(result);
	});
};

exports.login = (req, res, next) => {
	let pty = auth(req);
	logger.info(pty.name+" seller Logging in " );
	if (pty || pty.name  || pty.pass) {
        sellerServiceImpl.login(pty.name,pty.pass, function (err , result){
		if (err){
			next(err) ;
		}else{
		res.status(200).json(result);
		}
	});
    } else {
    	next(new UnauthorizedAccessError("Username and Password is not matched"));
    }
}; 

exports.loginV20 = (req, res, next) => {
logger.info(" seller Logging in V20" );
let verified =validateLoginRequest.ValidateLoginRequest(req.body, next);
	if(verified && req.body){
	        sellerServiceImpl.loginV20(req.body, function (err , result){
			if (err){
				next(err);
			}else{
			    res.status(200).json(result);
			}
		});
	}
}; 

exports.forgotPassword = (req, res, next) => {
	logger.info(req.body.authId +" seller Forgotten his Password  ");
    sellerServiceImpl.forgotPassword(req.body.authId, function (err , result){
		if (err){
			next(err) ;
		}else{
		res.status(200).json({"status":result});
		}
	});
}; 

exports.verifyOtp = (req, res, next) => {
	logger.info(req.query.authId +" seller verifing his OTP with "+req.query.otpNo);
    sellerServiceImpl.verifyOtp(req.query.authId, req.query.otpNo, function (err , result){
		if (err){
			next(err) ;
		}else{
		res.status(200).json(result);
		}
	});
};

exports.discover = (req, res, next) => {
	var startDate = apiUtils.getValidStartDate(req.query.onDate);
	var endDate = apiUtils.getValidEndDate(req.query.onDate);
	console.log(startDate);
	console.log(endDate);
	sellerServiceImpl.discover(startDate, endDate, function (err , result){
		if (err){
			next(err) ;
		}else{
		res.status(200).json(result);
		}
	});
}