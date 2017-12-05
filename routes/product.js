'use strict';

const productController = require('../controllers/product-controller');
const auth = require('../config/basic-jwt-auth');
const roleBasedAccess = require('../config/permission');

module.exports = function(router){

/**
* @swagger
* /v1.0/product:
*   get:
*     tags:
*       - Product
*     description: |
*                 Returns all generic Product items or single item based on Query parems.
*     produces:
*       - application/json
*     parameters:
*       - name: productId
*         description: Franchisee's id has to be passed to get the listings of menu items.
*         in: query
*         required: false
*         type: integer
*     responses:
*       200:
*         description: Menu object associated with Franchisee
*         schema:
*           $ref: '#/definitions/MenuResponse'
*/
	router.get('/v1.0/product',
		productController.get),

/**
* @swagger
* /v1.0/product:
*   post:
*     tags:
*       - Product
*     description: Updates list of item's statuses and its prices
*     produces:
*       - application/json
*     parameters:
*       - name: ProductRequest
*         description: Object which has array of menu that has to be modified.
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/ProductRequest'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/Product'
*/
	router.post('/v1.0/product', 
		//auth.verifyWithJwt,
		//roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		productController.add),

	/**
* @swagger
* /v1.0/product/{productId}:
*   put:
*     tags:
*       - Product
*     description: Updates list of item's statuses and its prices
*     produces:
*       - application/json
*     parameters:
*       - name: productId
*         description: Franchisee's id has to be passed to get the listings of menu items.
*         in: path
*         required: true
*         type: string
*       - name: Product
*         description: Object which has array of menu that has to be modified.
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Product'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/Product'
*/
	router.put('/v1.0/product/:productId', 
		//auth.verifyWithJwt,
		//roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		productController.update)

}
