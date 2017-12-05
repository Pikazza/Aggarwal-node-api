'use strict';

const referenceData =require('../models/reference-data').ReferenceData;

module.exports.findAll = (next) => {
	referenceData.findOne({}, function(err, result) {
		if (err) next(err);
		next(null, result);
	}); 
};