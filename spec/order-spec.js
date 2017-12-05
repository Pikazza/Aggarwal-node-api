'use strict';

var OrderRepository = require('../repository/order-repository');  
var OrderServiceImpl = require('../service-impl/order-service-impl');
var SequenceImpl = require('../service-impl/sequence');
var OrderResponse= require('./test-io-samples').orderResponse;
var OrderRequest= require('./test-io-samples').orderRequest;
var OrderUpdatedResponse= require('./test-io-samples').orderUpdatedResponse;
var OrderUpdateRequest= require('./test-io-samples').orderUpdateRequest;

var franchiseeId= 1;
var orderId= 1;
var admin= 'ADMIN';
var adminId=0;
var userType ='FRANCHISE';
var startDate='2017-06-05';
var endDate = '2017-06-13';
var sequenceFor='order';

	describe(" #findAll ", function() {
		beforeEach(function(){
			spyOn(OrderRepository, 'findAll').and.callFake(function(userType, franchiseeId, callback) {
				console.log("Spy started..1");
				return callback(null,[OrderResponse]);
			});
		});

		it("Getting Order list ", function (done) {
			OrderServiceImpl.getAll(userType, franchiseeId , function (err , result){
				expect(OrderRepository.findAll).toHaveBeenCalled();
				expect(err).toBeNull();
				expect(result).toBeDefined();
				expect(result[0].franchiseeId).toEqual(1);
				expect(result[0].orderStatus).toEqual('INITIALIZED');
				done();
			});
		});
	});

		describe(" #findByOrderId ", function() {
		beforeEach(function(){
			spyOn(OrderRepository, 'findByOrderId').and.callFake(function(userType, franchiseeId, orderId, callback) {
				console.log("Spy started..1");
				return callback(null,OrderResponse);
			});
		});

		it("Getting Order Object based on orderId", function (done) {
			OrderServiceImpl.getByOrderId(userType, franchiseeId, orderId, function (err , result){
				expect(OrderRepository.findByOrderId).toHaveBeenCalled();
				expect(err).toBeNull();
				expect(result).toBeDefined();
				expect(result.franchiseeId).toEqual(1);
				expect(result.orderId).toEqual(1);
				expect(result.orderStatus).toEqual('INITIALIZED');
				done();
			});
		});
	});


	describe(" #findByDate ", function() {
		beforeEach(function(){
			spyOn(OrderRepository, 'findByDate').and.callFake(function(userType, franchiseeId, startDate, endDate, callback) {
				console.log("Spy started..1");
				return callback(null,[OrderResponse]);
			});
		});

		it("Getting Order list ", function (done) {
			OrderServiceImpl.getByDate(userType, franchiseeId, startDate, endDate, function (err , result){
				expect(OrderRepository.findByDate).toHaveBeenCalled();
				expect(err).toBeNull();
				expect(result).toBeDefined();
				expect(result[0].franchiseeId).toEqual(1);
				expect(result[0].orderStatus).toEqual('INITIALIZED');
				done();
			});
		});
	});

		describe(" #Create Order ", function() {
			beforeEach(function(){
				spyOn(OrderRepository, 'create').and.callFake(function(OrderRequest,callback) {
					return callback(null,OrderResponse);
				});
				spyOn(SequenceImpl, 'getSequence').and.callFake(function(sequenceFor,callback) {
					return callback(null,1);
				});

			});

			it("It place new Order", function (done) {
				OrderServiceImpl.create(OrderRequest , function (err , result){
					expect(OrderRepository.create).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result.franchiseeId).toEqual(1);
					expect(result.orderId).toEqual(1);
					expect(result.orderStatus).toEqual('INITIALIZED');
					done();
				});
			});
		});

		describe(" #Update Order ", function() {

			beforeEach(function(){

				spyOn(OrderRepository, 'update').and.callFake(function(OrderUpdatedResponse, callback) {
					return callback(null,OrderUpdatedResponse);
				});

				spyOn(OrderRepository, 'findByOrderId').and.callFake(function(admin, adminId, orderId, callback) {
					return callback(null,OrderResponse);
				});

			});

			it("It update the status of existing Order", function (done) {
				OrderServiceImpl.update(orderId, OrderUpdateRequest, function (err , result){
					expect(OrderRepository.update).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result.franchiseeId).toEqual(1);
					expect(result.orderId).toEqual(1);
					expect(OrderUpdateRequest.orderStatus).toEqual('ACCEPTED');
					expect(result.orderStatus).toEqual('ACCEPTED');
					done();
				});
			});
		});