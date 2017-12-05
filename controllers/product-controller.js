'use strict';

const productServiceImpl = require('../service-impl/product-service-impl');
const logger = require('../config/logger');
const apiUtils = require('../util/api-utils');

exports.get = (req, res, next) => {
	logger.info("Getting franchisees. menu...");	
	if(req.query.productId){
		productServiceImpl.findProductById(req.query.productId, function (err , result){
			if (err) {
				next(err);
			} 
			else{
			res.status(200).json(result);
			}
		});
	}else{
		productServiceImpl.findAllProduct(function (err , result){
			if (err) {
				next(err);
			}
			else{
			res.status(200).json(result);
			}
		});
	}
};

exports.add = (req, res, next) => {
	logger.info("Rigistering new product..");
    productServiceImpl.create(req.body, function (err , result){
		if (err) {
			next(err);
		}
		else{
		res.status(200).json(result);
		}
	});
};

exports.update = (req, res, next) => {
	logger.info("Updating existing Product.."+req.params.productId);
    productServiceImpl.update(req.params.productId, req.body, function (err , result){
		if (err) next(err);
		res.status(200).json(result);
	});
};