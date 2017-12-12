'use strict';

const swaggerJSDoc = require('swagger-jsdoc');
const Props = require('../util/api-properties');

const swaggerDefinition = {
  info: {
    title: 'Agarwal apis',
    version: '1.0.0',
    description: '<p>Listing of  REST API specifications for Agarwal project, Which are implemented using Express.js framework on top of Node.js. It mainly focusing on resources like <code>Customer</code> ,<code>SalesMan</code>,<code>Product</code> and <code>Order</code>. Each resource has its own set of <code>GET</code>, <code>POST ..</code> requests. </p>'+
        '<p>All <code>POST</code> and <code>PUT</code> services are protected and basic authentication mechanism are used in this project. </p>'+
        '<p></p>'+
      '<ul>'+
      '<li><b>Basic authorization</b>'+
      '<p>Static username and password is used for enforcing access controls and  authenticating user.</p></li>'+
      '</ul>'+
       '<p><b>Note:</b> Use below <code>Authorize</code> button to login</p>',
  },
  host: Props.swagger.hostpath,
  basePath: '/',
  schemes:[
  	'http',
  	'htttps'
  ],
  securityDefinitions:{
  	basicAuth:{
  		type: 'basic'
  	},
  	Bearer:{
  		type: 'apiKey',
    	in: 'header',
    	name: 'Authorization'
  	}
  }
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js'],
};
var swaggerSpec = swaggerJSDoc(options);

exports.SwaggerSpec=swaggerSpec;
