'use strict';

const _ = require('lodash');

const product = require('../models/product').Product;
const productRepository = require('../repository/product-repository'); 

const SequenceImpl = require('../service-impl/sequence');
const apiUtils = require('../util/api-utils');
const sellerServiceImpl = require('../service-impl/seller-service-impl');
const ProductNotFoundError = require('../exceptions/menu-not-found-error');

module.exports.findProductById = (productId, next) => {
	productRepository.findProductById(productId, function(err, result) {
		if (err){
			next(err);			
		}
		if(!result){
			next(new ProductNotFoundError("No Product items found for given id"+productId));
		}
		else{
  			next(null, result);
		}	
	});		
};

module.exports.search = (productId, next) => {
	productRepository.search(productId, function(err, result) {
		if (err){
			next(err);			
		}
		else{
  			next(null, result);
		}	
	});		
};

module.exports.findProductByCategory = (catOne,catTwo, next) => {
		console.log("From impl class "+catOne + catTwo);
	productRepository.findProductByCategory( catOne,catTwo ,function(err, result) {
		if (err){
			next(err);			
		}
		else{
  			next(null, result);
		}	
	});		
};

module.exports.findAllProduct = ( next) => {
	productRepository.findAll( function(err, result) {
		if (err){
			next(err);			
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
				prod.createdOn= new Date();
				if(productReq.itemImage){
				prod.itemImage=apiUtils.uploadImage("product_"+sequenceId,productReq.itemImage);
				}
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
			next(new ProductNotFoundError("No Product items found for given id"+productId));
		}
		else if(productId != productReq.itemId){
			next(new ProductNotFoundError("Product id passed in URL "+productId+
			" is not same as Product id "+productReq.itemId +" passed in body"));
		}
		else{
			let prod = new product(oneCustomer);
			prod.itemName=productReq.itemName;
			prod.itemDesc=productReq.itemDesc;
			
			prod.gst=productReq.gst;
			prod.priceWithGST=productReq.priceWithGST;
			prod.category1=productReq.category1;
			prod.category2=productReq.category2;
			prod.category3=productReq.category3;
			prod.category4=productReq.category4;
			prod.status=productReq.status;
			prod.validTill=productReq.validTill;

			if (productReq.stocks){

				_.forEach(productReq.stocks, function(stock){
					if(stock._id && prod.stocks){
						_.map(prod.stocks, function(obj){
							  if(obj._id==stock._id) {//console.log("inside map and going to replace the calues");
							  	obj.price=stock.price;
								obj.offerPrice=stock.offerPrice;
							    obj.unit=stock.unit;
								obj.unitType=stock.unitType;
								obj.quantityInStock=stock.quantityInStock;
							  }
						});			
					}
					else{
						console.log("id is not there");
						prod.stocks.push(stock);
					}									
				});
			}

			if(productReq.itemImage){
				prod.itemImage=apiUtils.uploadImage("product_"+productId,productReq.itemImage);
			}
			productRepository.update(prod, function(err, result) {
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





