'use strict';

const jwtAuth = require('../config/basic-jwt-auth');
const seller = require('../models/seller').Seller;
const product = require('../models/product').Product;  
const sellerRepository = require('../repository/seller-repository');  
const apiUtils = require('../util/api-utils');  
const SequenceImpl = require('../service-impl/sequence');
const mailer = require('../util/mail-sender');
const PartyAlreadyExistError = require('../exceptions/party-already-exist-error');
const PartyNotFoundError = require('../exceptions/party-not-found-error');
const PasswordNotFound = require('../exceptions/password-not-match');
const OTPValidationError = require('../exceptions/otp-validation-error');
const referenceDataRepository = require('../repository/reference-data-repository');

module.exports.getAll = (req, res, next) => {
		  sellerRepository.findAll(function(err, result) {
		  if (err) next(err);
		  next(null, result);
	}); 
};

module.exports.getById = (sellerId, next) => {
	sellerRepository.findBySellerId(sellerId, function(err, result) {
		if (err){
			next(err);			
		}
		if(!result) {
		next(new PartyNotFoundError("There is no party found for given partyid "+sellerId));
		}
		else{
  			referenceDataRepository.findRegions(sellerId,function(err, result1) {
		  if (err) next(err);
		 // next(null, result);
		 console.log("Pikazza 000000 "+result1)
		 result.regionList=result1;
		 next(null, result);
	}); 
  			
  			
		}	
	});		
};

module.exports.create = (partyReq, next) => { 
	sellerRepository.findByAuthId(partyReq.authentication.authId, function(err, result) {
	if (err){
		next(err);
	}
	if(result){
		next(new PartyAlreadyExistError("The Email Address is Already Registered "+partyReq.authentication.authId));
	}else{
			SequenceImpl.getSequence("seller", function(err, sequenceId){
		  	if (err){
		  		next(err);
		  	}
		  	else{
		  		console.log("its coming ")
		  		var sell = new seller(partyReq);
		  		sell.sellerId=sequenceId;
		  		sell.createdOn= new Date();
		  		let mobileNo = partyReq.authentication.authId;
		  		let plainPass = partyReq.authentication.authToken;
		  		sell.authentication.authToken=plainPass;
				if(partyReq.profileImage){
				var	random=Math.floor(Math.random() * 200000);
				var path = apiUtils.uploadImage(partyReq.sellerName+"_fr_cover"+random,partyReq.profileImage);
				sell.profileImage=path
				}
				sellerRepository.create(sell, function(err, result) {
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
	});
}

module.exports.update = (sellerId, partyReq, next) => {

	sellerRepository.findBySellerId(sellerId, function(err, oneSeller) {
		  if (err){
		  	next(err);
		  }
		  if(!oneSeller) {
			next(new PartyNotFoundError("There is no Records found for Franchisee id "+sellerId));
		  }
		  else if(sellerId != partyReq.sellerId){
		  	next(new PartyNotFoundError("Seller id passed in URL "+sellerId+
				" is not same as Seller id "+partyReq.sellerId +" passed in body"));
		  }
		  else{
		  	let pty = new seller(oneSeller);
		  	pty.sellerType=partyReq.sellerType;
		  	pty.status=partyReq.status;
		  	pty.sellerName=partyReq.sellerName;
		  	pty.emailId=partyReq.emailId;
		  	pty.modifiedOn=new Date();
		  	if(partyReq.profileImage){
			var path = apiUtils.uploadImage(pty.sellerId+"_fr_cover_"+pty.franchiseeName,partyReq.profileImage);
			pty.profileImage=path
			}
		  	if(partyReq.authentication && partyReq.authentication.authToken){
				let plainPass = partyReq.authentication.authToken;
				pty.authentication.authToken = apiUtils.encyptAuthToken(plainPass);
			}

			if(partyReq.location){

				pty.location.lat= partyReq.location.lat;
				pty.location.long =partyReq.location.long;
			}

			sellerRepository.update(pty, function(err, resSeller) {
				if(err) {
					next(err);
				}
				else
				{
					/*let res = new FranchiseeRequest(franchiseeResponse);
					franchiseeScheduleRepository.getScheduleBysellerId(sellerId, function(err, ScheduleResponse){
		  			if (err){
			  			next(err);
			  		}else{
			  			if(partyReq.franchiseeSchedule && partyReq.franchiseeSchedule.length > 0){

							for (let i = 0; i < partyReq.franchiseeSchedule.length; i++){
								if(!partyReq.franchiseeSchedule[i]._id){
									ScheduleResponse.schedule.push(partyReq.franchiseeSchedule[i]);
								}else{
									if(partyReq.franchiseeSchedule[i].menuOverride)
									partyReq.franchiseeSchedule[i].menuOverride=ScheduleResponse.schedule.menuOverride;
									ScheduleResponse.schedule.id(partyReq.franchiseeSchedule[i]._id).remove();
									ScheduleResponse.schedule.push(partyReq.franchiseeSchedule[i]);
								}
							}
						}
		  				franchiseeScheduleRepository.update(ScheduleResponse, function(err, result){
		  					if (err){
			  					next(err);
					  		}else{
					  			res.franchiseeSchedule=ScheduleResponse.schedule;
			  					next(null, res);
					  		}
		  				});
			  		}
	  			});*/
	  			next(null, resSeller);
			}
			});

		  }

	});
}

module.exports.login = (authId, authToken, next) => {
	sellerRepository.findByAuthId(authId, function(err, result) {
		if(err) next(err, null);
		if(!result) {
			next(new PartyNotFoundError("There is no Records found for Franchisee id "+authId));
		} else if(! apiUtils.compareAuthToken(authToken,result.authentication.authToken)) {
			next(new PasswordNotFound("Given Password is Not Matched for "+authId));
		} else {
		let token= jwtAuth.getJwt(result.sellerId,result.authentication.authId,result.franchiseeName,result.firstName,
			result.lastName,result.franchiseType,result.authentication.role);
			next(null, {"party":result,"jwtToken":token});
		}
	});
}; 

module.exports.loginV20 = (loginRequest, next) => {
	sellerRepository.findByAuthId(loginRequest.authId, function(err, result) {
		if(err) next(err, null);
		if(!result) {
			next(new PartyNotFoundError("There is no Records found for Franchisee id "+loginRequest.authId));
		} else if( loginRequest.authToken != result.authentication.authToken ) {
			next(new PasswordNotFound("Given Password is Not Matched for "+loginRequest.authId));
		} else {
				//let pty= new franchisee(result);
				result.device.deviceType=loginRequest.deviceType;
				result.device.deviceToken=loginRequest.deviceToken;
				//let token= jwtAuth.getJwt(result.sellerId,result.authentication.authId,result.franchiseeName,result.firstName,
						//   result.lastName,result.franchiseType,result.authentication.role);
				sellerRepository.updateV20(result, function(err, updateResult) {
					next(null, result);
					});	
		}
	});
};

module.exports.forgotPassword = (authId, next) => {
	sellerRepository.findByAuthId(authId, function(err, result) {
		if(err){
			next(err, null);
		} 
		if(!result) {
			next(new PartyNotFoundError("There is no Records found for Franchisee id "+authId));
		}  else {
			let pty= new franchisee(result);
			let random = (Math.random()*1e16).toString(36);
			pty.authentication.tempToken=random;
			pty.authentication.tempTokenExpiredOn=new Date().addHours(48);
				sellerRepository.update(pty, function(err, result) {
				//mailer.MailSender(pty.authentication.authId,"",pty.authentication.tempToken,"FORGOT_PASSWORD");
				next(null, "true");
					});			
		}
	});
};


module.exports.verifyOtp = (authId, otp, next) => {

	sellerRepository.findByAuthId(authId, function(err, result) {
		if(err) {
			next(err, null);
		}
		if(!result) {
			next(new PartyNotFoundError("There is no Records found for Franchisee id "+authId));
		} 
		else if(result.authentication.tempToken != otp ){
			next(new OTPValidationError("given OTP is not matched"));
		}else if (result.authentication.tempTokenExpiredOn <= new Date() ){
			next(new OTPValidationError("given OTP is Expired on "+result.authentication.tempTokenExpiredOn));
		}
		else{
			let token= jwtAuth.getJwt(result.sellerId,result.authentication.authId,result.franchiseeName,result.firstName,
			result.lastName,result.franchiseType,result.authentication.role);
			next(null, {"status":"true","sellerId":result.sellerId,"jwtToken":token});
		}
	});

};

module.exports.discover = (startDate, endDate, next) => {
	sellerRepository.findOpenedFranchisees(startDate, endDate,function(err, result){
		if (err) {
			next(err);
		}
		else{
			next(null, result);	
		}
	});
};

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}