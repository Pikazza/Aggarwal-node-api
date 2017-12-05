'use strict';

const FranchiseeServiceImpl = require('../service-impl/franchisee-service-impl');
const SequenceImpl = require('../service-impl/sequence');
const FranchiseeRepository = require('../repository/franchisee-repository');
const FranchiseeScheduleRepository = require('../repository/franchisee-schedule-repository');
const ReferenceMenuRepository = require('../repository/reference-menu-repository'); 
const FranchiseeMenuRepository = require('../repository/franchisee-menu-repository'); 
const mailer = require('../util/mail-sender');
const Party = require('./test-io-samples').party;
const PartySchedule = require('./test-io-samples').franchiseeSchedule; 
const FranchiseeRequest = require('./test-io-samples').franchiseeRequest; 
const FranchiseeResponse = require('./test-io-samples').franchiseeResponse;
const FranchiseeUpdatedResponse = require('./test-io-samples').franchiseeUpdatedResponse;
const ReferenceMenu = require('./test-io-samples').referenceMenu; 
const FranchiseeMenu = require('./test-io-samples').franchiseeMenu;
const FranchiseeSignInReq = require('./test-io-samples').franchiseeSignInReq;

const franchiseeId= 1;
const authId="pikazza@madebyfire.com";
const sequenceFor= 'franchisee';
const franchisor = 'Haochii';
const menuType='MENUTYPE_2';



		describe(" #findByPtyId ", function() {
			beforeEach(function(){
				spyOn(FranchiseeRepository, 'findByFranchiseeId').and.callFake(function(franchiseeId,callback) {
					return callback(null,Party);
				});
				spyOn(FranchiseeScheduleRepository, 'getScheduleByFranchiseeId').and.callFake(function(franchiseeId,callback) {
					return callback(null,PartySchedule);
				});
			});

			it("Getting Franchisee Object based on franchiseeId", function (done) {
				FranchiseeServiceImpl.getById(franchiseeId , function (err , result){
					expect(FranchiseeRepository.findByFranchiseeId).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result.franchiseeId).toEqual(1);
					expect(result.authentication.authId).toEqual("pikazza@madebyfire.com");
					done();
				});
			});
		});

		describe(" #Create Franchisee ", function() {
			beforeEach(function(){
				spyOn(FranchiseeRepository, 'findByAuthId').and.callFake(function(authId,callback) {
					return callback(null,null);
				});
				spyOn(FranchiseeRepository, 'create').and.callFake(function(FranchiseeRequest,callback) {
					return callback(null,FranchiseeResponse);
				});
				spyOn(SequenceImpl, 'getSequence').and.callFake(function(sequenceFor,callback) {
					return callback(null,1);
				});
				spyOn(ReferenceMenuRepository, 'findByFranchisorNameAndMenuType').and.callFake(function(franchisor,menuType,callback) {
					return callback(null,ReferenceMenu);
				});
				spyOn(FranchiseeMenuRepository, 'create').and.callFake(function(ReferenceMenu,callback) {
					return callback(null,FranchiseeMenu);
				});
				spyOn(FranchiseeScheduleRepository, 'create').and.callFake(function(FranchiseeRequest,callback) {
					return callback(null,FranchiseeRequest);
				});
				spyOn(mailer, 'MailSender').and.callFake(function(authId,plainPass,customerId,mailFor) {
				return true;
			});

			});

			it("It creates new Franchisee", function (done) {
				FranchiseeServiceImpl.create(FranchiseeRequest , function (err , result){
					expect(FranchiseeRepository.create).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result.franchiseeId).toEqual(1);
					expect(result.authentication.authId).toEqual("pikazza@madebyfire.com");
					done();
				});
			});
		});



	describe(" #Update Party ", function() {
			beforeEach(function(){
				var FranchiseeUpdatedSchedule = FranchiseeUpdatedResponse.franchiseeSchedule;
				spyOn(FranchiseeRepository, 'findByFranchiseeId').and.callFake(function(franchiseeId,callback) {
					return callback(null,FranchiseeResponse);
				});
				spyOn(FranchiseeRepository, 'update').and.callFake(function(FranchiseeUpdatedResponse,callback) {
					return callback(null,FranchiseeUpdatedResponse);
				});
				spyOn(FranchiseeScheduleRepository, 'getScheduleByFranchiseeId').and.callFake(function(franchiseeId,callback) {
					return callback(null,PartySchedule);
				});
				spyOn(FranchiseeScheduleRepository, 'update').and.callFake(function(FranchiseeUpdatedSchedule,callback) {
					return callback(null,FranchiseeUpdatedSchedule);
				});

			});

			it("It updates the party details", function (done) {
				FranchiseeServiceImpl.update(franchiseeId, FranchiseeUpdatedResponse , function (err , result){
					expect(FranchiseeScheduleRepository.update).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result.franchiseeId).toEqual(1);
					expect(FranchiseeResponse.franchiseeName).toEqual('name');
					expect(FranchiseeUpdatedResponse.franchiseeName).toEqual('prabakaran');
					expect(FranchiseeUpdatedResponse.status).toEqual('INACTIVE');
					expect(result.franchiseeId).toEqual(1);
					expect(result.authentication.authId).toEqual("pikazza@madebyfire.com");
					done();
				});
			});
		});

			describe(" #Login Franchisee ", function() {
			beforeEach(function(){
				 FranchiseeRepository.findByAuthId.isSpy = false;
				spyOn(FranchiseeRepository, 'findByAuthId').and.callFake(function(authId,callback) {
					return callback(null,FranchiseeResponse);
				});

			});

			it("It allows the Franchisee to login into their account ", function (done) {
				FranchiseeServiceImpl.login('pikazza@madebyfire.com', 'pikazza' , function (err , result){
					expect(FranchiseeRepository.findByAuthId).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result.party.franchiseeId).toEqual(1);
					expect(result.party.authentication.authId).toEqual("pikazza@madebyfire.com");
					done();
				});
			});
		});

		describe(" #Login v2.0 Franchisee ", function() {
			beforeEach(function(){
				 FranchiseeRepository.findByAuthId.isSpy = false;
				spyOn(FranchiseeRepository, 'findByAuthId').and.callFake(function(authId,callback) {
					return callback(null,FranchiseeResponse);
				});
				spyOn(FranchiseeRepository, 'updateV20').and.callFake(function(FranchiseeResponse, callback) {
				return callback(null,FranchiseeResponse);
			});
			});

			it("It allows the Franchisee to login into their account ", function (done) {
				FranchiseeServiceImpl.loginV20(FranchiseeSignInReq , function (err , result){
					expect(FranchiseeRepository.findByAuthId).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result.party.franchiseeId).toEqual(1);
					expect(result.party.authentication.authId).toEqual("pikazza@madebyfire.com");
					done();
				});
			});
		});

		describe(" #forgotPassword Party ", function() {
			beforeEach(function(){

				FranchiseeRepository.findByAuthId.isSpy = false;
				spyOn(FranchiseeRepository, 'findByAuthId').and.callFake(function(authId,callback) {
					return callback(null,FranchiseeResponse);
				});
				spyOn(FranchiseeRepository, 'update').and.callFake(function(PartyUpdateReq,callback) {
					return callback(null,"true");
				});

			});

			it("It allows the Franchisee to trigger one temp password ", function (done) {
				FranchiseeServiceImpl.forgotPassword('pikazza@madebyfire.com', function (err , result){
					expect(FranchiseeRepository.findByAuthId).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result).toBeDefined();
					expect(result).toBe('true');
					//expect(result.party.ptyId).toEqual(1);
					//expect(result.party.authentication.authId).toEqual("pikazza@madebyfire.com");
					done();
				});
			});
		});


		describe(" #OTPvalidation Party ", function() {
			beforeEach(function(){
				FranchiseeRepository.findByAuthId.isSpy = false;
				spyOn(FranchiseeRepository, 'findByAuthId').and.callFake(function(authId,callback) {
					return callback(null,FranchiseeResponse);
				});

			});

			it("It allows the Franchisee to validate OTP and send back jwt token otherwise throw an error", function (done) {
				FranchiseeServiceImpl.verifyOtp('pikazza@madebyfire.com','2cokcyufd06',function (err , result){
					expect(FranchiseeRepository.findByAuthId).toHaveBeenCalled();
					expect(err).toBeNull();
					expect(result.status).toEqual('true');
					expect(result.franchiseeId).toEqual(1);
					//expect(result).toBeUndefined();
					done();
				});
			});
		});