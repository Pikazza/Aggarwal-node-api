'use strict';

const _ = require('lodash');
const category= require('../models/category').Category;
const categoryRepository = require('../repository/category-repository'); 
const franchiseeScheduleRepository = require('../repository/franchisee-schedule-repository');  
const MenuNotFoundError = require('../exceptions/menu-not-found-error');
const ScheduleNotFoundError = require('../exceptions/schedule-not-found-error');
const SequenceImpl = require('../service-impl/sequence');

module.exports.findById = (categoryId, next) => {
	categoryRepository.findProductById(categoryId, function(err, result) {
		if (err){
			next(err);			
		}
		if(!result){
			next(new MenuNotFoundError("No Category items found for given id"));
		}
		else{
  			next(null, result);
		}	
	});		
};

module.exports.findAll = ( next) => {
	categoryRepository.findAll( function(err, result) {
		if (err){
			next(err);			
		}
		if(!result){
			next(new MenuNotFoundError("No Category items found for given id"));
		}
		else{
  			next(null, result);
		}	
	});		
};


module.exports.create = (categoryReq, next) => { 

		SequenceImpl.getSequence("category", function(err, sequenceId){
			if (err){
				next(err);
			}
			else{
				var cat = new category(categoryReq);
				cat.categoryId=sequenceId;
				categoryRepository.create(cat, function(err, result) {
					if (err){
						next(err);
					} 
					else{
						next(null, result);
					}
					
				});
			}
		});
}

module.exports.update = (categoryId, productReq, next) => {
console.log("coming to impl "+categoryId)
	categoryRepository.findProductById(categoryId, function(err, oneCategory) {
		if (err){
			next(err);
		}
		if(!oneCategory) {
			console.log(" no product was found");
		}
		else if(categoryId != productReq.categoryId){
			console.log(" category id mismatch between body and request header");
			/*next(new PartyNotFoundError("Customer id passed in URL "+customerId+
			" is not same as Customer id "+customerReq.customerId +" passed in body"));*/
		}
		else{
			let cat = new category(oneCategory);
			let topCat=cat.categories;
			_.forEach(topCat, function(key,value) {
				
			});
			categoryRepository.update(cat, function(err, result) {
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





