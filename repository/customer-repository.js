const customer = require('../models/customer').Customer;
const _ = require('lodash');
const productRepository = require('../repository/product-repository'); 

module.exports.findByCustomerId = (customerId, next) => {
	console.log("id trying to see is "+customerId)
	customer.findOne({"customerId":customerId}, function(err, result) {
		if (err) {
			next(err);
		}
		else{
		}
		next(null, result);
	});
};

module.exports.findByAuthId = (authId, next) => {
	customer.findOne({"authentication.authId":authId }, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.findByCustomerIdAndWishList =  (ptyId, next) => {

/*	product.aggregate([
   {
     "$lookup":
       {
         "from": "inventory",
         "localField": "item",
         "foreignField": "sku",
         "as": "inventory_docs"
       }
  }
])*/

};

module.exports.findAll = (next) => {
	customer.find({}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.create = (customerReq, next) => {
	customer.create(customerReq, function(err, result) {
		if (err)  next(err);
		next(null, result);
	});
};

module.exports.update1 = (customerReq, next) => {
	customer.update(customerReq, function(err, result) {
		if (err)  next(err);
		next(null, result);
	});
};

module.exports.update = (customerReq, next) => {
	customer.findOneAndUpdate({"customerId":customerReq.customerId},customerReq,function(err, result) {
		if (err) {
			next(err);
		}  
		else{
			next(null, customerReq);
		}
	});
}