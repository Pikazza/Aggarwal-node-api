'use strict';

const express = require('express');
const logger = require('../config/logger');
const CustomError = require('../exceptions/custom-error');
const UnauthorizedAccessError = require('../exceptions/unauthorized-access-error');
const PartyAlreadyExistError = require('../exceptions/party-already-exist-error');
const PartyNotFoundError = require('../exceptions/party-not-found-error');
const MenuNotFoundError = require('../exceptions/menu-not-found-error');
const ScheduleNotFoundError = require('../exceptions/schedule-not-found-error');
const PasswordNotFound = require('../exceptions/password-not-match');
const OrderNotFoundError = require('../exceptions/order-not-found-error');
const OTPValidationError = require('../exceptions/otp-validation-error');
const AccessDeniedError = require('../exceptions/access-denied-error');
const ValidationError = require('../exceptions/validation-error');
const Constants = require('../util/error-constants'); 


module.exports = (router) => {
    router.use(function(err, req, res, next) {
        let errorRes;
        logger.error(" exception on "+err.name+" because "+err.message);
        if (err instanceof UnauthorizedAccessError) {
            errorRes = {
                "code":Constants.UNAUTHORIZED_ACCESS_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            return res.status(401).json(errorRes); 
        }
        else if (err instanceof OrderNotFoundError) {
            errorRes = {
                "code":Constants.ORDER_NOT_FOUND_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            res.status(400).json(errorRes); 
        }
        else if (err instanceof ScheduleNotFoundError) {
            errorRes = {
                "code":Constants.SCHEDULE_NOT_FOUND_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            res.status(400).json(errorRes); 
        }
        else if (err instanceof MenuNotFoundError) {
            errorRes = {
                "code":Constants.MENU_NOT_FOUND_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            res.status(400).json(errorRes); 
        }
        else if (err instanceof AccessDeniedError) {
            errorRes = {
                "code":Constants.ACCESS_DENIED_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            res.status(401).json(errorRes); 
        }
        else if (err instanceof OTPValidationError) {
            errorRes = {
                "code":Constants.OTP_VALIDATION_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            res.status(400).json(errorRes); 
        }
        else if (err instanceof ValidationError) {
            errorRes = {
                "code":Constants.VALIDATION_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            res.status(400).json(errorRes); 
        }
        else if (err instanceof PartyAlreadyExistError) {
            errorRes = {
                "code":Constants.PARTY_ALREADY_EXIST_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            res.status(400).json(errorRes); 
        }
        else if (err instanceof PartyNotFoundError) {
            errorRes = {
                "code":Constants.PARTY_NOT_FOUND_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            res.status(400).json(errorRes); 
        }
        else if (err instanceof PasswordNotFound) {
            errorRes = {
                "code":Constants.PASSWORD_NOT_MATCHED_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            res.status(400).json(errorRes); 
        }
        else{
            errorRes = {
                "code":Constants.UNKNOWN_ERRORCODE,
                "name":err.name,
                "message":err.message
            }
            res.status(500).json(errorRes);
        }
    });
}

