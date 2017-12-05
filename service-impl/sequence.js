'use strict';

const Sequence = require('../models/sequence').Sequence;
const logger = require('../config/logger');

	module.exports.getSequence = (name, next) => {
		var currentId;
	  	Sequence.findOne({"name":name}, function (err, result) {
			if(err){
				logger.info("Sequence collection error with "+err);
				next(err);
			} 
			else{
				currentId=parseInt(result.sequence);
				result.sequence = currentId+1;
				result.save();
				logger.log("The Sequence Id of new "+name+" record is "+currentId);
				next(null,currentId);
			}
		});

	};