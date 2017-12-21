const customer = require('../models/customer').Customer;
const _ = require('lodash');
const productRepository = require('../repository/product-repository'); 

module.exports.findByCustomerId = (customerId, next) => {
	console.log("id trying to see is "+customerId)
	let ss = [];
	customer.findOne({"customerId":customerId}, function(err, result) {
		if (err) {
			next(err);
		}
		else{
			/*if(result.wishList){
				console.log("wishlisdt item id"+JSON.stringify(result.wishList));
					_.each(result.wishList, function(wishOne){
						productRepository.findProductById(wishOne.itemId, function(err, productOne) {
							if (err){
								}
							else{
					  			wishOne.itemDetails=productOne;
					  			ss[0]=productOne;
							}
						});	
					});
			}*/
		}
		//result.wishList=ss;
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