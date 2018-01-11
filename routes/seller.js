'use strict';

const sellerController = require('../controllers/seller-controller');
const auth = require('../config/basic-jwt-auth');
const roleBasedAccess = require('../config/permission');

module.exports = function(router){

/**
* @swagger
* /v1.0/seller:
*   get:
*     tags:
*       - Seller
*     description: |
*                   Returns Sellers based on the given criteria.
*                   In default mode, it returns all the seller records.
*                   By passing seller id, return single object.
*     produces:
*       - application/json
*     parameters:
*       - name: sellerId
*         description: Seller id
*         in: query
*         required: false
*         type: integer
*     responses:
*       200:
*         description: An array of Seller
*         schema:
*           $ref: '#/definitions/SellerRequest'
*/
	router.get('/v1.0/seller',
		sellerController.get),

/**
* @swagger
* /v1.0/seller:
*   post:
*     security:
*       - basicAuth: []
*     tags:
*       - Seller
*     description: This API creates new Seller and this can be only done by admin who has a role HAOCHII_ADMIN
*     produces:
*       - application/json
*     parameters:
*       - name: Seller
*         description: Seller object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/SellerRequest'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/Seller'
*       default:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/ErrorModel'
*/
	router.post('/v1.0/seller', 
		auth.verifyWithAccAuth, 
		roleBasedAccess.rolesAllowedForAccAuth('SUPER_ADMIN'),
		sellerController.add),

/**
* @swagger
* /v1.0/seller/{sellerId}:
*   put:
*     security:
*       - basicAuth: []
*     tags: 
*      - Seller
*     description: Updates existing Seller
*     produces: application/json
*     parameters:
*       - name: sellerId
*         description: Seller id
*         in: path
*         required: true
*         type: integer
*       - name: Seller
*         in: body
*         description: Fields for the Seller resource
*         schema:
*          $ref: '#/definitions/Seller'
*     responses:
*       200:
*         description: Successfully updated
*         schema:
*           $ref: '#/definitions/Seller'
*/
	router.put('/v1.0/seller/:sellerId', 
		auth.verifyWithAccAuth, 
		roleBasedAccess.rolesAllowedForAccAuth('USER','ADMIN','SUPER_ADMIN'),
		sellerController.update),


/**
* @swaggers
* /v1.0/seller/login:
*   post:
*     security:
*       - basicAuth: []
*     deprecated: true
*     tags:
*       - Seller
*     description: Returns Token For Bearer Authentication
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of Sellers
*         schema:
*           $ref: '#/definitions/Seller'
*/
	router.post('/v0.0/seller/login', 
		sellerController.login),

/**
* @swagger
* /v1.0/seller/login:
*   post:
*     security:
*       - basicAuth: []
*     tags:
*       - Seller
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
*         description: An array of Sellers
*         schema:
*           $ref: '#/definitions/Seller'
*/
	router.post('/v1.0/seller/login', 
		auth.verifyWithBasicAuth, 
		roleBasedAccess.rolesAllowedForBasic('USER','ADMIN','SUPER_ADMIN'),
		sellerController.loginV20),



/**
* @swagger
* /v1.0/seller/forgotpassword:
*   post:
*     security:
*       - basicAuth: []
*     tags:
*       - Seller
*     description: Sends email with temporary password and return status true else returns false.
*     produces:
*       - application/json
*     parameters:
*       - name: ForgotPassword
*         description: Authid has to be passed for the seller who forgotten his password.
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
	router.post('/v1.0/seller/forgotpassword', 
		auth.verifyWithBasicAuth, 
		roleBasedAccess.rolesAllowedForBasic('USER','ADMIN','SUPER_ADMIN'),
		sellerController.forgotPassword),

/**
* @swagger
* /v1.0/seller/verifyOtp:
*   get:
*     security:
*       - basicAuth: []
*     tags:
*       - Seller
*     description: Returns true or false based on the otp verification.
*     produces:
*       - application/json
*     parameters:
*       - name: authId
*         description: auth id of Seller 
*         in: query
*         required: true
*         type: string
*       - name: otpNo
*         description: OTP (temporary password) received to seller email address.
*         in: query
*         required: true
*         type: string
*     responses:
*       200:
*         description: a successful response
*         schema:
*           $ref: '#/definitions/VerifyOTPResponse'
*/
	router.get('/v1.0/seller/verifyOtp', 
		auth.verifyWithBasicAuth, 
		roleBasedAccess.rolesAllowedForBasic('USER','ADMIN','SUPER_ADMIN'),
		sellerController.verifyOtp)


/**
* @swaggers
* /v1.0/seller/discover:
*   get:
*     security:
*       - Bearer: []
*     tags:
*       - Seller
*     description: |
*                  Returns list of Sellers who are all opened on given date.
*                  This API spec is mainly used for customers .
*     produces:
*       - application/json
*     parameters:
*       - name: onDate
*         description: Date formate to be passed as 'YYYY-MM-DD'
*         in: query
*         required: true
*         type: string
*     responses:
*       200:
*         description: a successful response
*         schema:
*           $ref: '#/definitions/Seller'
*/
router.get('/v1.0/seller/discover', 
	auth.verifyWithJwt, 
	roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
	sellerController.discover)
}



