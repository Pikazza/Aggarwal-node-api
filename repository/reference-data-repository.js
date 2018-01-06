'use strict';

const referenceData =require('../models/reference-data').ReferenceData;

module.exports.findAll = (next) => {
	console.log("coming to ref date repo");
	// referenceData.find({}, function(err, result) {
	// 	console.log("coming to ref date repo "+JSON.stringify(result));
	// 	if (err) next(err);
	// 	next(null, result);
	// }); 
		referenceData.findOne({}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};

module.exports.findRefById =  (refId, next) => {
		console.log("coming to ref date repo  " +refId);
	referenceData.findOne({"refId":refId}, function(err, result) {
		if (err){
			 next(err);
		}
		next(null, result);
	}); 
};

module.exports.findRegions =  ( refId, next) => {
		//console.log("coming to ref date repo  " +refId);

	referenceData.aggregate([
   // { "$unwind": "$regionList" },
    //{ "$match": { "regionList.sellerId": refId} },
    {
      "$project": {
         "regionList": {
            "$filter": {
               "input": "$regionList",
               "as": "region",
               "cond": { "$eq": [ "$$region.sellerId", refId ] }
            }
         }
      }
   }
    //{ "$group": { "_id": "$regionList.sellerId" } }
]).exec(function(err, result) {
		if (err) next(err);
		console.log("Pikazza regions repo "+JSON.stringify(result));
		next(null, result);
	}); 

	/*referenceData.find({"refId":refId}, function(err, result) {
		if (err){
			 next(err);
		}
		next(null, result);
	});*/ 
};

module.exports.update = function (productReq, next) {
		referenceData.findOneAndUpdate({"_id":productReq._id},productReq,{new: true},function(err, result) {
			if (err) {
				next(err);
			}  
			else{
				next(null, result);
			}
		});
};


module.exports.findSellerIdFromRegion =  ( name, next) => {
		//console.log("coming to ref date repo  " +refId);
	referenceData.find( {"regionList.name": name},'regionList', function(err, result) {
		if (err){
			 next(err);
		}
		next(null, result);
	});
};


