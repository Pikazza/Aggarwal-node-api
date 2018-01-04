const seller = require('../models/seller').Seller;

module.exports.findBysellerId = (sellerId, next) => {
	seller.findOne({"sellerId":sellerId}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.findAll = (next) => {
	seller.aggregate([
    {
        "$lookup": {
            "from": "sellerSchedule",
            "localField": "sellerId",
            "foreignField": "sellerId",
            "as": "sellerSchedule"
        }
    },
    {"$unwind": "$sellerSchedule"},
    {"$project": 
    	{
	    	"sellerId" : 1,
			"sellerName" : 1,
			"franchiseType":1,
			"profileImage":1,
			"phoneNumber":1,
			"menuType":1,
			"device":1,
			"authentication":1,
			"modifiedOn":1,
			"createdOn":1,
			"sellerSchedule":"$sellerSchedule.schedule"
		}
	}
 	]).exec(function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.findByAuthId = (authId, next) => {
	seller.findOne({"authentication.authId":authId }, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.create = (partyReq, next) => {
	seller.create(partyReq, function(err, result) {
		if (err)  next(err);
		next(null, result);
	});
};

module.exports.update = (partyReq, next) => {
	partyReq.save(function(err, result) {
			if (err)  next(err);
			next(null, result);
		});
};

module.exports.updateV20 = (partyReq, next) => {
	seller.findOneAndUpdate({"sellerId":partyReq.sellerId},partyReq,function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				next(null, result);
			}
		});
};

module.exports.findOpenedsellers = (startDate, endDate, next) =>{
	seller.aggregate([
    {
        "$lookup": {
            "from": "sellerSchedule",
            "localField": "sellerId",
            "foreignField": "sellerId",
            "as": "sellerSchedule"
        }
    },
    {"$unwind": "$sellerSchedule"},
    {"$unwind": "$sellerSchedule.schedule"},
    {
      "$match": { "$and": [
        {"sellerSchedule.schedule.tradingDate": { "$gt": startDate, "$lt": endDate }},
      	{ "sellerSchedule.schedule.shopStatus" : "OPEN" }
      ]
      }
   }
 	]).exec(function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};