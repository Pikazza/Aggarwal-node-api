const referenceDataRepository = require('../repository/reference-data-repository');

module.exports.getAll = (next) => {
		  referenceDataRepository.findAll(function(err, result) {
		  if (err) next(err);
		  next(null, result);
	}); 
};