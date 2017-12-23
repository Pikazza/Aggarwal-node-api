'use strict';
const crypto = require('crypto');
const ValidationError = require('../exceptions/validation-error');
const productSchema = require('./product').ProductSchema;

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
 * @module party
 * @description contain the details of party information, conditions and actions.
 */
const partyStatus= ['ACTIVE','INACTIVE'];
const partyType= ['CUSTOMER','SUPPLIER','ADMIN'];
const roleType= ['USER','AGARWAL_ADMIN','SUPER_ADMIN'];
const addressType= ['DELEVERY','BILLING']; 

let addressSchema = new Schema({
  addressType:{type: String, enum: addressType},
  addressLine1:String,
  addressLine2:String,
  addressLine3:String,
  town:String,
  state:String,
  postCode:String
});


const validateEmail = function(authId) {
    let regx=/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regx.test(authId)
};

let wishItem = new Schema({
    itemId:String,
    count:Number
})

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
    addresses: [addressSchema],
    emailId: {
      type: String,
      trim: true,
      lowercase: true
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
	},
  verified:Boolean,
  wishList:[wishItem]
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