'use strict';

const franchiseeServiceImpl = require('../service-impl/franchisee-service-impl');
const jwtAuth = require('../config/basic-jwt-auth');
const franchisee = require('../models/franchisee');
const auth = require('basic-auth');
const logger = require('../config/logger');
const validateFranchiseeRequest = require('../models/franchisee-request');
const validateLoginRequest = require('../models/login-request');
const apiUtils = require('../util/api-utils');

exports.get = (req, res, next) => {
	if(req.query.franchiseeId){
		logger.info("Getting franchisee by id "+req.query.franchiseeId);
		franchiseeServiceImpl.getById(req.query.franchiseeId, function (err , result){
			if (err) {
				next(err);
			} 
			else{
			res.status(200).json(result);
			}
		});
	}
	else{
		logger.info("Getting All franchisee....");
		franchiseeServiceImpl.getAll(req,res, function (err , result){
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
	logger.info("Rigistering new franchisee..");
	validateFranchiseeRequest.ValidateFranchiseeRequest(req.body, next);
    franchiseeServiceImpl.create(req.body, function (err , result){
		if (err) {
			next(err);
		}
		else{
		res.status(200).json(result);
		}
	});
};


exports.update = (req, res, next) => {
	logger.info("Updating existing franchisee..");
	franchisee.ValidateFranchisee(req.body, next);
    franchiseeServiceImpl.update(req.params.franchiseeId, req.body, function (err , result){
		if (err) next(err);
		res.status(200).json(result);
	});
};

exports.login = (req, res, next) => {
	let pty = auth(req);
	logger.info(pty.name+" Franchisee Logging in " );
	if (pty || pty.name  || pty.pass) {
        franchiseeServiceImpl.login(pty.name,pty.pass, function (err , result){
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
logger.info(" Franchisee Logging in V20" );
let verified =validateLoginRequest.ValidateLoginRequest(req.body, next);
	if(verified && req.body){
	        franchiseeServiceImpl.loginV20(req.body, function (err , result){
			if (err){
				next(err);
			}else{
			    res.status(200).json(result);
			}
		});
	}
}; 

exports.forgotPassword = (req, res, next) => {
	logger.info(req.body.authId +" Franchisee Forgotten his Password  ");
    franchiseeServiceImpl.forgotPassword(req.body.authId, function (err , result){
		if (err){
			next(err) ;
		}else{
		res.status(200).json({"status":result});
		}
	});
}; 

exports.verifyOtp = (req, res, next) => {
	logger.info(req.query.authId +" Franchisee verifing his OTP with "+req.query.otpNo);
    franchiseeServiceImpl.verifyOtp(req.query.authId, req.query.otpNo, function (err , result){
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
	franchiseeServiceImpl.discover(startDate, endDate, function (err , result){
		if (err){
			next(err) ;
		}else{
		res.status(200).json(result);
		}
	});
}