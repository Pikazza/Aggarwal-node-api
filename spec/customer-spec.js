'use strict';

const CustomerRepository = require('../repository/customer-repository'); 
const CustomerServiceImpl = require('../service-impl/customer-service-impl');
const CustomerResponse= require('./test-io-samples').customerResponse;
const SequenceImpl = require('../service-impl/sequence');
const CustomerRegRequest = require('./test-io-samples').customerRegRequest;
const CustomerUpdateRequest = require('./test-io-samples').customerUpdateRequest; 
const CustomerUpdateResponse = require('./test-io-samples').customerUpdateResponse; 
const CustomerSignInReq = require('./test-io-samples').customerSignInReq;
const mailer = require('../util/mail-sender');

const customerId= 2;
const sequenceFor='customer';
const authId='praba@madebyfire.com';
const plainPass = "";
const mailFor ="CUSTOMER_REG"


	describe(" #getById ", function() {
		beforeEach(function(){
			spyOn(CustomerRepository, 'findByCustomerId').and.callFake(function(customerId, callback) {
				return callback(null,CustomerResponse);
			});
		});

		it("Getting Customer Object based on customerId", function (done) {
			CustomerServiceImpl.getById(customerId , function (err , result){
				expect(CustomerRepository.findByCustomerId).toHaveBeenCalled();
				expect(err).toBeNull();
				expect(result).toBeDefined();
				expect(result.customerId).toEqual(2);
				expect(result.authentication.authId).toEqual("praba@madebyfire.com");
				done();
			});
		});
	});

	describe(" #create ", function() {
		beforeEach(function(){
			spyOn(CustomerRepository, 'findByAuthId').and.callFake(function(authId, callback) {
				return callback(null,null);
			});
			spyOn(SequenceImpl, 'getSequence').and.callFake(function(sequenceFor,callback) {
				return callback(null,2);
			});
			spyOn(CustomerRepository, 'create').and.callFake(function(CustomerRegRequest, callback) {
				return callback(null,CustomerResponse);
			});
			spyOn(mailer, 'MailSender').and.callFake(function(authId,plainPass,customerId,mailFor) {
				return true;
			});
		});

		it("create a new customer ", function (done) {
			CustomerServiceImpl.create(CustomerRegRequest , function (err , result){
				expect(CustomerRepository.findByAuthId).toHaveBeenCalled();
				expect(err).toBeNull();
				expect(result).toBeDefined();
				expect(result.customerId).toEqual(2);
				expect(result.authentication.authId).toEqual("praba@madebyfire.com");
				done();
			});
		});
	});

	describe(" #update ", function() {
		beforeEach(function(){
			spyOn(CustomerRepository, 'findByCustomerId').and.callFake(function(authId, callback) {
				return callback(null,CustomerResponse);
			});
			spyOn(SequenceImpl, 'getSequence').and.callFake(function(sequenceFor,callback) {
				return callback(null,2);
			});
			spyOn(CustomerRepository, 'update').and.callFake(function(CustomerUpdateRequest, callback) {
				return callback(null,CustomerUpdateResponse);
			});
		});

		it("create a new customer ", function (done) {
			CustomerServiceImpl.update(customerId, CustomerUpdateRequest , function (err , result){
				expect(CustomerRepository.findByCustomerId).toHaveBeenCalled();
				expect(err).toBeNull();
				expect(result).toBeDefined();
				expect(result.customerId).toEqual(2);
				expect(result.authentication.authId).toEqual("praba@madebyfire.com");
				expect(CustomerResponse.status).toEqual("ACTIVE");
				expect(CustomerUpdateRequest.status).toEqual("INACTIVE");
				expect(result.status).toEqual("INACTIVE");
				done();
			});
		});
	});

		describe(" #Login Customer ", function() {
			beforeEach(function(){
				 CustomerRepository.findByAuthId.isSpy = false;
				spyOn(CustomerRepository, 'findByAuthId').and.callFake(function(authId,callback) {
					return callback(null,CustomerResponse);
				});
				spyOn(CustomerRepository, 'update').and.callFake(function(CustomerUpdateRequest, callback) {
					return callback(null,CustomerUpdateResponse);
				});
			});

			it("It allows the Customer to login into their account ", function (done) {
				CustomerServiceImpl.login(CustomerSignInReq , function (err , result){
					expect(CustomerRepository.findByAuthId).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result.customer.customerId).toEqual(2);
					expect(result.customer.authentication.authId).toEqual("praba@madebyfire.com");
					done();
				});
			});

		});

		describe(" #forgotPassword Customer ", function() {

			beforeEach(function(){
				CustomerRepository.findByAuthId.isSpy = false;
				spyOn(CustomerRepository, 'findByAuthId').and.callFake(function(authId,callback) {
					return callback(null,CustomerResponse);
				});
				spyOn(CustomerRepository, 'update').and.callFake(function(CustomerResponse,callback) {
					return callback(null,"true");
				});
			});

			it("It allows the Customer to trigger one temp password ", function (done) {
				CustomerServiceImpl.forgotPassword('praba@madebyfire.com', function (err , result){
					expect(CustomerRepository.findByAuthId).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result).toBe('true');
					//expect(result.party.ptyId).toEqual(1);
					//expect(result.party.authentication.authId).toEqual("pikazza@madebyfire.com");
					done();
				});
			});
		});


		describe(" #OTPvalidation Customer ", function() {

			beforeEach(function(){
				CustomerRepository.findByAuthId.isSpy = false;
				spyOn(CustomerRepository, 'findByAuthId').and.callFake(function(authId,callback) {
					return callback(null,CustomerResponse);
				});
			});

			it("It allows the Customer to validate OTP and send back jwt token otherwise throw an error", function (done) {
				CustomerServiceImpl.verifyOtp('praba@madebyfire.com','2cokcyufd06',function (err , result){
					expect(CustomerRepository.findByAuthId).toHaveBeenCalled();
					expect(err).not.toBeNull();
					//expect(result.status).toEqual('true');
					//expect(result.franchiseeId).toEqual(1);
					//expect(result).toBeUndefined();
					done();
				});
			});
		});