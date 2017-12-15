'use strict';
const ValidationError = require('../exceptions/validation-error');

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const unitType = ['KILOGRAM','GRAM','LITTER','MILLILITTER'];
const statusType = ['SHOW','HIDE'];

let productSchema = new Schema({
      itemId:{
      type: String,
      unique: true
    },
      itemName:String,
      itemDesc:String,
      itemImage:String,
      price:Number,
      offerPrice:Number,
      gst:Number,
      priceWithGST:Number,
      status:{type: String, enum: statusType},
      category1:String,
      category2:String,
      category3:String,
      category4:String,
      quantityInStock:Number,
      unit:Number,
      createdOn: {
          type: Date
          },
      modifiedOn: {
        type: Date, 
        default: Date.now
        },
      unitType:{type: String, enum: unitType},
    },{ collection: 'product' });

let product = mongoose.model("product", productSchema);

/*let validatefranchiseeMenu = function(reqFranchiseeMenu,next){
  let  validefranchiseeMenu = new franchiseeMenu(reqFranchiseeMenu);
  let validationErr = validefranchiseeMenu.validateSync();
  if (validationErr) {
    next(new ValidationError(validationErr));
  }
}*/

module.exports = {
    Product: product
};