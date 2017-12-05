const franchisee = require('../models/franchisee').Franchisee;

module.exports.findByFranchiseeId = (franchiseeId, next) => {
	franchisee.findOne({"franchiseeId":franchiseeId}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.findAll = (next) => {
	franchisee.aggregate([
    {
        "$lookup": {
            "from": "franchiseeSchedule",
            "localField": "franchiseeId",
            "foreignField": "franchiseeId",
            "as": "franchiseeSchedule"
        }
    },
    {"$unwind": "$franchiseeSchedule"},
    {"$project": 
    	{
	    	"franchiseeId" : 1,
			"franchiseeName" : 1,
			"franchiseType":1,
			"profileImage":1,
			"phoneNumber":1,
			"menuType":1,
			"device":1,
			"authentication":1,
			"modifiedOn":1,
			"createdOn":1,
			"franchiseeSchedule":"$franchiseeSchedule.schedule"
		}
	}
 	]).exec(function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.findByAuthId = (authId, next) => {
	franchisee.findOne({"authentication.authId":authId }, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.create = (partyReq, next) => {
	franchisee.create(partyReq, function(err, result) {
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
	franchisee.findOneAndUpdate({"franchiseeId":partyReq.franchiseeId},partyReq,function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				next(null, result);
			}
		});
};

module.exports.findOpenedFranchisees = (startDate, endDate, next) =>{
	franchisee.aggregate([
    {
        "$lookup": {
            "from": "franchiseeSchedule",
            "localField": "franchiseeId",
            "foreignField": "franchiseeId",
            "as": "franchiseeSchedule"
        }
    },
    {"$unwind": "$franchiseeSchedule"},
    {"$unwind": "$franchiseeSchedule.schedule"},
    {
      "$match": { "$and": [
        {"franchiseeSchedule.schedule.tradingDate": { "$gt": startDate, "$lt": endDate }},
      	{ "franchiseeSchedule.schedule.shopStatus" : "OPEN" }
      ]
      }
   }
 	]).exec(function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};
