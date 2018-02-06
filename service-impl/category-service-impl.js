'use strict';

const _ = require('lodash');
const category= require('../models/category').Category;
const categoryRepository = require('../repository/category-repository'); 
const franchiseeScheduleRepository = require('../repository/franchisee-schedule-repository');  
const MenuNotFoundError = require('../exceptions/menu-not-found-error');
const ScheduleNotFoundError = require('../exceptions/schedule-not-found-error');
const SequenceImpl = require('../service-impl/sequence');
const apiUtils = require('../util/api-utils');
const productRepository = require('../repository/product-repository'); 

module.exports.findById = (categoryId, next) => {
	categoryRepository.findProductById(categoryId, function(err, result) {
		if (err){
			next(err);			
		}
		if(!result){
			next(new MenuNotFoundError("No Category items found for given id"));
		}
		else{
  			next(null, result);
		}	
	});		
};

module.exports.findAll = ( next) => {
	categoryRepository.findAll( function(err, result) {
		if (err){
			next(err);			
		}
		else{
  			next(null, result);
		}	
	});		
};


module.exports.create = (categoryReq, next) => { 

		SequenceImpl.getSequence("category", function(err, sequenceId){
			if (err){
				next(err);
			}
			else{
				var cat = new category(categoryReq);
				cat.categoryId=sequenceId;
				categoryRepository.create(cat, function(err, result) {
					if (err){
						next(err);
					} 
					else{
						next(null, result);
					}
					
				});
			}
		});
}

module.exports.update = (catReq, next) => {
console.log("coming to cateory impl to update or insert new one");
	categoryRepository.findAll( function(err, oneCategory) {
		if (err){
			next(err);
		}
		if(!oneCategory) {
			next(new MenuNotFoundError("No Category items found for given id"));
			console.log(" no category was found");
		}
		else{
			console.log("coming to cateory impl in else part");
			let cat = new category(oneCategory);
			console.log("Pikazza request"+JSON.stringify(cat.categories));
			console.log("Pikazza request catReq "+JSON.stringify(catReq.categories));
			// TOP Categoty starts here
			if(catReq.categories){
				_.forEach(catReq.categories, function(loopCat){
					if(loopCat._id && cat.categories){
						_.map(cat.categories, function(obj){
							  if(obj._id==loopCat._id) {//console.log("inside map and going to replace the calues");
							  	if(loopCat.image){
									obj.image=apiUtils.uploadImage("cat_cat1"+(_.random(100000, 99)),loopCat.image);
								}
							     obj.status=loopCat.status;
							     productRepository.updateCategory1(obj.name,loopCat.name, function(err, result) {
									if(err) {
										console.log(" category 1 is not updated");
									}
									else
									{
										console.log(" category 1 is updated");
									}
								});
							      obj.name=loopCat.name;
							      if(loopCat.subCategoryList1){
							      // One Categoty starts here
							      _.forEach(loopCat.subCategoryList1, function(loopCatOne){
										if(loopCatOne._id && obj.subCategoryList1){
											_.map(obj.subCategoryList1, function(objOne){
												  if(objOne._id==loopCatOne._id) {//console.log("inside map and going to replace the calues");
												  	if(loopCatOne.image){
														objOne.image=apiUtils.uploadImage("cat_cat2"+(_.random(100000, 99)),loopCatOne.image);
													}
												     objOne.status=loopCatOne.status;
												     productRepository.updateCategory2(objOne.name,loopCatOne.name, function(err, result) {
															if(err) {
																console.log(" category 2 is not updated");
															}
															else
															{
																console.log(" category 2 is updated");
															}
														});
												      objOne.name=loopCatOne.name;
												      if(loopCatOne.subCategoryList2){
												     // Two Categoty starts here
												     _.forEach(loopCatOne.subCategoryList2, function(loopCatTwo){
															if(loopCatTwo._id && objOne.subCategoryList2){
																_.map(objOne.subCategoryList2, function(objTwo){
																	  if(objTwo._id==loopCatTwo._id) {//console.log("inside map and going to replace the calues");
																	  	if(loopCatTwo.image){
																			objTwo.image=apiUtils.uploadImage("cat_cat3"+(_.random(100000, 99)),loopCatTwo.image);
																		}
																	     objTwo.status=loopCatTwo.status;
																	     productRepository.updateCategory3(objTwo.name,loopCatTwo.name, function(err, result) {
																								if(err) {
																									console.log(" category 3 is not updated");
																								}
																								else
																								{
																									console.log(" category 3 is updated");
																								}
																							});
																	      objTwo.name=loopCatTwo.name;
																	      if(loopCatTwo.subCategoryList3){
																	      // Three Categoty starts here
																	      _.forEach(loopCatTwo.subCategoryList3, function(loopCatThree){
																				if(loopCatThree._id && objTwo.subCategoryList3){
																					_.map(objTwo.subCategoryList3, function(objThree){
																						  if(objThree._id==loopCatThree._id) {//console.log("inside map and going to replace the calues");
																						  	if(loopCatThree.image){
																								objThree.image=apiUtils.uploadImage("cat_cat4"+(_.random(100000, 99)),loopCatThree.image);
																							}
																						     objThree.status=loopCatThree.status;
																						    // productRepository.updateCategory4()
																						     productRepository.updateCategory4(objThree.name,loopCatThree.name, function(err, result) {
																								if(err) {
																									console.log(" category 4 is not updated");
																								}
																								else
																								{
																									console.log(" category 4 is updated");
																								}
																							});
																						      objThree.name=loopCatThree.name;
																						  }
																					});			
																				}
																				else{
																					console.log("id is not there");
																					if(loopCatThree.image){
																					loopCatThree.image=apiUtils.uploadImage("category"+(_.random(100000, 99)),loopCatThree.image);
																					}
																					objTwo.subCategoryList3.push(loopCatThree);
																				}									
																			});
																	  	}
																	  }
																});			
															}
															else{
																console.log("id is not there");
																if(loopCatTwo.image){
																loopCatTwo.image=apiUtils.uploadImage("category"+(_.random(100000, 99)),loopCatTwo.image);
																}
																objOne.subCategoryList2.push(loopCatTwo);
															}									
														});
												  	}
												  }
											});			
										}
										else{
											console.log("id is not there");
											if(loopCatOne.image){
											loopCatOne.image=apiUtils.uploadImage("category"+(_.random(100000, 99)),loopCatOne.image);
											}
											obj.subCategoryList1.push(loopCatOne);
										}									
									});
							  	}
							  }
						});			
					}
					else{
						console.log("id is not there");
						if(loopCat.image){
						loopCat.image=apiUtils.uploadImage("category"+(_.random(100000, 99)),loopCat.image);
						}
						cat.categories.push(loopCat);
					}									
				});
			}

			let topCat=cat.categories;
			_.forEach(topCat, function(key,value) {
				
			});
			categoryRepository.update(cat, function(err, result) {
				if(err) {
					next(err);
				}
				else
				{
					next(null, result);
				}
			});
		}

	});
}





