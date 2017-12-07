'use strict';

const franchiseeController = require('../controllers/franchisee-controller');
const auth = require('../config/basic-jwt-auth');
const roleBasedAccess = require('../config/permission');

module.exports = function(router){

/**
* @swaggers
* /v1.0/franchisee:
*   get:
*     tags:
*       - Franchisee
*     description: |
*                   Returns Franchisees based on the given criteria.
*                   In default mode, it returns all the franchisee records.
*                   By passing Franchisee id, return single object.
*     produces:
*       - application/json
*     parameters:
*       - name: franchiseeId
*         description: Franchisee id
*         in: query
*         required: false
*         type: integer
*     responses:
*       200:
*         description: An array of Franchisees
*         schema:
*           $ref: '#/definitions/FranchiseeRequest'
*/
	router.get('/v1.0/franchisee',
		franchiseeController.get),

/**
* @swaggers
* /v1.0/franchisee:
*   post:
*     security:
*       - Bearer: []
*     tags:
*       - Franchisee
*     description: This API creates new Franchisee and this can be only done by admin who has a role HAOCHII_ADMIN
*     produces:
*       - application/json
*     parameters:
*       - name: Franchisee
*         description: Franchisee object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/FranchiseeRequest'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/Franchisee'
*       default:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/ErrorModel'
*/
	router.post('/v1.0/franchisee', 
		auth.verifyWithJwt,
		roleBasedAccess.rolesAllowedForJWT('HAOCHII_ADMIN'),
		franchiseeController.add),

/**
* @swaggers
* /v1.0/franchisee/{franchiseeId}:
*   put:
*     security:
*       - Bearer: []
*     tags: 
*      - Franchisee
*     description: Updates existing Franchisee
*     produces: application/json
*     parameters:
*       - name: franchiseeId
*         description: Franchisee id
*         in: path
*         required: true
*         type: integer
*       - name: Franchisee
*         in: body
*         description: Fields for the Franchisee resource
*         schema:
*          $ref: '#/definitions/Franchisee'
*     responses:
*       200:
*         description: Successfully updated
*         schema:
*           $ref: '#/definitions/Franchisee'
*/
	router.put('/v1.0/franchisee/:franchiseeId', 
		auth.verifyWithJwt, 
		roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		franchiseeController.update),


/**
* @swaggers
* /v1.0/party/user/login:
*   post:
*     security:
*       - basicAuth: []
*     deprecated: true
*     tags:
*       - Franchisee
*     description: Returns Token For Bearer Authentication
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of Franchisees
*         schema:
*           $ref: '#/definitions/Franchisee'
*/
	router.post('/v1.0/party/user/login', 
		franchiseeController.login),

/**
* @swaggers
* /v2.0/party/user/login:
*   post:
*     security:
*       - basicAuth: []
*     tags:
*       - Franchisee
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
*         description: An array of Franchisees
*         schema:
*           $ref: '#/definitions/Franchisee'
*/
	router.post('/v2.0/party/user/login', 
		auth.verifyWithBasicAuth, 
		roleBasedAccess.rolesAllowedForBasic('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		franchiseeController.loginV20),



/**
* @swaggers
* /v1.0/party/user/forgotpassword:
*   post:
*     security:
*       - basicAuth: []
*     tags:
*       - Franchisee
*     description: Sends email with temporary password and return status true else returns false.
*     produces:
*       - application/json
*     parameters:
*       - name: ForgotPassword
*         description: Authid has to be passed for the franchisee who forgotten his password.
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
	router.post('/v1.0/party/user/forgotpassword', 
		auth.verifyWithBasicAuth, 
		roleBasedAccess.rolesAllowedForBasic('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		franchiseeController.forgotPassword),

/**
* @swaggers
* /v1.0/party/user/verifyOtp:
*   get:
*     security:
*       - basicAuth: []
*     tags:
*       - Franchisee
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
	router.get('/v1.0/party/user/verifyOtp', 
		auth.verifyWithBasicAuth, 
		roleBasedAccess.rolesAllowedForBasic('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		franchiseeController.verifyOtp)


/**
* @swaggers
* /v1.0/franchisee/discover:
*   get:
*     security:
*       - Bearer: []
*     tags:
*       - Franchisee
*     description: |
*                  Returns list of Franchisees who are all opened on given date.
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
*           $ref: '#/definitions/Franchisee'
*/
router.get('/v1.0/franchisee/discover', 
	auth.verifyWithJwt, 
	roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
	franchiseeController.discover)
}



