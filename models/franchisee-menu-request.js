'use strict';
const ValidationError = require('../exceptions/validation-error');

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const menuType = ['MENUTYPE_1','MENUTYPE_2','MENUTYPE_3'];
const statusType = ['SOLD_OUT','RUNNING_LOW','PRICE_SURGE','AVAILABLE'];
const categoryType = ['BASE','TOPPING','SAUCE','SIDE','DRINK','COMBO'];

let refItem = new Schema({
			itemName:String,
			itemDesc:String,
      _id: String,
			offerPrice:String,
			status:{type: String, enum: statusType}
		});
let franchiseeMenuReqSchema = new Schema({
	franchiseeId:Number,
    menuType:{type: String, enum: menuType},
    menuItem:[refItem]
    },{ collection: 'franchiseeMenu' });

let franchiseeMenuReq = mongoose.model("franchiseeMenu", franchiseeMenuReqSchema);

let validatefranchiseeMenu = function(reqFranchiseeMenu, next){
  let  validefranchiseeMenu = new franchiseeMenuReq(reqFranchiseeMenu);
  let validationErr = validefranchiseeMenu.validateSync();
  if (validationErr) {
   throw new ValidationError(validationErr);
  }
}

module.exports = {
    FranchiseeMenuReq: franchiseeMenuReq,
    ValidatefranchiseeMenu: validatefranchiseeMenu
};  