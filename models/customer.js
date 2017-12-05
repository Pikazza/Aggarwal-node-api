'use strict';
const crypto = require('crypto');
const ValidationError = require('../exceptions/validation-error');

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
 * @module party
 * @description contain the details of party information, conditions and actions.
 */
const partyStatus= ['ACTIVE','INACTIVE'];
const partyType= ['CUSTOMER','SUPPLIER','ADMIN'];
const roleType= ['USER','AGARWAL_ADMIN','SUPER_ADMIN'];

const validateEmail = function(authId) {
    let regx=/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regx.test(authId)
};


let customerSchema = new Schema({
    customerId:{
      type: Number,
      unique: true
    },
    status: {type: String, enum: partyStatus},
    profileImage: String,
    firstName: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 30
      },
    lastName: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 30
    },
    address: {
      addressLine1:String,
      addressLine2:String,
      addressLine3:String,
      town:String,
      state:String,
      postCode:String
    },
    emailId: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validateEmail, 'Please fill a valid email address']
    },
    createdOn: {
        type: Date
        },
    modifiedOn: {
      type: Date, 
      default: Date.now
      },
    authentication: {
      authMech:String,
  		authId:{
        type: String,
        trim: true,
        required: true,
        minlength: 10,
        maxlength: 12
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
}, { collection: 'customer' });



let customer = mongoose.model("customer", customerSchema);

var validateCustomer = function(reqCustomer,next){
  var  valideCustomer = new customer(reqCustomer);
  var validationErr = valideCustomer.validateSync();
  if (validationErr) {
    next(new ValidationError(validationErr));
  }
}

module.exports = {
    Customer: customer,
    ValidateCustomer :validateCustomer
};