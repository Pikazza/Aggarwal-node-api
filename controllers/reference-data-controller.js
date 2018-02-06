'use strict';

const referenceDataServiceImpl= require('../service-impl/reference-data-service-impl');
const logger = require('../config/logger');
const pushTesting= require('../config/push-notifications.js')

exports.getAll = (req, res, next) => {
		logger.info("Getting All reference Datas....");
		referenceDataServiceImpl.getAll(function (err , result){
			if (err) {
				next(err);
			}
			else{
			res.status(200).json(result);
			}
		});
};

exports.update = (req, res, next) => {
	logger.info("Updating existing reference data..");
    referenceDataServiceImpl.update(req.body, function (err , result){
		if (err) next(err);
		res.status(200).json(result);
	});
};