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

module.exports.update = (refReq, next) => {
//console.log("coming to impl "+refId)
	referenceDataRepository.findAll(function(err, oneCustomer) {
		if (err){
			next(err);
		}
		if(!oneCustomer) {
			next(new ProductNotFoundError("No Refence items found for given id"+refId));
		}
		else{
			console.log("Pikazza ref data update "+JSON.stringify(oneCustomer));

			let prod = new referenceData(oneCustomer);
			
			if(refReq.dayDeals)	{
				prod.dayDeals= refReq.dayDeals;
			}

			if (refReq.homeTopSlider){

				_.forEach(refReq.homeTopSlider, function(slider){
					if(slider._id && prod.homeTopSlider){
						_.map(prod.homeTopSlider, function(obj){
							  if(obj._id==slider._id) {//console.log("inside map and going to replace the calues");
							  	if(slider.image){
									obj.image=apiUtils.uploadImage("refData_"+(_.random(10000, 99)),slider.image);
								}
							      obj.status=slider.status;
							      obj.tags=slider.tags;
							      obj.name=slider.name;
							      obj.order=slider.order;
							  }
						});			
					}
					else{
						console.log("id is not there");
						if(slider.image){
						slider.image=apiUtils.uploadImage("refData_"+(_.random(10000, 99)),slider.image);
						}
						prod.homeTopSlider.push(slider);
					}									
				});
			}

			if (refReq.homebottomSlider){

				_.forEach(refReq.homebottomSlider, function(slider){
					if(slider._id && prod.homebottomSlider){
						_.map(prod.homebottomSlider, function(obj){
							  if(obj._id==slider._id) {//console.log("inside map and going to replace the calues");
							  	if(slider.image){
									obj.image=apiUtils.uploadImage("refData_"+(_.random(10000, 99)),slider.image);
								}
							     obj.status=slider.status;
							      obj.tags=slider.tags;
							      obj.name=slider.name;
							      obj.order=slider.order;
							  }
						});			
					}
					else{
						console.log("id is not there");
						if(slider.image){
						slider.image=apiUtils.uploadImage("refData_"+(_.random(10000, 99)),slider.image);
						}
						prod.homebottomSlider.push(slider);
					}									
				});
			}

			if (refReq.opticalsSlider){

				_.forEach(refReq.opticalsSlider, function(slider){
					if(slider._id && prod.opticalsSlider){
						_.map(prod.opticalsSlider, function(obj){
							  if(obj._id==slider._id) {//console.log("inside map and going to replace the calues");
							  	if(slider.image){
									obj.image=apiUtils.uploadImage("refData_"+(_.random(10000, 99)),slider.image);
								}
							     obj.status=slider.status;
							      obj.tags=slider.tags;
							      obj.name=slider.name;
							      obj.order=slider.order;
							  }
						});			
					}
					else{
						console.log("id is not there");
						if(slider.image){
						slider.image=apiUtils.uploadImage("refData_"+(_.random(10000, 99)),slider.image);
						}
						prod.opticalsSlider.push(slider);
					}									
				});
			}

			if (refReq.medicosSlider){

				_.forEach(refReq.medicosSlider, function(slider){
					if(slider._id && prod.medicosSlider){
						_.map(prod.medicosSlider, function(obj){
							  if(obj._id==slider._id) {//console.log("inside map and going to replace the calues");
							  	if(slider.image){
									obj.image=apiUtils.uploadImage("refData_"+(_.random(10000, 99)),slider.image);
								}
							     obj.status=slider.status;
							      obj.tags=slider.tags;
							      obj.name=slider.name;
							      obj.order=slider.order;
							  }
						});			
					}
					else{
						console.log("id is not there");
						if(slider.image){
						slider.image=apiUtils.uploadImage("refData_"+(_.random(10000, 99)),slider.image);
						}
						prod.medicosSlider.push(slider);
					}									
				});
			}
			
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
