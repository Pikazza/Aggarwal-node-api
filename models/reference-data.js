const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let referenceDataSchema = new Schema({
	userType:[String],
    userStatus:[String],
    roleType:[String],
    addressType:[String],
    shopStatus:[String],
    menuType:[String],
    itemStatusType:[String],
    itemCategoryType:[String],
    orderType:[String],
    paymentStatusType:[String],
    serviceTyp:[String],
    categoryImages:
	    {
			BASE:String,
			TOPPING:String,
			SAUCE:String,
			SIDE:String,
			DRINK:String,
			COMBO:String
		}
    },{ collection: 'referenceData' });


let referenceData = mongoose.model("referenceData", referenceDataSchema);

module.exports = {
    ReferenceData: referenceData
};