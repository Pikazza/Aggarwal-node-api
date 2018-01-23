'use strict';
const ValidationError = require('../exceptions/validation-error');
const customer = require('./customer').Customer;

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const orderType = ['INITIALIZED','ACCEPTED', 'READY_TO_COLLECT','COMPLETED','CANCELED'];
const paymentType= ['INITIALIZED','SUCCESSFUL','PENDING','CANCELED'];
const serviceTypeEnum= ['TAKE_AWAY','PAYTM','CASH_ON_DELIVERY'];
const orderTypeEnum= ['CART','CAMERA'];
const unitType = ['KILOGRAM','GRAM','LITTER','MILLILITTER','METER','CENTIMETER','MILLIMETER','UNIT','OTHERS'];

let imagesScheme = new Schema({
  image:String,
  description:String,
});

let orderSchema = new Schema({
	orderId:{
	      type: Number,
	      unique: true
	    },
	    customerId:{ type: Number },
	    sellerId:{ type: Number },
	    //stripeToken:String,
	    //stripeFranchiseeId:String,
	    orderStatus:{type: String, enum: orderType},
	    paymentStatus: {type: String, enum: paymentType},
	    extraPreference:String,
	    orderedOn:Date,
	    totalAmountToBePaid:Number,
	    serviceType:{type: String, enum: serviceTypeEnum},
	    orderType:{type: String, enum: orderTypeEnum},
	    orderingCharge:{
	    	totalProductAmount:Number,
	    	deleveryCharge:Number,
	    	dixcountPercent:Number,
	    	discountedtotalAmount:Number
	    },
	    listOfItems:[{
	    	itemId:String,
		      itemName:String,
		      itemImage:String,
		      price:Number,
		      offerPrice:Number,
		      gst:Number,
		      priceWithGST:Number,
		      category1:String,
		      category2:String,
		      category3:String,
		      category4:String,
		      images:[imagesScheme],
		      count:Number,
		      unit:Number,
		      unitType:{type: String, enum: unitType}
	    }]
		},{ collection: 'order' , toJSON: { virtuals: true } });

orderSchema.virtual('customerDetails', {
  ref: 'customer',
  localField: 'customerId',
  foreignField: 'customerId',
  justOne: true
});
orderSchema.virtual('sellerDetails', {
  ref: 'seller',
  localField: 'sellerId',
  foreignField: 'sellerId',
  justOne: true
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