'use strict';
const ValidationError = require('../exceptions/validation-error');

const mongoose = require('mongoose'), Schema = mongoose.Schema;
const shopStatus= ['OPEN','CLOSE'];

const scheduleSchema = new Schema({
	tradingDate:Date,
	shopStatus:{type: String, enum: shopStatus},
	orderThreshold:{
		minOrder:String,
		minDuration:String,
		midOrder:String,
		midDuration:String,
		maxOrder:String,
		maxDuration:String
	},
	location:{
		latitude:String,
		longitude:String
	},
	menuOverride:[
	[String]
	]
});


let franchiseeScheduleSchema = new Schema({
	franchiseeId:Number,
	schedule:[scheduleSchema]
} ,{ collection: 'franchiseeSchedule' });

let franchiseeSchedule = mongoose.model("franchiseeSchedule", franchiseeScheduleSchema);

let validateScheduleFranchisee = function(reqFranchiseeSchedule,next){
  let  valideFranchiseeSchedule = new franchisee(reqFranchiseeSchedule);
  let validationErr = valideFranchiseeSchedule.validateSync();
  if (validationErr) {
    next(new ValidationError(validationErr));
  }
}

/*let franchiseeScheduleReq = new franchiseeScheduleSchema({

});*/


module.exports = {
    FranchiseeSchedule: franchiseeSchedule ,
    //FranchiseeScheduleReq: franchiseeScheduleReq,
    ValidateScheduleFranchisee :validateScheduleFranchisee
};