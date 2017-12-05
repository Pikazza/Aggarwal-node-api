'use strict';
const ValidationError = require('../exceptions/validation-error');

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const unitType = ['KILOGRAM','GRAM','LITTER','MILLILITTER'];

let productSchema = new Schema({
      itemId:String,
      itemName:String,
      itemDesc:String,
      price:String,
      offerPrice:String,
      gst:String,
      priceWithGST:String,
      status:String,
      category1:String,
      category2:String,
      category3:String,
      category4:String,
      quantityInStock:String,
      unit:String,
      unitType:String,
      category4:String,
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