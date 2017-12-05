'use strict';

const referenceMenu = require('../models/reference-menu').ReferenceMenu;

module.exports.findByFranchisorNameAndMenuType = (franName, menuType, next) => {
	console.log("its comming like charm ");
	referenceMenu.findOne({"franchisorName":franName, "menuType":menuType}, function(err, result) {
		if (err)  next(err);
		next(null, result);
	});
};

module.exports.findByMenuType = (menuType, next) => {
	console.log("its comming like charm ");
	referenceMenu.find({"menuType":menuType}, function(err, result) {
		if (err)  next(err);
		next(null, result);
	});
};