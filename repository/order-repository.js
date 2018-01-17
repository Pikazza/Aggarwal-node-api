'use strict';

const order = require('../models/order').Order;

module.exports.findAll = (userType, userId, next) => {
	let query ;
	if (userType =='ADMIN'){
		query={ };
	}
	else if(userType =='SELLER'){
		query = {
			"sellerId":userId
		};
	}
	else{
		query = {
			"customerId":userId
		};
	}

    order.
    find(query).
	populate({path:'customerDetails', select:'customerId firstName lastName profileImage emailId addresses authentication.authId'}).
    populate({path:'sellerDetails', select:'sellerId selerName profileImage emailId '}).
    exec(function(err, result) {
		if (err) next(err);
		next(null, result);
	});
};

module.exports.findByOrderId = (userType, userId, orderId, next) => {
	let query ;
	if (userType =='ADMIN'){
		query = {
			"orderId":orderId
		};
	}
	else if(userType =='SELLER'){
		query = {
			"franchiseeId":userId,
			"orderId":orderId
		};
	}else{
		query = {
			"customerId":userId,
			"orderId":orderId
		};
	}

    order
    .findOne(query)
	.populate({
		path:'customerDetails', 
		select:'customerId firstName lastName profileImage emailId addresses authentication.authId'})
    .populate({
    	path:'sellerDetails',
    	 select:'sellerId sellerName profileImage emailId authentication.authId'})
    .exec(function(err, result) {
		if (err) next(err);
		next(null, result);
	});
}; 

module.exports.findByDate = (userType, userId, startDate, endDate, next) => {

	let query ;
	if (userType =='ADMIN'){
		query={ 
			"orderedOn": { 
				"$gte": startDate,
				"$lte": endDate 
			} 
		};
	}
	else if(userType =='SELLER'){
		query={ '$and': [ { "orderedOn": { "$gte": startDate,"$lte": endDate } }, { "selerId": userId } ] };
	}else{
		query={ '$and': [ { "orderedOn": { "$gte": startDate,"$lte": endDate } }, { "customerId": userId } ] };
	}

    order.
    find(query).
	populate({path:'customerDetails', select:'customerId firstName lastName profileImage email addresses authentication.authId'}).
    populate({path:'sellerDetails', select:'sellerId sellerName profileImage email authentication.authId'}).
    exec(function(err, result) {
		if (err) next(err);
		next(null, result);
	});
};

module.exports.create = (orderReq, next) => {
	console.log("order repository "+ JSON.stringify(orderReq))
	order.create(orderReq, function(err, result) {
		if (err)  next(err);
		next(null, result);
	});
};

module.exports.update = (orderReq, next) => {
	orderReq.save(function(err, result) {
			if (err)  next(err);
			next(null, result);
		});
};

/*	order.aggregate([
    {
        "$lookup": {
            "from": "customer",
            "localField": "customerId",
            "foreignField": "customerId",
            "as": "customerDetails"
        }
    }
 	]).exec(function(err, result) {
		if (err) next(err);
		next(null, result);
	}); */