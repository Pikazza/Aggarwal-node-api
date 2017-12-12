'use strict';

const categoryServiceImpl = require('../service-impl/category-service-impl');
const logger = require('../config/logger');
const apiUtils = require('../util/api-utils');

exports.get = (req, res, next) => {
	logger.info("Getting franchisees. menu...");	
	if(req.query.categoryId){
		categoryServiceImpl.findById(req.query.categoryId, function (err , result){
			if (err) {
				next(err);
			} 
			else{
			res.status(200).json(result);
			}
		});
	}else{
		categoryServiceImpl.findAll(function (err , result){
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
	logger.info("Rigistering new category.."+JSON.stringify(req.body));
    categoryServiceImpl.create(req.body, function (err , result){
		if (err) {
			next(err);
		}
		else{
		res.status(200).json(result);
		}
	});
};

exports.update = (req, res, next) => {
	logger.info("Updating existing Product.."+req.params.categoryId);
    categoryServiceImpl.update(req.params.categoryId, req.body, function (err , result){
		if (err) next(err);
		res.status(200).json(result);
	});
};