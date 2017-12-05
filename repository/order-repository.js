'use strict';

const order = require('../models/order').Order;

module.exports.findAll = (userType, userId, next) => {
	let query ;
	if (userType =='ADMIN'){
		query={ };
	}
	else if(userType =='FRANCHISE'){
		query = {
			"franchiseeId":userId
		};
	}
	else{
		query = {
			"customerId":userId
		};
	}

    order.
    find(query).
	populate({path:'customerDetails', select:'customerId firstName lastName profileImage phoneNumber addresses'}).
    populate({path:'franchiseeDetails', select:'franchiseeId franchiseeName profileImage phoneNumber '}).
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
	else if(userType =='FRANCHISE'){
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
		select:'customerId firstName lastName profileImage phoneNumber addresses'})
    .populate({
    	path:'franchiseeDetails',
    	 select:'franchiseeId franchiseeName profileImage phoneNumber '})
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
	else if(userType =='FRANCHISE'){
		query={ '$and': [ { "orderedOn": { "$gte": startDate,"$lte": endDate } }, { "franchiseeId": userId } ] };
	}else{
		query={ '$and': [ { "orderedOn": { "$gte": startDate,"$lte": endDate } }, { "customerId": userId } ] };
	}

    order.
    find(query).
	populate({path:'customerDetails', select:'customerId firstName lastName profileImage phoneNumber addresses'}).
    populate({path:'franchiseeDetails', select:'franchiseeId franchiseeName profileImage phoneNumber '}).
    exec(function(err, result) {
		if (err) next(err);
		next(null, result);
	});
};

module.exports.create = (orderReq, next) => {
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