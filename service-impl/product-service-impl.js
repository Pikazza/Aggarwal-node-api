'use strict';

const _ = require('lodash');
const product = require('../models/product').Product;
const productRepository = require('../repository/product-repository'); 
const franchiseeScheduleRepository = require('../repository/franchisee-schedule-repository');  
const MenuNotFoundError = require('../exceptions/menu-not-found-error');
const ScheduleNotFoundError = require('../exceptions/schedule-not-found-error');
const SequenceImpl = require('../service-impl/sequence');

module.exports.findProductById = (productId, next) => {
	productRepository.findProductById(productId, function(err, result) {
		if (err){
			next(err);			
		}
		if(!result){
			next(new MenuNotFoundError("No Product items found for given id"));
		}
		else{
  			next(null, result);
		}	
	});		
};

module.exports.findAllProduct = (productId, next) => {
	productRepository.findAll( function(err, result) {
		if (err){
			next(err);			
		}
		if(!result){
			next(new MenuNotFoundError("No Product items found for given id"));
		}
		else{
  			next(null, result);
		}	
	});		
};


module.exports.create = (productReq, next) => { 

		SequenceImpl.getSequence("product", function(err, sequenceId){
			if (err){
				next(err);
			}
			else{
				var prod = new product(productReq);
				prod.itemId=sequenceId;
				productRepository.create(prod, function(err, result) {
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

module.exports.update = (productId, productReq, next) => {
console.log("coming to impl "+productId)
	productRepository.findProductById(productId, function(err, oneCustomer) {
		if (err){
			next(err);
		}
		if(!oneCustomer) {
			console.log(" no product was found");
		}
		else if(productId != productReq.itemId){
			/*next(new PartyNotFoundError("Customer id passed in URL "+customerId+
			" is not same as Customer id "+customerReq.customerId +" passed in body"));*/
		}
		else{
			let cust = new product(oneCustomer);
			cust.status=productReq.status;
			/*if(customerReq.profileImage){
			var path = apiUtils.uploadImage(cust.firstName+cust.customerId+"_cu_cover",customerReq.profileImage);
			cust.profileImage=path
			}*/
			productRepository.update(cust, function(err, result) {
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





