'use strict';

const gcm = require('node-gcm');
const apiProperties = require('../util/api-properties');

//apiProperties.google.api-key

const sender = new gcm.Sender('AAAA3eYd9oo:APA91bGeXljzhB9Gl_newKddivGcTfDj6IxYCIlq1bTSaW4A6YbVmq4gt5lNwLK88bbyVkmHeE0O4NeiuuQMjvjTRGhsiKWvM9Jz0ae2fz4qWKY9--x61sMAQD6xx3UK-V_RYZhD9Xc-');
const regTokens = ['ceRzKQ9qvM4:APA91bHbWYH-4EW-edMIBuyfuwkipy0_a4QtAKmjBdIWSnZ4xl6YpjyInDxsy_Jmzz2r-K-n-JxQd3hZ3_3PFdAnlzzIdmBLZSWDJLWEqUce4qW4RvF2wmPjd7w8OIHkX1exa0CB-sSg'];


exports.pushit = (titleText,tokensArray) => {

let message = new gcm.Message({
    priority: 'high',
    contentAvailable: true,
    timeToLive: 3,
    data: {
        body: 'Aggarwal Daily Needs',
        title: titleText
    }
/*    notification: {
        title: "Hello, World",
        icon: "ic_launcher",
        body: " This is a first notification for aggarwal notification"
    }*/
});
sender.send(message, { registrationTokens: tokensArray }, 10,function (err, response) {
  if(err) {
    console.error("push notification err "+err);
}
  else { 
    console.log("push notification response "+JSON.stringify(response));
  }  
});


};

//https://www.npmjs.com/package/node-gcm