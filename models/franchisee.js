'use strict';
const ValidationError = require('../exceptions/validation-error');

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
 * @module party
 * @description contain the details of party information, conditions and actions.
 */
const statusType= ['ACTIVE','INACTIVE'];
const franchiseType= ['FRANCHISE','ADMIN'];
const roleType= ['USER','FRANCHISE_ADMIN','HAOCHII_ADMIN'];
const shopStatus= ['OPEN','CLOSE']; 
const menuType = ['MENUTYPE_1','MENUTYPE_2','MENUTYPE_3'];
let validateEmail = function(authId) {
    //let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regx=/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regx.test(authId)
};

let franchiseeSchema = new Schema({
    franchiseeId:{
      type: Number,
      unique: true
    },
    status: {type: String, enum: statusType},
    franchiseType: {type: String, enum: franchiseType},
    menuType: {type: String, enum: menuType},
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
        lowercase: true,
        unique: true,
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
}, { collection: 'franchisee' });



let franchisee = mongoose.model("franchisee", franchiseeSchema);
//let popupShopScheduleSchema = mongoose.model("party", popupShopScheduleSchema);

let validateFranchisee = function(reqFranchisee,next){
  let  valideFranchisee = new franchisee(reqFranchisee);
  let validationErr = valideFranchisee.validateSync();
  if (validationErr) {
    next(new ValidationError(validationErr));
  }
}




module.exports = {
    Franchisee: franchisee ,
    ValidateFranchisee :validateFranchisee
};