'use strict';

const notificationController = require('../controllers/notification-controller');
const auth = require('../config/basic-jwt-auth');
const roleBasedAccess = require('../config/permission');

module.exports = function(router){

/**
* @swagger
* /v1.0/notification:
*   get:
*     tags:
*       - Notification
*     description: |
*                 Returns all generic Notification or single Notification based on Query params.
*     produces:
*       - application/json
*     parameters:
*       - name: notId
*         description: Single Notification or multiple comma seperated Notification's id has to be passed to get a Notification specific details.
*         in: query
*         required: false
*         type: string
*     responses:
*       200:
*         description: It will return Notification Details
*         schema:
*           $ref: '#/definitions/Notification'
*/
	router.get('/v1.0/notification',
		notificationController.get),

/**
* @swagger
* /v1.0/notification:
*   post:
*     tags:
*       - Notification
*     description: This service will post new notification into DB
*     produces:
*       - application/json
*     parameters:
*       - name: NotificationRequest
*         description: new Notification Deatails.
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/NotificationRequest'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/Notification'
*/
	router.post('/v1.0/notification', 
		//auth.verifyWithJwt,
		//roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		notificationController.add),

	/**
* @swagger
* /v1.0/notification/{notId}:
*   put:
*     tags:
*       - Notification
*     description: Updates list of product's details and its prices
*     produces:
*       - application/json
*     parameters:
*       - name: notId
*         description: Notification's id to which update will be performed.
*         in: path
*         required: true
*         type: string
*       - name: Notification
*         description: changed Notification Deatails need to passed to get the information updated.
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Notification'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/Notification'
*/
	router.put('/v1.0/notification/:notId', 
		//auth.verifyWithJwt,
		//roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		notificationController.update)

}
