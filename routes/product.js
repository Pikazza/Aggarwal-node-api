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
*                 Returns all generic Product items or single item based on Query params.
*     produces:
*       - application/json
*     parameters:
*       - name: productId
*         description: Product's id has to be passed to get a product sprcfic details.
*         in: query
*         required: false
*         type: integer
*     responses:
*       200:
*         description: It will return Product Details
*         schema:
*           $ref: '#/definitions/Product'
*/
	router.get('/v1.0/product',
		productController.get),

/**
* @swagger
* /v1.0/product:
*   post:
*     tags:
*       - Product
*     description: This service will post new product into DB
*     produces:
*       - application/json
*     parameters:
*       - name: ProductRequest
*         description: new Product Deatails has to passed and images has to passed as Base64 format.
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
*     description: Updates list of product's details and its prices
*     produces:
*       - application/json
*     parameters:
*       - name: productId
*         description: Product's id to which update will be performed.
*         in: path
*         required: true
*         type: string
*       - name: Product
*         description: changed Product Deatails need to passed to get the information updated.
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
