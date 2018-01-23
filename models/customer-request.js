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
const partyType= ['CUSTOMER','FRANCHISE','ADMIN'];
const roleType= ['USER','FRANCHISE_ADMIN','HAOCHII_ADMIN'];
const shopStatus= ['OPEN','CLOSE'];
const validateEmail = function(authId) {
    let regx=/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regx.test(authId)
};

let customerSchema = new Schema({
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
    emailId: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validateEmail, 'Please fill a valid email address']
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
  		authToken:{
        type: String,
        trim: true,
        required: true,
        minlength: 10,
        maxlength: 12
      }
  	},
    device: {
		deviceType:String,
		deviceToken:String
	}
}, { collection: 'customerRequest' });



let customerRequest = mongoose.model("customerRequest", customerSchema);

var validateCustomerRequest = function(reqCustomer,next){
  var  valideCustomerRequest = new customerRequest(reqCustomer);
  var validationErr = valideCustomerRequest.validateSync();
  if (validationErr) {
    return next(new ValidationError(validationErr));
  }
}



module.exports = {
    CustomerRequest: customerRequest,
    ValidateCustomerRequest: validateCustomerRequest
};