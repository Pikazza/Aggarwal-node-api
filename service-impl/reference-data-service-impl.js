const referenceDataRepository = require('../repository/reference-data-repository');
const referenceData =require('../models/reference-data').ReferenceData;
const ProductNotFoundError = require('../exceptions/menu-not-found-error');
const apiUtils = require('../util/api-utils');
const _ = require('lodash');

module.exports.getAll = (next) => {
		  referenceDataRepository.findAll(function(err, result) {
		  if (err) next(err);
		  next(null, result);
	}); 
};

module.exports.update = (refId, refReq, next) => {
console.log("coming to impl "+refId)
	referenceDataRepository.findRefById(refId, function(err, oneCustomer) {
		if (err){
			next(err);
		}
		if(!oneCustomer) {
			next(new ProductNotFoundError("No Refence items found for given id"+refId));
		}
		else if(refId != refReq.refId){
			next(new ProductNotFoundError("Refence id passed in URL "+refId+
			" is not same as Product id "+refReq.refId +" passed in body"));
		}
		else{
			console.log("Pikazza ref data update "+JSON.stringify(oneCustomer));

			let prod = new referenceData(oneCustomer);
				
			prod.dayDeals= refReq.dayDeals;

			if (refReq.homeTopSlider){
				if(slider._id){
					_.forEach(refReq.homeTopSlider, function(slider){
					console.log("id is there");
					prod.homeTopSlider.push(slider);					
				});

				}
				else{
						console.log("id is not there");
						if(slider.image){
						slider.image=apiUtils.uploadImage("refData_"+(Math.random() * (1000 - 10) + 10),slider.image);
						}
						prod.homeTopSlider.push(slider);
					}
			}

			/*if(refReq.itemImage){
				prod.itemImage=apiUtils.uploadImage("product_"+refId,refReq.itemImage);
			}*/
			referenceDataRepository.update(prod, function(err, result) {
				if(err) {
					next(err);
				}
				else
				{
					next(null, result);
				}
			});
		}

	});
}
