const orderController = require('../controllers/order-controller');
const auth = require('../config/basic-jwt-auth');
const roleBasedAccess = require('../config/permission');

module.exports = function(router) {

/**
* @swagger
* /v1.0/order:
*   get:
*     security:
*       - Bearer: []
*     tags:
*       - Order
*     description: | 
*                    Returns array of order objects based on query param criteria. 
*                    Query param 'orderId' will return single order object details.
*                    By passing 'startDate' and 'endDate' in query param will return array of objects in between those range.
*                    Default 'startDate' and 'endDate' values are current date and date for is YYYY-MM-DD.
*     produces:
*       - application/json
*     parameters:
*       - name: orderId
*         description: Order's Id to get a order details.
*         in: query
*         required: false
*         type: integer
*       - name: startDate
*         description: start date for listing the orders between date range.
*         in: query
*         required: false
*         type: string
*       - name: endDate
*         description: end date for listing the orders between date range.
*         in: query
*         required: false
*         type: string
*     responses:
*       200:
*         description: An array of Orders
*         schema:
*           $ref: '#/definitions/Order'
*       401:
*         description: Returns unexpected error if it does not meet any required criteria
*         schema:
*           $ref: '#/definitions/ErrorModel'
*       default:
*         description: Returns unexpected error if it does not meet any required criteria
*         schema:
*           $ref: '#/definitions/ErrorModel'
*/
	router.get('/v1.0/order',
		auth.verifyWithJwt,
		roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		orderController.getOrder),

/**
* @swagger
* /v1.0/order:
*   post:
*     security:
*       - Bearer: []
*     tags:
*       - Order
*     description: placeing new Order
*     produces:
*       - application/json
*     parameters:
*       - name: Order
*         description: Order object that has to be registered in DB
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/OrderRequest'
*     responses:
*       200:
*         description: Successfully created.
*         schema:
*           $ref: '#/definitions/Order'
*/
	router.post('/v1.0/order', 
		auth.verifyWithJwt,
		roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		orderController.addOrder),

/**
* @swagger
* /v1.0/order/{orderId}:
*   put:
*     security:
*       - Bearer: []
*     tags: 
*      - Order
*     description: Updates existing Order
*     produces: application/json
*     parameters:
*       - name: orderId
*         description: Order id
*         in: path
*         required: true
*         type: integer
*       - name: Order
*         in: body
*         description: Fields that has to updated in single order.
*         schema:
*          $ref: '#/definitions/OrderUpdateRequest'
*     responses:
*       200:
*         description: Successfully updated.
*         schema:
*           $ref: '#/definitions/Order'
*/
	router.put('/v1.0/order/:orderId', 
		auth.verifyWithJwt,
		roleBasedAccess.rolesAllowedForJWT('USER','HAOCHII_ADMIN','FRANCHISE_ADMIN'),
		orderController.updateOrder)


}
