'use strict';

const _ = require('lodash');
const apiUtils = require('../util/api-utils');  
const customerRepository = require('../repository/customer-repository'); 
const customer = require('../models/customer').Customer;
const jwtAuth = require('../config/basic-jwt-auth');
const mailer = require('../util/mail-sender');
const PartyAlreadyExistError = require('../exceptions/party-already-exist-error');
const PartyNotFoundError = require('../exceptions/party-not-found-error');
const PasswordNotFound = require('../exceptions/password-not-match');
const SequenceImpl = require('../service-impl/sequence');
const OTPValidationError = require('../exceptions/otp-validation-error');

module.exports.getAll = (req, res, next) => {
		  customerRepository.findAll(function(err, result) {
		  if (err) next(err);
		  next(null, result);
	}); 
};

module.exports.getById = (customerId, next) => {
	customerRepository.findByCustomerId(customerId, function(err, result) {
		if (err){
			next(err);			
		}
		if(!result) {
		next(new PartyNotFoundError("There is no party found for given partyid "+franchiseeId));
		}
		else{
			next(null, result);
		}	
	});		
};


module.exports.create = (customerReq, next) => { 
	customerRepository.findByAuthId(customerReq.authentication.authId, function(err, result) {
	if (err){
		next(err);
	}
	if(result){
		next(new PartyAlreadyExistError("The Email Address is Already Registered "+customerReq.authentication.authId));
	}
	else{
		SequenceImpl.getSequence("customer", function(err, sequenceId){
			if (err){
				next(err);
			}
			else{
				var cust = new customer(customerReq);
				let emailId = customerReq.authentication.authId;
				let plainPass = customerReq.authentication.authToken;
				cust.status='ACTIVE';
				cust.customerId=sequenceId;
				cust.createdOn= new Date();
				cust.updatedOn= new Date();
				cust.authentication.authToken=apiUtils.encyptAuthToken(plainPass);
				cust.authentication.role='USER';
				cust.addresses=[];
				customerRepository.create(cust, function(err, result) {
					if (err){
						next(err);
					} 
					else{
						mailer.MailSender(emailId,plainPass,"","REG_CUSTOMER");
						next(null, result);
					}
					
				});
			}
		});
		}
	});
}


module.exports.update = (customerId, customerReq, next) => {

	customerRepository.findByCustomerId(customerId, function(err, oneCustomer) {
		if (err){
			next(err);
		}
		if(!oneCustomer) {
			next(new PartyNotFoundError("There is no Records found for Customer id "+customerId));
		}
		else if(customerId != customerReq.customerId){
			next(new PartyNotFoundError("Customer id passed in URL "+customerId+
			" is not same as Customer id "+customerReq.customerId +" passed in body"));
		}
		else{
			let cust = new customer(oneCustomer);
			cust.status=customerReq.status;
			cust.phoneNumber=customerReq.phoneNumber;
			cust.firstName=customerReq.firstName;
			cust.lastName=customerReq.lastName;
			cust.modifiedOn=new Date();
			if(customerReq.profileImage){
			var path = apiUtils.uploadImage(cust.firstName+cust.customerId+"_cu_cover",customerReq.profileImage);
			cust.profileImage=path
			}
			if(customerReq.authentication.authToken){
				let plainPass = customerReq.authentication.authToken;
				cust.authentication.authToken = apiUtils.encyptAuthToken(plainPass);
			}
			if(customerReq.addresses){

				let address;
				_.each(customerReq.addresses, function(reqAddress,i){
				if(cust.addresses.length > 0 ){ 
				address = _.some(cust.addresses, [ 'addressType', reqAddress.addressType ]);
				}

				if(address){
					_.each(cust.addresses, function(resAddress,i){
						if(resAddress.addressType == reqAddress.addressType){
							resAddress.addressLine1= reqAddress.addressLine1;
							resAddress.addressLine2= reqAddress.addressLine2;
							resAddress.addressLine3= reqAddress.addressLine3;
							resAddress.town= reqAddress.town;
							resAddress.county= reqAddress.county;
							resAddress.postCode= reqAddress.postCode;
						}
					});
				}
				else{
				cust.addresses.push(reqAddress);
				}

				});
			}
			customerRepository.update(cust, function(err, result) {
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


module.exports.login = (loginRequest, next) => {
	customerRepository.findByAuthId(loginRequest.authId, function(err, result) {
		if(err) next(err, null);
		if(!result) {
			next(new PartyNotFoundError("There is no Records found for Franchisee id "+loginRequest.authId));
		} else if(! apiUtils.compareAuthToken(loginRequest.authToken,result.authentication.authToken)) {
			next(new PasswordNotFound("Given Password is Not Matched for "+loginRequest.authId));
		} else {
				result.device.deviceType=loginRequest.deviceType;
				result.device.deviceToken=loginRequest.deviceToken;
				let token= jwtAuth.getJwt(result.customerId,result.authentication.authId,result.franchiseeName,result.firstName,
						   result.lastName,"CUSTOMER",result.authentication.role);
				customerRepository.update(result, function(err, updateResult) {
					next(null, {"customer":result,"jwtToken":token});
					});	
		}
	});
};

module.exports.forgotPassword = (authId, next) => {
	customerRepository.findByAuthId(authId, function(err, oneCustomer) {
		if(err){
			next(err, null);
		} 
		if(!oneCustomer) {
			next(new PartyNotFoundError("There is no Records found for Franchisee id "+authId));
		}  else {
			let random = (Math.random()*1e16).toString(36);
			oneCustomer.authentication.tempToken=random;
			oneCustomer.authentication.tempTokenExpiredOn=new Date().addHours(48);
				customerRepository.update(oneCustomer, function(err, result) {
				mailer.MailSender(oneCustomer.authentication.authId,"",oneCustomer.authentication.tempToken,"FORGOT_PASSWORD");
				next(null, "true");
					});			
		}
	});
};

module.exports.verifyOtp = (authId, otp, next) => {
	customerRepository.findByAuthId(authId, function(err, result) {
		if(err) {
			next(err, null);
		}
		if(!result) {
			next(new PartyNotFoundError("There is no Records found for Customer id "+authId));
		} 
		else if(result.authentication.tempToken != otp ){
			next(new OTPValidationError("given OTP is not matched"));
		}else if (result.authentication.tempTokenExpiredOn <= new Date() ){
			next(new OTPValidationError("given OTP is Expired on "+result.authentication.tempTokenExpiredOn));
		}
		else{
			let token= jwtAuth.getJwt(result.customerId,result.authentication.authId,result.franchiseeName,result.firstName,
						   result.lastName,"CUSTOMER",result.authentication.role);
			next(null, {"status":"true","customerId":result.customerId,"jwtToken":token});
		}
	});

};