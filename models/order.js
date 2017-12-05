'use strict';
const ValidationError = require('../exceptions/validation-error');
const franchisee = require('./franchisee').Franchisee;
const customer = require('./customer').Customer;

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const orderType = ['INITIALIZED','ACCEPTED', 'READY', 'READY_TO_COLLECT','COMPLETED','CANCELED'];
const categoryType = ['BASE','TOPPING','SAUCE','SIDE','DRINK','COMBO'];
const paymentType= ['INITIALIZED','SUCCESSFUL','PENDING'];
const serviceTypeEnum= ['TAKE_AWAY','DELIVERY'];

let orderSchema = new Schema({
	orderId:{
	      type: Number,
	      unique: true
	    },
	    customerId:{ type: Number },
	    franchiseeId:{ type: Number },
	    stripeToken:String,
	    stripeFranchiseeId:String,
	    orderStatus:{type: String, enum: orderType},
	    paymentStatus: {type: String, enum: paymentType},
	    extraPreference:String,
	    orderedOn:Date,
	    totalAmountToBePaid:Number,
	    serviceType:{type: String, enum: serviceTypeEnum},
	    orderingCharge:{
	    	vatAmount:Number,
	    	totalBookingAmount:Number,
	    	discountPercent:Number,
	    	discountedtotalAmount:Number
	    },
	    listOfItems:[{
	    	itemName:String,
	    	placeCount:Number,
	    	price:Number,
	    	offerPrice:Number,
	    	catogory:{type: String, enum: categoryType}
	    }]
		},{ collection: 'order' , toJSON: { virtuals: true } });

orderSchema.virtual('customerDetails', {
  ref: 'customer',
  localField: 'customerId',
  foreignField: 'customerId',
  justOne: false
});
orderSchema.virtual('franchiseeDetails', {
  ref: 'franchisee',
  localField: 'franchiseeId',
  foreignField: 'franchiseeId',
  justOne: false
});


let order = mongoose.model("order", orderSchema);


let validateOrder = function(reqOrder,next){
  let  valideOrder = new order(reqOrder);
  let validationErr = valideOrder.validateSync();
  if (validationErr) {
    next(new ValidationError(validationErr));
  }
}

module.exports = {
    Order: order ,
    ValidateOrder :validateOrder
};