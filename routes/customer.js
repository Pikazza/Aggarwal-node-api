'use strict';

const customerController = require('../controllers/customer-controller');
const auth = require('../config/basic-jwt-auth');
const roleBasedAccess = require('../config/permission');

module.exports = function(router){

/**
* @swaggers
* /v1.0/customer:
*   get:
*     tags:
*       - Customer
*     description: |
*                   Returns Customers based on the given criteria.
*                   In default mode, it returns all the customer records.
*                   By passing customer id, return single object.
*     produces:
*       - application/json
*     parameters:
*       - name: customerId
*         description: Cusomer id
*         in: query
*         required: false
*         type: integer
*     responses:
*       200:
*         description: An array of Customers
*         schema:
*           $ref: '#/definitions/Customer'
*/
	router.get('/v1.0/customer',
		customerController.get),

/**
* @swaggers
* /v1.0/customer:
*   post:
*     security:
*       - basicAuth: []
*     tags:
*       - Customer
*     description: Creates new Customer
*     produces:
*       - application/json
*     parameters:
*       - name: Customer
*         description: Customer object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/CustomerRequest'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/Customer'
*/
	router.post('/v1.0/customer', 
		auth.verifyWithBasicAuth, 
		roleBasedAccess.rolesAllowedForBasic('USER'),
		customerController.add),

/**
* @swaggers
* /v1.0/customer/{customerId}:
*   put:
*     security:
*       - Bearer: []
*     tags: 
*      - Customer
*     description: Updates existing Customer
*     produces: application/json
*     parameters:
*       - name: customerId
*         description: Customer id
*         in: path
*         required: true
*         type: integer
*       - name: Customer
*         in: body
*         description: Fields for the Customer resource
*         schema:
*          $ref: '#/definitions/Customer'
*     responses:
*       200:
*         description: Successfully updated
*         schema:
*           $ref: '#/definitions/Customer'
*/
	router.put('/v1.0/customer/:customerId', 
		auth.verifyWithJwt, 
		roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN'),
		customerController.update),

/**
* @swaggers
* /v1.0/customer/login:
*   post:
*     security:
*       - basicAuth: []
*     tags:
*       - Customer
*     description: Returns Token For Bearer Authentication
*     produces:
*       - application/json
*     parameters:
*       - name: LoginRequest
*         description: LoginRequest object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/LoginRequest'
*     responses:
*       200:
*         description: An array of Customers
*         schema:
*           $ref: '#/definitions/Customer'
*/
	router.post('/v1.0/customer/login', 
		auth.verifyWithBasicAuth, 
		roleBasedAccess.rolesAllowedForBasic('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		customerController.login),


/**
*
* @swaggers
* /v1.0/customer/forgotpassword:
*   post:
*     security:
*       - basicAuth: []
*     tags:
*       - Customer
*     description: Sends email with temporary password and return status true else returns false.
*     produces:
*       - application/json
*     parameters:
*       - name: ForgotPassword
*         description: Authid has to be passed for the customer who forgotten his password.
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/ForgotPassword'
*     responses:
*       200:
*         description: a successful response.
*         schema:
*           $ref: '#/definitions/BooleanResponse'
*/
	router.post('/v1.0/customer/forgotpassword', 
		auth.verifyWithBasicAuth, 
		roleBasedAccess.rolesAllowedForBasic('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		customerController.forgotPassword),
/**
*
* @swaggers
* /v1.0/customer/verifyOtp:
*   get:
*     security:
*       - basicAuth: []
*     tags:
*       - Customer
*     description: Returns true or false based on the otp verification.
*     produces:
*       - application/json
*     parameters:
*       - name: authId
*         description: auth id of Franchisee 
*         in: query
*         required: true
*         type: string
*       - name: otpNo
*         description: OTP (temporary password) received to franchisee email address.
*         in: query
*         required: true
*         type: string
*     responses:
*       200:
*         description: a successful response
*         schema:
*           $ref: '#/definitions/VerifyOTPResponse'
*/
	router.get('/v1.0/customer/verifyOtp', 
		auth.verifyWithBasicAuth, 
		roleBasedAccess.rolesAllowedForBasic('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		customerController.verifyOtp)

}



