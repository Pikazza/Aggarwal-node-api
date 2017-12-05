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

}