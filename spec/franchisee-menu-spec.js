'use strict';

var FranchiseeMenuServiceImpl = require('../service-impl/franchisee-menu-service-impl');
var FranchiseeMenuRepository = require('../repository/franchisee-menu-repository');
var FranchiseeScheduleRepository = require('../repository/franchisee-schedule-repository');  
var FranchiseeMenu = require('./test-io-samples').franchiseeMenu;
var FranchiseeSchedule = require('./test-io-samples').franchiseeSchedule; 
var FranchiseeMenuRequest= require('./test-io-samples').franchiseeMenuRequest; 
var FranchiseeScheduleUpdated= require('./test-io-samples').franchiseeScheduleUpdated; 
var franchiseeId= 1;
var onDate ='2017-06-13';

		describe(" #findMenuByFranchiseeId ", function() {
			beforeEach(function(){
				spyOn(FranchiseeMenuRepository, 'findMenuByFranchiseeId').and.callFake(function(franchiseeId,callback) {
					console.log("Spy started..1");
					return callback(null,FranchiseeMenu);
				});
			});

			it("Getting Franchisee Object based on franchiseeId", function (done) {
				FranchiseeMenuServiceImpl.findMenuByFranchiseeId(franchiseeId , function (err , result){
					expect(FranchiseeMenuRepository.findMenuByFranchiseeId).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result.franchiseeId).toEqual(1);
					expect(result.menuItem).not.toBeNull();
					done();
				});
			});
		});


		describe(" #findMenuByDate ", function() {
			beforeEach(function(){
				spyOn(FranchiseeMenuRepository, 'findMenuByFranchiseeId').and.callFake(function(franchiseeId,callback) {
					return callback(null,FranchiseeMenu);
				});
				spyOn(FranchiseeScheduleRepository, 'getScheduleByFranchiseeId').and.callFake(function(franchiseeId,callback) {
					return callback(null,FranchiseeSchedule);
				});
			});

			it("Getting Franchisee Menu based on franchiseeId on given date", function (done) {
				FranchiseeMenuServiceImpl.findMenuByDate(franchiseeId ,onDate, function (err , result){					
					expect(FranchiseeMenuRepository.findMenuByFranchiseeId).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result.franchiseeId).toEqual(1);
					expect(result.menuItem).not.toBeNull();
					done();
				});
			});
		});

		describe(" #Update ", function() {
			beforeEach(function(){

				spyOn(FranchiseeScheduleRepository, 'getScheduleByFranchiseeId').and.callFake(function(franchiseeId, callback) {
					return callback(null, FranchiseeSchedule);
				});

				spyOn(FranchiseeScheduleRepository, 'update').and.callFake(function(FranchiseeScheduleUpdated, callback) {
					return callback(null, FranchiseeScheduleUpdated);
				});
				
			});

			it("Updating Franchisee Menu attributes like status and price on franchise schedule", function (done) {
				FranchiseeMenuServiceImpl.update(franchiseeId , FranchiseeMenuRequest , function (err , result){					
					expect(FranchiseeScheduleRepository.getScheduleByFranchiseeId).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result.franchiseeId).toEqual(1);
					expect(FranchiseeMenuRequest.menuItem[0].itemName).toEqual('Noodles');
					//expect(result.schedule[0].menuOverride[0][0]).toEqual('Noodles');
					done();
				});
			});
		});