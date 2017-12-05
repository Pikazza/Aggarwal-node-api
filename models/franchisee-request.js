'use strict';
const crypto = require('crypto');
const ValidationError = require('../exceptions/validation-error');

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
 * @module party
 * @description contain the details of party information, conditions and actions.
 */
const addressType= ['DELEVERY','BILLING']; 
const partyStatus= ['ACTIVE','INACTIVE'];
const partyType= ['CUSTOMER','FRANCHISE','ADMIN'];
const roleType= ['USER','FRANCHISE_ADMIN','HAOCHII_ADMIN'];
const shopStatus= ['OPEN','CLOSE'];
const menuType= ['MENUTYPE_1','MENUTYPE_2','MENUTYPE_3'];
const validateEmail = function(authId) {
    //let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regx=/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regx.test(authId)
};
let arrayFieldsCannotBeBlankValidation = function(arrayOfSchedule) {
    console.log("Pikazza array validation size "+ arrayOfSchedule.length);
    return arrayOfSchedule.length >0;
};

let FranchiseeScheduleSchema = new Schema({
	tradingDate:Date,
	shopStatus:{type: String, enum: shopStatus},
	location:{
		latitude:String,
		longitude:String
	},
  menuOverride:[
  [String]
  ]
});

let franchiseeRequestSchema = new Schema({
    franchiseeId:Number,
    franchiseType: {type: String, enum: partyType},
    status: {type: String, enum: partyStatus},
    menuType:{type: String, enum: menuType},
    profileImage: String, 
    franchiseeName: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 30
      },
    franchisorName: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 30
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
      minlength: 10,
      maxlength: 12
  },
    createdOn: {
        type: Date
        },
    modifiedOn: {
      type: Date, 
      default: Date.now
      },
    franchiseeSchedule: {
    type : [FranchiseeScheduleSchema],
    validate:[arrayFieldsCannotBeBlankValidation ,'franchiisee schedule should not be empty']
  },orderThreshold:{
    minOrder:String,
    minDuration:String,
    midOrder:String,
    midDuration:String,
    maxOrder:String,
    maxDuration:String
  },
    authentication: {
      authMech:String,
  		authId:{
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address']
        },
  		authToken:String,
  		role:{
        type: String,
         enum: roleType
        },
  		tempToken:String,
  		tempTokenExpiredOn:{
        type: Date
      }
  	},
    device: {
    	deviceId:String,
		deviceType:String,
		deviceToken:String
	}
});



let franchiseeRequest = mongoose.model("franchiseeRequest", franchiseeRequestSchema);

let validateFranchiseeRequest = function(reqFranchisee,next){
  let  valideFranchiseeRequest = new franchiseeRequest(reqFranchisee);
  //let validationErr =
  valideFranchiseeRequest.validate( function(err){
      if (err) {
        next(new ValidationError(err));
      }
      console.log("validation - error"+ err);
});
};





module.exports = {
    FranchiseeRequest: franchiseeRequest ,
    ValidateFranchiseeRequest :validateFranchiseeRequest
};

