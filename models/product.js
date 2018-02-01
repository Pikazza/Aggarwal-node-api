'use strict';
const ValidationError = require('../exceptions/validation-error');

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

//const unitType = ['KILOGRAM','GRAM','LITER','MILLILITER','METER','CENTIMETER','MILLIMETER','UNIT','OTHERS'];
const statusType = ['SHOW','HIDE'];

let stocksSchema = new Schema({
  price:Number,
  offerPrice:Number,
  quantityInStock:Number,
  unit:Number,
  unitType:{type: String}
});


let productSchema = new Schema({
      itemId:{
      type: String,
      unique: true
    },
      itemName:String,
      itemDesc:String,
      itemImage:String,
      status:{type: String, enum: statusType},
      category1:String,
      category2:String,
      category3:String,
      category4:String,
      validTill:Date,
      stocks:[stocksSchema],
      createdOn: {
          type: Date
          },
      modifiedOn: {
        type: Date, 
        default: Date.now
        }
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