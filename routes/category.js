'use strict';

const categoryController = require('../controllers/category-controller');
const auth = require('../config/basic-jwt-auth');
const roleBasedAccess = require('../config/permission');

module.exports = function(router){

/**
* @swagger
* /v1.0/category:
*   get:
*     tags:
*       - Category
*     description: |
*                 Returns all generic Category or single Category based on Query parems.
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Menu object associated with Franchisee
*         schema:
*           $ref: '#/definitions/Category'
*/
	router.get('/v1.0/category',
		categoryController.get),

/**
* @swaggers
* /v1.0/category:
*   post:
*     tags:
*       - Category
*     description: Updates list of item's statuses and its prices
*     produces:
*       - application/json
*     parameters:
*       - name: CategoryRequest
*         description: Object which has array of Category that has to be modified.
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/CategoryRequest'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/Category'
*/
	router.post('/v1.0/category', 
		//auth.verifyWithJwt,
		//roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		categoryController.add),

	/**
* @swagger
* /v1.0/category:
*   put:
*     tags:
*       - Category
*     description: Updates list of item's statuses and its prices
*     produces:
*       - application/json
*     parameters:
*       - name: Category
*         description: Object which has array of menu that has to be modified.
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/CategoryRequest'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/Category'
*/
	router.put('/v1.0/category', 
		//auth.verifyWithJwt,
		//roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		categoryController.update)

}
