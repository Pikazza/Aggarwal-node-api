'use strict';
const ValidationError = require('../exceptions/validation-error');

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
 * @module party
 * @description contain the details of party information, conditions and actions.
 */
const statusType= ['ACTIVE','INACTIVE'];
const sellerType= ['SELLER','ADMIN'];
const roleType= ['USER','ADMIN','SUPER_ADMIN'];
let validateEmail = function(authId) {
    //let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regx=/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regx.test(authId)
};

let sellerSchema = new Schema({
    sellerId:{
      type: Number,
      unique: true
    },
    status: {type: String, enum: statusType},
    sellerType: {type: String, enum: sellerType},
    profileImage: String,
    sellerName: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 30
    },
    sellerName: {
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
    orderThreshold:{
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
	},
  regionList:String,
  location:{
    lat:String,
    long:String
  }
}, { collection: 'seller' });



let seller = mongoose.model("seller", sellerSchema);
//let popupShopScheduleSchema = mongoose.model("party", popupShopScheduleSchema);

/*let validateFranchisee = function(reqFranchisee,next){
  let  valideFranchisee = new franchisee(reqFranchisee);
  let validationErr = valideFranchisee.validateSync();
  if (validationErr) {
    next(new ValidationError(validationErr));
  }
}*/


module.exports = {
    Seller: seller 
};