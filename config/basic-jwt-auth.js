'use strict';

const jwt = require('jsonwebtoken');
const path = require("path");
const auth = require('basic-auth');
const logger = require('../config/logger');
const CustomError = require('../exceptions/custom-error');
const UnauthorizedAccessError = require('../exceptions/unauthorized-access-error');
const Props = require('../util/api-properties');
const sellerRepository = require('../repository/seller-repository');  
const apiUtils = require('../util/api-utils');  

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


module.exports.verifyWithAccAuth = (req, res, next) => {
    logger.info("Account verification starts..");
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

             if (!credentials || credentials.name || credentials.pass) {
                console.log("name:"+credentials.name)
                console.log("name:"+credentials.pass)
                sellerRepository.findByAuthId(credentials.name, function(err, result) {
                    if (err){
                        next(err);          
                    }
                    if(!result) {
                    next(new UnauthorizedAccessError("There is no party found for given partyid "+ credentials.name));
                    }
                    else{
                        console.log("DB checking started "+result.authentication.authToken)
                        console.log("DB checking started "+apiUtils.encyptAuthToken(credentials.pass))
                        if ( credentials.pass != result.authentication.authToken ) {
                            next(new UnauthorizedAccessError("Basic authorization is failed"));
                        } 
                        else {
                            console.log("role "+result.authentication.role)
                            console.log("type "+result.sellerType)

                       /*     if("USER"===result.authentication.role && "SELLER" !== result.sellerType){
                                console.log("customer accessing it")
                                req.user={"role":result.authentication.role,
                                        "type":"CUSTOMER",
                                        "id":result.customerId
                                        };
                                       
                            }else */ if("USER"===result.authentication.role && "SELLER" === result.sellerType){
                                 console.log("seller accessing it")
                                req.user={"role":result.authentication.role,
                                        "type":result.sellerType,
                                        "id":result.sellerId
                                        };
                                       
                            }else if("SUPER_ADMIN"===result.authentication.role && "ADMIN" === result.sellerType){
                                 console.log("super admin accessing it")
                                req.user={"role":result.authentication.role,
                                            "type":result.sellerType,
                                            "id":result.sellerId
                                            };
                                           
                            }
                            }
                           // console.log("current user role is"+JSON.stringify(req.user));
                            next(null, true);
                        }
                      //  next(null, result);

                   // }   
                });
            }

        }else{
            next(new UnauthorizedAccessError("authorization header is invalid"));
        }
    }

};