'use strict';

const referenceDataServiceImpl= require('../service-impl/reference-data-service-impl');
const logger = require('../config/logger');
const pushTesting= require('../config/push-notifications.js')

exports.getAll = (req, res, next) => {
		logger.info("Getting All reference Datas....");
		pushTesting.pushit('Aggarwal Daily Needs','A new order received',['ceRzKQ9qvM4:APA91bHbWYH-4EW-edMIBuyfuwkipy0_a4QtAKmjBdIWSnZ4xl6YpjyInDxsy_Jmzz2r-K-n-JxQd3hZ3_3PFdAnlzzIdmBLZSWDJLWEqUce4qW4RvF2wmPjd7w8OIHkX1exa0CB-sSg']);
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