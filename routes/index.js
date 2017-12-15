'use strict';

//var swaggerSpec = require('../server');
const swaggerSpec = require('../config/swagger');
const logger = require('../config/logger');

module.exports = function(router){

	router.get('/welcome', function(req, res) {
  		res.status(200).json({ "name":"Welcome to Haochii API with Node.js" });
	});

	router.get('/swagger.json', function(req, res) {
		res.status(200).send(swaggerSpec.SwaggerSpec);
	});

}

// Model class definition for Swagger Spec.

/**
* @swagger
* definitions:
*   BooleanResponse:
*     properties:
*       status:
*         type: boolean
*   ForgotPassword:
*     properties:
*       authId:
*         type: string
*   VerifyOTPResponse:
*     properties:
*       jwtToken:
*         type: string
*       status:
*         type: boolean
*       franchiseeId:
*         type: number
*   OrderThreshold:
*     properties:
*       minOrder:
*         type: number
*       minDuration:
*         type: number
*       midOrder:
*         type: number
*       midDuration:
*         type: number
*       maxOrder:
*         type: number
*       maxDuration:
*         type: number
*   Device:
*     properties:
*       deviceType:
*         type: string
*         default: ANDROID
*         enum:
*           - ANDROID
*           - IOS
*       deviceToken:
*         type: string
*   Location:
*     properties:
*       latitude:
*         type: string
*       longitude:
*         type: string
*   Authentication:
*     properties:
*       authMech:
*         type: string
*         default: MOBILE
*         enum:
*           - MOBILE
*           - EMAIL
*       authId:
*         type: string
*       authToken:
*         type: string
*       role:
*         type: string
*         default: USER
*         enum:
*           - USER
*           - FRANCHISE_ADMIN
*           - HAOCHII_ADMIN
*   Address:
*     properties:
*       addressLine1:
*         type: string
*       addressLine2:
*         type: string
*       addressLine3:
*         type: string
*       town:
*         type: string
*       county:
*         type: string
*       postCode:
*         type: string
*   FranchiseeScheduleRequest:
*     properties:
*       shopStatus:
*         type: string
*         default: OPEN
*         enum:
*           - OPEN
*           - CLOSE
*       tradingDate:
*         type: string
*         format: date-time
*       location:
*         $ref: '#/definitions/Location'
*   FranchiseeSchedule:
*     properties:
*       shopStatus:
*         type: string
*         default: OPEN
*         enum:
*           - OPEN
*           - CLOSE
*       tradingDate:
*         type: string
*         format: date-time
*       location:
*         $ref: '#/definitions/Location'
*       menuOverride:
*         type: array
*         items:
*           type: string
*   FranchiseeRequest:
*     properties:
*       status:
*         type: string
*         default: ACTIVE
*         enum:
*           - ACTIVE
*           - INACTIVE
*       franchiseType:
*         type: string
*         default: FRANCHISE
*         enum:
*           - FRANCHISE
*           - ADMIN
*       menuType:
*         type: string
*         default: MENUTYPE_1
*         enum:
*           - MENUTYPE_1
*           - MENUTYPE_2
*           - MENUTYPE_3
*       profileImage:
*         type: string
*       franchiseeName:
*         type: string
*       franchisorName:
*         type: string
*       phoneNumber:
*         type: string
*       orderThreshold:
*           $ref: '#/definitions/OrderThreshold'
*       authentication:
*           $ref: '#/definitions/Authentication'
*       franchiseeSchedule:
*         type: array
*         items:
*           $ref: '#/definitions/FranchiseeScheduleRequest'
*   Franchisee:
*     properties:
*       franchiseeId:
*         type: number
*       status:
*         type: string
*         default: ACTIVE
*         enum:
*           - ACTIVE
*           - INACTIVE
*       franchiseType:
*         type: string
*         default: FRANCHISE
*         enum:
*           - FRANCHISE
*           - ADMIN
*       menuType:
*         type: string
*         default: MENUTYPE_1
*         enum:
*           - MENUTYPE_1
*           - MENUTYPE_2
*           - MENUTYPE_3
*       profileImage:
*         type: string
*       franchiseeName:
*         type: string
*       franchisorName:
*         type: string
*       phoneNumber:
*         type: string
*       orderThreshold:
*           $ref: '#/definitions/OrderThreshold'
*       device:
*           $ref: '#/definitions/Device'
*       authentication:
*           $ref: '#/definitions/Authentication'
*       franchiseeSchedule:
*         type: array
*         items:
*           $ref: '#/definitions/FranchiseeSchedule'
*   CustomerRequest:
*     properties:
*       firstName:
*         type: string
*       lastName:
*         type: string
*       phoneNumber:
*         type: string
*       device:
*           $ref: '#/definitions/Device'
*       authentication:
*           $ref: '#/definitions/Authentication'
*   Customer:
*     properties:
*       customerId:
*         type: number
*       status:
*         type: string
*         default: ACTIVE
*         enum:
*           - ACTIVE
*           - INACTIVE
*       profileImage:
*         type: string
*       firstName:
*         type: string
*       lastName:
*         type: string
*       phoneNumber:
*         type: string
*       device:
*           $ref: '#/definitions/Device'
*       authentication:
*           $ref: '#/definitions/Authentication'
*       addresses:
*         type: array
*         items:
*           $ref: '#/definitions/Address'
*   OrderingCharge:
*     properties:
*       vatAmount:
*         type: number
*       totalBookingAmount:
*         type: number
*       discountPercent:
*         type: number
*       discountedtotalAmount:
*         type: number
*   OrderItemResponse:
*     properties:
*       itemName: 
*         type: string
*       price:
*         type: number
*       placeCount: 
*         type: number
*       offerPrice:
*         type: number
*       catogory:
*         type: string
*         default: BASE
*         enum:
*           - BASE
*           - TOPPING
*           - SAUCE
*           - SIDE
*           - DRINK
*           - COMBO
*   OrderUpdateRequest:
*     properties:
*       orderId:
*         type: number
*       orderStatus:
*         type: string
*         default: INITIALIZED
*         enum:
*           - INITIALIZED
*           - ACCEPTED
*           - READY
*           - COMPLETED
*           - CANCELED
*       paymentStatus:
*         type: string
*         default: INITIALIZED
*         enum:
*           - INITIALIZED
*           - PENDING
*           - SUCCESSFUL
*           - CANCELED
*   OrderRequest:
*     required:
*      - customerId
*      - franchiseeId
*      - stripeToken
*      - stripeFranchiseeId
*      - orderStatus
*      - paymentStatus
*      - totalAmountToBePaid
*      - serviceType
*      - listOfItems
*     properties:
*       customerId:
*         type: number
*       franchiseeId:
*         type: number
*       stripeToken:
*         type: string
*       stripeFranchiseeId:
*         type: string
*       orderStatus:
*         type: string
*         default: INITIALIZED
*         enum:
*           - INITIALIZED
*           - ACCEPTED
*           - READY
*           - COMPLETED
*           - CANCELED
*       paymentStatus:
*         type: string
*         default: INITIALIZED
*         enum:
*           - INITIALIZED
*           - PENDING
*           - SUCCESSFUL
*           - CANCELED
*       extraPreference:
*         type: string
*       totalAmountToBePaid:
*         type: number
*       serviceType:
*         type: string
*         default: TAKE_AWAY
*         enum:
*           - TAKE_AWAY
*           - DELIVERY
*       orderedOn:
*         type: string
*         format: date-time
*       orderingCharge:
*           $ref: '#/definitions/OrderingCharge'
*       listOfItems:
*         type: array
*         items:
*           $ref: '#/definitions/OrderItemResponse'
*   Order:
*     properties:
*       orderId:
*         type: number
*       customerId:
*         type: number
*       franchiseeId:
*         type: number
*       stripeToken:
*         type: string
*       stripeFranchiseeId:
*         type: string
*       orderStatus:
*         type: string
*         default: INITIALIZED
*         enum:
*           - INITIALIZED
*           - ACCEPTED
*           - READY
*           - COMPLETED
*           - CANCELED
*       paymentStatus:
*         type: string
*         default: INITIALIZED
*         enum:
*           - INITIALIZED
*           - PENDING
*           - SUCCESSFUL
*           - CANCELED
*       extraPreference:
*         type: string
*       totalAmountToBePaid:
*         type: number
*       serviceType:
*         type: string
*         default: TAKE_AWAY
*         enum:
*           - TAKE_AWAY
*           - DELIVERY
*       orderedOn:
*         type: string
*         format: date-time
*       orderingCharge:
*           $ref: '#/definitions/OrderingCharge'
*       listOfItems:
*         type: array
*         items:
*           $ref: '#/definitions/OrderItemResponse'
*   LoginRequest:
*     properties:
*       authId:
*         type: string
*       authToken:
*         type: string
*       deviceType:
*         type: string
*         default: ANDROID
*         enum:
*           - ANDROID
*           - IOS
*       deviceToken:
*         type: string
*   MenuItemRequest:
*     properties:
*       itemName: 
*         type: string
*       offerPrice:
*         type: number
*       status:
*         type: string
*         default: SOLD_OUT
*         enum:
*           - SOLD_OUT
*           - AVAILABLE
*           - RUNNING_LOW
*           - PRICE_SURGE
*   MenuRequest:
*     properties:
*       franchiseeId:
*         type: number
*       menuItem:
*         type: array
*         items:
*           $ref: '#/definitions/MenuItemRequest'
*   MenuItemResponse:
*     properties:
*       itemName: 
*         type: string
*       price:
*         type: number
*       itemDesc: 
*         type: string
*       offerPrice:
*         type: number
*       status:
*         type: string
*         default: SOLD_OUT
*         enum:
*           - SOLD_OUT
*           - AVAILABLE
*           - RUNNING_LOW
*           - PRICE_SURGE
*       category:
*         type: string
*   MenuResponse:
*     properties:
*       franchiseeId:
*         type: number
*       menuType:
*         type: string
*         default: MENUTYPE_1
*         enum:
*           - MENUTYPE_1
*           - MENUTYPE_2
*           - MENUTYPE_3
*       menuItem:
*         type: array
*         items:
*           $ref: '#/definitions/MenuItemResponse'
*   ErrorModel:
*     required:
*      - code
*      - name
*      - message
*     properties:
*       code: 
*         type: string
*       name:
*         type: string
*       message: 
*         type: string
*   ProductRequest:
*     properties:
*       itemName: 
*         type: string
*       itemDesc: 
*         type: string
*       itemImage: 
*         type: string
*       price: 
*         type: number
*         format: double
*       offerPrice: 
*         type: number
*         format: double
*       gst: 
*         type: number
*         format: double
*       priceWithGST: 
*         type: number
*         format: double
*       category1: 
*         type: string
*       category2: 
*         type: string
*       category3: 
*         type: string
*       category4:
*         type: string
*       quantityInStock: 
*         type: number
*       unit:
*         type: number
*       unitType:
*         type: string
*         default: KILOGRAM
*         enum:
*           - KILOGRAM
*           - GRAM
*           - LITTER
*           - MILLILITTER
*       status:
*         type: string
*         default: SHOW
*         enum:
*           - SHOW
*           - HIDE
*   Product:
*     properties:
*       itemId: 
*         type: string
*       itemName: 
*         type: string
*       itemDesc: 
*         type: string
*       itemImage: 
*         type: string
*       price: 
*         type: number
*         format: double
*       offerPrice: 
*         type: number
*         format: double
*       gst: 
*         type: number
*         format: double
*       priceWithGST: 
*         type: number
*         format: double
*       category1: 
*         type: string
*       category2: 
*         type: string
*       category3: 
*         type: string
*       category4:
*         type: string
*       quantityInStock: 
*         type: number
*       unit:
*         type: number
*       unitType:
*         type: string
*         default: KILOGRAM
*         enum:
*           - KILOGRAM
*           - GRAM
*           - LITTER
*           - MILLILITTER
*       status:
*         type: string
*         default: SHOW
*         enum:
*           - SHOW
*           - HIDE
*   SubCategory4:
*     properties:
*       name: 
*         type: string
*       status:
*         type: string
*         default: SHOW
*         enum:
*           - SHOW
*           - HIDE
*   SubCategory3:
*     properties:
*       name: 
*         type: string
*       status:
*         type: string
*         default: SHOW
*         enum:
*           - SHOW
*           - HIDE
*       subCategoryList3:
*         type: array
*         items:
*           $ref: '#/definitions/SubCategory4'
*   SubCategory2:
*     properties:
*       name: 
*         type: string
*       status:
*         type: string
*         default: SHOW
*         enum:
*           - SHOW
*           - HIDE
*       subCategoryList2:
*         type: array
*         items:
*           $ref: '#/definitions/SubCategory3'
*   SubCategory1:
*     properties:
*       name: 
*         type: string
*       status:
*         type: string
*         default: SHOW
*         enum:
*           - SHOW
*           - HIDE
*       subCategoryList1:
*         type: array
*         items:
*           $ref: '#/definitions/SubCategory2'
*   Category:
*     properties:
*       categoryId: 
*         type: string
*       categories:
*         type: array
*         items:
*           $ref: '#/definitions/SubCategory1'
*   CategoryRequest:
*     properties:
*       categories:
*         type: array
*         items:
*           $ref: '#/definitions/SubCategory1'
*   HomeTopSlider:
*     properties:
*       image: 
*         type: string
*       status:
*         type: string
*         default: SHOW
*         enum:
*           - SHOW
*           - HIDE
*       tags:
*         type: array
*         items:
*           type: string
*   HomeSlider:
*     properties:
*       image: 
*         type: string
*       status:
*         type: string
*         default: SHOW
*         enum:
*           - SHOW
*           - HIDE
*   ReferenceData:
*     properties:
*       dayDeals:
*         type: array
*         items:
*           type: string
*       homeTopSlider:
*         type: array
*         items:
*           $ref: '#/definitions/HomeTopSlider'
*       homebottomSlider:
*         type: array
*         items:
*           $ref: '#/definitions/HomeSlider'
*       medicosSlider:
*         type: array
*         items:
*           $ref: '#/definitions/HomeSlider'
*       opticalsSlider:
*         type: array
*         items:
*           $ref: '#/definitions/HomeSlider'
*   ReferenceDataRequest:
*     properties:
*       refId: 
*         type: string
*       dayDeals:
*         type: array
*         items:
*           type: string
*       homeTopSlider:
*         type: array
*         items:
*           $ref: '#/definitions/HomeTopSlider'
*       homebottomSlider:
*         type: array
*         items:
*           $ref: '#/definitions/HomeSlider'
*       medicosSlider:
*         type: array
*         items:
*           $ref: '#/definitions/HomeSlider'
*       opticalsSlider:
*         type: array
*         items:
*           $ref: '#/definitions/HomeSlider'
*
*/


