'use strict';

const referenceDataController = require('../controllers/reference-data-controller'); 

module.exports = function(router){

	/**
* @swagger
* /v1.0/referenceData:
*   get:
*     tags:
*       - ReferenceData
*     description: Returns all Reference Datas
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An object of constants and enum values.
*/

router.get('/v1.0/referenceData',
		   referenceDataController.getAll)

	/**
* @swagger
* /v1.0/referenceData:
*   put:
*     tags:
*       - ReferenceData
*     description: Updates list of reference datas
*     produces:
*       - application/json
*     parameters:
*       - name: ReferenceDataRequest
*         description: Reference Data Request for updating information
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/ReferenceDataRequest'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/ReferenceData'
*/
	router.put('/v1.0/referenceData', 
		//auth.verifyWithJwt,
		//roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		referenceDataController.update)

}