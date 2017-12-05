var franchisee = require('../models/franchisee').Franchisee;
var franchiseeRequest = require('../models/franchisee').FranchiseeRequest;


var franchiseeRequest = { 
    "status" : "ACTIVE", 
    "franchiseType" : "FRANCHISE", 
    "franchiseeName" : "name", 
    "profileImage" : "fS9ykswcRV0M1Hitw+7kfmLzgUmAHci8xvZLssT5P8BGokPad3T5FkAAAAASUVORK5CYII=", 
    "phoneNumber" : "07456436756",
    "franchisorName":"Haochii",
    "menuType" : "MENUTYPE_1", 
    "device" : {
        "deviceId" : "deviceid", 
        "deviceType" : "ANDROID/iOS", 
        "deviceToken" : "g876hd63nf83bf72bje9"
    }, 
    "authentication" : {
        "authMech" : "MAIL", 
        "authId" : "pikazza@madebyfire.com", 
        "authToken" : "pikazza", 
        "role" : "USER"
    },
     "orderThreshold" : {
                "minOrder" : "5", 
                "minDuration" : "25", 
                "midOrder" : "10", 
                "midDuration" : "50", 
                "maxOrder" : "15", 
                "maxDuration" : "75"
            },
    "franchiseeSchedule" : [
        {
            "tradingDate" : "2017-09-30T07:00:59.000+0000", 
            "shopStatus" : "OPEN", 
            "_id" :"5926d3cedbf9487d7d0b0cdb", 
            "location" : {
                "latitude" : "52.4123", 
                "longitude" : "1.4791"
            }
        }
    ]
};

var franchiseeResponse =
{
  "__v": 0,
  "franchiseType": "FRANCHISE",
  "status": "ACTIVE",
  "menuType":"MENUTYPE_1",
  "franchiseeName": "name",
  "profileImage": "fS9ykswcRV0M1Hitw+7kfmLzgUmAHci8xvZLssT5P8BGokPad3T5FkAAAAASUVORK5CYI=",
  "emailAddress": "pikazza@madebyfire.com",
  "phoneNumber": "07456436456",
  "createdOn": "2014-09-30 12:30:59",
  "modifiedOn": "2014-10-30 12:30:59",
  "franchiseeId": 1,
  "_id": "5923d44aacc2d724c0c2bce2",
  "device": {
    "deviceId": "deviceid",
    "deviceType": "ANDROID/iOS",
    "deviceToken": "g876hd63nf83bf72bje9"
  },
  "authentication": {
    "authMech": "MAIL",
    "authId": "pikazza@madebyfire.com",
    "authToken": "960881f726822b84be4035f9a6f4148dfa2099ef824eb4ce9177d3df81533131",//pikazza
    "role": "HAOCHII_ADMIN",
    "tempToken" : "2cokcyufd06", 
    "tempTokenExpiredOn" : "2017-04-30T07:00:59.000+0000"
  },
  "popupShopSchedule": [
    {
      "tradingDate": "2017-09-30T07:00:59.000+0000",
      "shopStatus": "OPEN",
      "_id": "5923d44aacc2d724c0c2bce3",
      "location": {
        "latitude": "52.4123",
        "longitude": "1.4791"
      },
      "orderThreshold": {
        "minOrder": "5",
        "minDuration": "25",
        "midOrder": "10",
        "midDuration": "50",
        "maxOrder": "15",
        "maxDuration": "75"
      }
    }
  ],
  "addresses": [
    {
      "addressType": "DELEVERY",
      "addressLine1": "",
      "addressLine2": "",
      "addressLine3": "",
      "town": "",
      "county": "",
      "postCode": "",
      "_id": "5923d44aacc2d724c0c2bce4"
    }
  ]
};

var franchiseeUpdatedResponse =
{
  "__v": 0,
  "franchiseType": "FRANCHISE",
  "status": "INACTIVE",
  "menuType":"MENUTYPE_1",
  "franchiseeName": "prabakaran",
  "profileImage": "fS9ykswcRV0M1Hitw+7kfmLzgUmAHci8xvZLssT5P8BGokPad3T5FkAAAAASUVORK5CYI=",
  "emailAddress": "pikazza@madebyfire.com",
  "phoneNumber": "07456436456",
  "createdOn": "2014-09-30 12:30:59",
  "modifiedOn": "2014-10-30 12:30:59",
  "franchiseeId": 1,
  "_id": "5923d44aacc2d724c0c2bce2",
  "device": {
    "deviceId": "deviceid",
    "deviceType": "ANDROID/iOS",
    "deviceToken": "g876hd63nf83bf72bje9"
  },
  "authentication": {
    "authMech": "MAIL",
    "authId": "pikazza@madebyfire.com",
    "authToken": "960881f726822b84be4035f9a6f4148dfa2099ef824eb4ce9177d3df81533131",//pikazza
    "role": "HAOCHII_ADMIN",
    "tempToken" : "2cokcyufd06", 
    "tempTokenExpiredOn" : "2017-05-29 08:27:58"
  },
  "popupShopSchedule": [
    {
      "tradingDate": "2014-09-30 12:30:59",
      "shopStatus": "OPEN",
      "_id": "5923d44aacc2d724c0c2bce3",
      "location": {
        "latitude": "52.4123",
        "longitude": "1.4791"
      },
      "orderThreshold": {
        "minOrder": "5",
        "minDuration": "25",
        "midOrder": "10",
        "midDuration": "50",
        "maxOrder": "15",
        "maxDuration": "75"
      }
    }
  ],
  "addresses": [
    {
      "addressType": "DELEVERY",
      "addressLine1": "",
      "addressLine2": "",
      "addressLine3": "",
      "town": "",
      "county": "",
      "postCode": "",
      "_id": "5923d44aacc2d724c0c2bce4"
    }
  ]
};

var party= { 
    "_id" : "59394a358334a90f93e4a67a", 
    "status" : "ACTIVE", 
    "franchiseType" : "FRANCHISE", 
    "franchiseeName" : "name", 
    "profileImage" : "fS9ykswcRV0M1Hitw+7kfmLzgUmAHci8xvZLssT5P8BGokPad3T5FkAAAAASUVORK5CYII=", 
    "phoneNumber" : "07456436756", 
    "franchisorName" : "Haochii", 
    "menuType" : "MENUTYPE_2", 
    "franchiseeId" : 1, 
    "createdOn" : "2017-06-08T12:59:33.565+0000", 
    "device" : {
        "deviceId" : "deviceid", 
        "deviceType" : "ANDROID/iOS", 
        "deviceToken" : "g876hd63nf83bf72bje9"
    }, 
    "authentication" : {
        "authMech" : "MAIL", 
        "authId" : "pikazza@madebyfire.com", 
        "authToken" : "960881f726822b84be4035f9a6f4148dfa2099ef824eb4ce9177d3df81533131", 
        "role" : "USER"
    }, 
    "orderThreshold" : {
        "minOrder" : "5", 
        "minDuration" : "25", 
        "midOrder" : "10", 
        "midDuration" : "50", 
        "maxOrder" : "15", 
        "maxDuration" : "75"
    }, 
    "franchiseeSchedule": [
    {
      "tradingDate": "2017-09-30T07:00:59.000Z",
      "shopStatus": "OPEN",
      "_id": "5926d3cedbf9487d7d0b0cdb",
      "menuOverride": [],
      "location": {
        "latitude": "52.4123",
        "longitude": "1.4791"
      }
    }
  ],
    "modifiedOn" : "2017-06-08T12:59:33.566+0000", 
    "__v" : 0
};

var franchiseeSchedule ={ 
    "_id" : "59394a358334a90f93e4a67b", 
    "franchiseeId" : 1, 
    "schedule" : [
        {
            "tradingDate" : "2017-06-13T07:00:59.000+0000", 
            "shopStatus" : "OPEN", 
            "_id" :"5926d3cedbf9487d7d0b0cdb", 
            "menuOverride" : [

            ], 
            "location" : {
                "latitude" : "52.4123", 
                "longitude" : "1.4791"
            }
        }
    ], 
    "__v" : 0
};

var referenceMenu= { 
    "_id" : "5937ab354a99d31c52053d23", 
    "franchisorName" : "Haochii", 
    "menuType" : "MENUTYPE_2", 
    "menuValidityStart" : "2017-05-01T05:10:33.336+0000", 
    "menuValidityEnd" : "2018-05-01T05:10:33.336+0000", 
    "menuItem" : [
        {
            "itemName" : "Chicken Chow mein", 
            "itemDesc" : "", 
            "price" : "100", 
            "category" : "TOPPING", 
            "comboDeal" : [

            ]
        }, 
        {
            "itemName" : "drink", 
            "itemDesc" : "", 
            "price" : "50", 
            "category" : "DRINK", 
            "comboDeal" : [

            ]
        }, 
        {
            "itemName" : "Chicken Chow mein+drink", 
            "itemDesc" : "", 
            "price" : "50", 
            "category" : "COMBO", 
            "comboDeal" : [
                "Chicken Chow mein", 
                "drink"
            ]
        }, 
        {
            "itemName" : "Noodels", 
            "itemDesc" : "", 
            "price" : "50", 
            "category" : "BASE", 
            "comboDeal" : [

            ]
        }
    ]
};

var franchiseeMenu= { 
    "_id" : "5937ab354a99d31c52053d23", 
    "franchiseeId" : 1, 
    "menuItem" : [
        {
            "itemName" : "Chicken Chow mein", 
            "itemDesc" : "", 
            "price" : "100", 
            "category" : "TOPPING", 
            "comboDeal" : [

            ]
        }, 
        {
            "itemName" : "drink", 
            "itemDesc" : "", 
            "price" : "50", 
            "category" : "DRINK", 
            "comboDeal" : [

            ]
        }, 
        {
            "itemName" : "Chicken Chow mein+drink", 
            "itemDesc" : "", 
            "price" : "50", 
            "category" : "COMBO", 
            "comboDeal" : [
                "Chicken Chow mein", 
                "drink"
            ]
        }, 
        {
            "itemName" : "Noodels", 
            "itemDesc" : "", 
            "price" : "50", 
            "category" : "BASE", 
            "comboDeal" : [

            ]
        }
    ]
};

var franchiseeMenuRequest={
    "franchiseeId": 1,
    "menuItem": [
        {
        "itemName": "Noodles",
        "offerPrice": "",
        "status":"SOLD_OUT"
    }
    ]
};

var franchiseeScheduleUpdated={
    "_id":"59394a358334a90f93e4a67b",
    "franchiseeId":1,
    "schedule":[
      {
        "tradingDate":"2017-06-13T07:00:59.000+0000",
        "shopStatus":"OPEN",
        "_id":"5926d3cedbf9487d7d0b0cdb",
        "menuOverride":[
            [
            "Noodles",
            "",
            "SOLD_OUT"
            ]
        ],
        "location":
        {
          "latitude":"52.4123"
          ,"longitude":"1.4791"
        }
      }
    ],
    "__v":0
};
 

var orderRequest ={
        "customerId":2,
        "franchiseeId":1,
        "stripeToken":"stripetoken",
        "stripeFranchiseeId":"sdfsdfdsfsdfsdff",
        "orderStatus":"INITIALIZED",
        "paymentStatus":"INITIALIZED",
        "extraPreference":"More Spicy",
        "totalAmountToBePaid":100,
        "serviceType":"TAKE_AWAY",
        "orderedOn" : "2017-06-12T14:57:24.007+0000",
        "orderingCharge":{
            "vatAmount":100,
            "totalBookingAmount":100,
            "discountPercent":100,
            "discountedtotalAmount":100
        },
        "listOfItems":[
          {
            "itemName":"drink",
            "placeCount":1,
            "price":100,
            "offerPrice":0,
            "catogory":"DRINK"
          },
          {
              "itemName":"Noodels",
              "placeCount":1,
              "price":100,
              "offerPrice":50,
              "catogory":"BASE"
          }
       ]
  
};

var orderResponse={ 
    "_id" : "593eabd429efac3cc64daa09", 
    "franchiseeId" : 1, 
    "stripeToken" : "stripetoken", 
    "stripeFranchiseeId" : "sdfsdfdsfsdfsdff", 
    "orderStatus" : "INITIALIZED", 
    "paymentStatus" : "INITIALIZED", 
    "extraPreference" : "More Spicy", 
    "totalAmountToBePaid" : 100, 
    "serviceType" : "TAKE_AWAY", 
    "orderId" : 1, 
    "orderedOn" : "2017-06-12T14:57:24.007+0000", 
    "listOfItems" : [
        {
            "itemName" : "drink", 
            "placeCount" : 1, 
            "price" : 100, 
            "offerPrice" : 0, 
            "catogory" : "DRINK", 
            "_id" : "593eabd429efac3cc64daa0b"
        }, 
        {
            "itemName" : "Noodels", 
            "placeCount" : 1, 
            "price" : 100, 
            "offerPrice" : 50, 
            "catogory" : "BASE", 
            "_id" : "593eabd429efac3cc64daa0a"
        }
    ], 
    "orderingCharge" : {
        "vatAmount" : 100, 
        "totalBookingAmount" : 100, 
        "discountPercent" : 100, 
        "discountedtotalAmount" : 100
    }, 
    "__v" : 0
};

var orderUpdateRequest={
    "orderStatus": "ACCEPTED",
    "paymentStatus": "INITIALIZED",
    "orderId": 1
};

var orderUpdatedResponse={ 
    "_id" : "593eabd429efac3cc64daa09", 
    "franchiseeId" : 1, 
    "stripeToken" : "stripetoken", 
    "stripeFranchiseeId" : "sdfsdfdsfsdfsdff", 
    "orderStatus" : "ACCEPTED", 
    "paymentStatus" : "INITIALIZED", 
    "extraPreference" : "More Spicy", 
    "totalAmountToBePaid" : 100, 
    "serviceType" : "TAKE_AWAY", 
    "orderId" : 1, 
    "orderedOn" : "2017-06-12T14:57:24.007+0000", 
    "listOfItems" : [
        {
            "itemName" : "drink", 
            "placeCount" : 1, 
            "price" : 100, 
            "offerPrice" : 0, 
            "catogory" : "DRINK", 
            "_id" : "593eabd429efac3cc64daa0b"
        }, 
        {
            "itemName" : "Noodels", 
            "placeCount" : 1, 
            "price" : 100, 
            "offerPrice" : 50, 
            "catogory" : "BASE", 
            "_id" : "593eabd429efac3cc64daa0a"
        }
    ], 
    "orderingCharge" : {
        "vatAmount" : 100, 
        "totalBookingAmount" : 100, 
        "discountPercent" : 100, 
        "discountedtotalAmount" : 100
    }, 
    "__v" : 0
};

var customerRegRequest = {
    "firstName": "Prabakaran",
    "lastName": "Mathi",
    "phoneNumber": "7373478346",
    "device": {
        "deviceType": "ANDROID",
        "deviceToken": "androiddevicetoken"
    },
    "authentication": {
        "authMech": "MAIL",
        "authId": "praba@madebyfire.com",
        "authToken": "pikazza",
        "role": "USER"
    }
};

var customerResponse = {
    "_id": "595a605aa468c05fab48bbb5",
    "createdOn": "2017-07-03T15:18:50.883Z",
    "customerId": 2,
    "status": "ACTIVE",
    "firstName": "Prabakaran",
    "lastName": "Mathi",
    "phoneNumber": "7373478346",
    "__v": 0,
    "device": {
        "deviceType": "ANDROID",
        "deviceToken": "string"
    },
    "authentication": {
        "authMech": "MAIL",
        "authId": "praba@madebyfire.com",
        "authToken": "960881f726822b84be4035f9a6f4148dfa2099ef824eb4ce9177d3df81533131",
        "role": "USER",
        "tempToken" : "2cokcyufd06", 
        "tempTokenExpiredOn" : "2017-04-30T07:00:59.000+0000"
    },
    "modifiedOn": "2017-07-03T15:18:50.882Z",
    "addresses": []
};

var customerUpdateRequest = {
    "_id": "595a605aa468c05fab48bbb5",
    "createdOn": "2017-07-03T15:18:50.883Z",
    "customerId": 2,
    "status": "INACTIVE",
    "firstName": "Praba",
    "lastName": "Mathi",
    "phoneNumber": "7823456789",
    "__v": 0,
    "device": {
        "deviceType": "ANDROID",
        "deviceToken": "string"
    },
    "authentication": {
        "authMech": "MAIL",
        "authId": "praba@madebyfire.com",
        "authToken": "",
        "role": "USER"
    },
    "modifiedOn": "2017-07-03T15:18:50.882Z",
    "addresses": []
};


var customerUpdateResponse = {
    "_id": "595a605aa468c05fab48bbb5",
    "createdOn": "2017-07-03T15:18:50.883Z",
    "customerId": 2,
    "status": "INACTIVE",
    "firstName": "Praba",
    "lastName": "Mathi",
    "phoneNumber": "7823456789",
    "__v": 0,
    "device": {
        "deviceType": "ANDROID",
        "deviceToken": "string"
    },
    "authentication": {
        "authMech": "MAIL",
        "authId": "praba@madebyfire.com",
        "authToken": "",
        "role": "USER"
    },
    "modifiedOn": "2017-07-03T15:18:50.882Z",
    "addresses": []
};

var customerSignInReq = {
    "authId": "praba@madebyfire.com",
    "authToken": "pikazza",
    "deviceType": "ANDROID",
    "deviceToken": "string"
};
var franchiseeSignInReq = {
    "authId": "pikazza@madebyfire.com",
    "authToken": "pikazza",
    "deviceType": "ANDROID",
    "deviceToken": "string"
};

module.exports = {
    franchiseeRequest,
    franchiseeResponse,
    franchiseeUpdatedResponse,
    party,
    franchiseeSchedule,
    referenceMenu,
    franchiseeMenu,
    franchiseeMenuRequest,
    franchiseeScheduleUpdated,
    orderRequest,
    orderResponse,
    orderUpdateRequest,
    orderUpdatedResponse,
    customerRegRequest,
    customerUpdateRequest,
    customerResponse,
    customerUpdateResponse,
    customerSignInReq,
    franchiseeSignInReq
};