'use strict';

const referenceDataServiceImpl= require('../service-impl/reference-data-service-impl');
const logger = require('../config/logger');

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
	logger.info("Updating existing reference data.."+req.params.refId);
    referenceDataServiceImpl.update(req.params.refId, req.body, function (err , result){
		if (err) next(err);
		res.status(200).json(result);
	});
};