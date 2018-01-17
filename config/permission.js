'use strict';
const AccessDeniedError = require('../exceptions/access-denied-error');

module.exports.rolesAllowedForJWT = (...allowed) => {

	function isAllowed(userRole){
		return allowed.findIndex(i => i == userRole) > -1;
	} 
  
	return (req, res, next) => {
		if (isAllowed(req.user.role))
			next();
		else {
			next(new AccessDeniedError("Access Denaid for current role with JWT token"));
		}		
	}
}

module.exports.rolesAllowedForBasic = (...allowed) => {

	function isAllowed(userRole){
		return allowed.findIndex(i => i == userRole) > -1;
	} 
  
	return (req, res, next) => {
		if (isAllowed("USER")){
		  	next(); 
		}
		else {
		  	next(new AccessDeniedError("Access Denaid for current role with Basic token"));
		}
	}
}

module.exports.rolesAllowedForAccAuth = (...allowed) => {

	function isAllowed(userRole){
		return allowed.findIndex(i => i == userRole) > -1;
	} 
  
	return (req, res, next) => {
		if (isAllowed(req.user.role)){
		  	next(); 
		}
		else {
		  	next(new AccessDeniedError("Access Denaid for current role with account authentication"));
		}
	}
}