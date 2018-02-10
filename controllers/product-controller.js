'use strict';

const productServiceImpl = require('../service-impl/product-service-impl');
const logger = require('../config/logger');
const apiUtils = require('../util/api-utils');

exports.get = (req, res, next) => {
	//logger.info("Getting store products...");
		
	if(req.query.productId){
		logger.info("Getting store products... base on ids");
		productServiceImpl.findProductById(req.query.productId, function (err , result){
			if (err) {
				next(err);
			} 
			else{
			res.status(200).json(result);
			}
		});
	}
	else if(req.query.categoryOne || req.query.categoryTwo || req.query.categoryThree ){
		logger.info("Getting store products...based on categories");
		console.log(req.query.categoryOne + req.query.categoryTwo);
		productServiceImpl.findProductByCategory(req.query.categoryOne, req.query.categoryTwo, req.query.categoryThree, function (err , result){
			if (err) {
				next(err);
			} 
			else{
			res.status(200).json(result);
			}
		});
	}else if(req.query.searchKey){
		logger.info("Searching store products... base on ids");
		productServiceImpl.search(req.query.searchKey, function (err , result){
			if (err) {
				next(err);
			} 
			else{
			res.status(200).json(result);
			}
		});
	}else{
		logger.info("Getting store products...");
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