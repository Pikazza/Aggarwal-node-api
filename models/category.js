'use strict';
const ValidationError = require('../exceptions/validation-error');

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const unitType = ['KILOGRAM','GRAM','LITTER','MILLILITTER'];
const statusType = ['SHOW','HIDE'];

let subCategoryList3 = new Schema({
      name:String,
      status:{type: String, enum: statusType},
      subCategoryList3:[{
      name:String,
      status:{type: String, enum: statusType}
    }]
    });

let subCategoryList2 = new Schema({
      name:String,
      status:{type: String, enum: statusType},
      subCategoryList2:[subCategoryList3] 
    });

let categoryList = new Schema({
      name:String,
      status:{type: String, enum: statusType},
      subCategoryList1:[subCategoryList2]
    });

let categorySchema = new Schema({
    categoryId:String,
    categories:[categoryList]
    },{ collection: 'category' });

let category = mongoose.model("category", categorySchema);

/*let validatefranchiseeMenu = function(reqFranchiseeMenu,next){
  let  validefranchiseeMenu = new franchiseeMenu(reqFranchiseeMenu);
  let validationErr = validefranchiseeMenu.validateSync();
  if (validationErr) {
    next(new ValidationError(validationErr));
  }
}*/

module.exports = {
    Category: category
};