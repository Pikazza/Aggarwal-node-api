'use strict';

const jwt = require('jsonwebtoken');
const path = require("path");
const auth = require('basic-auth');
const logger = require('../config/logger');
const CustomError = require('../exceptions/custom-error');
const UnauthorizedAccessError = require('../exceptions/unauthorized-access-error');
const Props = require('../util/api-properties');

module.exports.getJwt = (ptyId,authId,ptyName,fName,lName,ptyType,role) => {
		let jwtUserDate = {
            userId: ptyId,
            authId : authId,
            userName:ptyName,
		    firstName:fName ,
		    lastName:lName,
		    userType:ptyType,
		    role:role
	};
	logger.info(jwtUserDate);
	return jwt.sign(jwtUserDate, Props.jwtSecret.key,{ expiresIn: 60 * 60 });
}

module.exports.fetch = (headers) => {
    if (headers && headers.authorization) {
        let authorization = headers.authorization;
        logger.info("the JWT Token is "+authorization);
        let part = authorization.split(' ');
        if (part.length === 2) {
            return part;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

module.exports.validate = (req, res, next) => {
    logger.info("JWT validation starts..");
    let token = exports.fetch(req.headers);
    logger.info("the given token is "+token);
    if (token){
        jwt.verify(token, Props.jwtSecret.key , function (err, decoded ) {
            if (err instanceof Object){
                next(err,null);
            }
            else{
                next(null,decoded);
            }
        });
}
};


module.exports.verifyWithJwt = (req, res, next) => {
    logger.info("JWT verification starts..");
    if (!(req.headers.authorization)){
         next(new UnauthorizedAccessError("authorization header is empty"));
    }
    else{
        let token = exports.fetch(req.headers,next);
        if(!(token)){
            next(new UnauthorizedAccessError("Please Enter Proper Authentication Token"));
        }
        else if (token[0] == 'Bearer' && token[1]){
            jwt.verify(token[1], Props.jwtSecret.key , function (err, decoded ) {
                if (err instanceof Object){
                    next(new UnauthorizedAccessError(err));
                }
                else{
                    req.user=decoded;
                    logger.info("Details of JWT is "+ JSON.stringify(decoded));
                    next(null,decoded);
                }
            });
        }
        else{
            next(new UnauthorizedAccessError("authorization header is invalid"));
        }
    }

};

module.exports.verifyWithBasicAuth = (req, res, next) => {
    logger.info("JWT verification starts..");
    if (!(req.headers.authorization)){
         next(new UnauthorizedAccessError("authorization header is empty"));
    }
    else{
        let token = exports.fetch(req.headers,next);
        if(!(token)){
            next(new UnauthorizedAccessError("Please Enter Proper Basic Authorization Token"));
        }
        else if(token[0] == 'Basic' && token[1])  {
            let credentials = auth(req);
            if (!credentials || credentials.name != Props.basicAuth.userName || credentials.pass != Props.basicAuth.passWord) {
                next(new UnauthorizedAccessError("Basic authorization is failed"));
            } else {
                next(null, true);
            }
        }else{
            next(new UnauthorizedAccessError("authorization header is invalid"));
        }
    }

};


