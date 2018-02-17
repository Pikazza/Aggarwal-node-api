'use strict';

const gcm = require('node-gcm');

const regTokens = ['ceRzKQ9qvM4:APA91bHbWYH-4EW-edMIBuyfuwkipy0_a4QtAKmjBdIWSnZ4xl6YpjyInDxsy_Jmzz2r-K-n-JxQd3hZ3_3PFdAnlzzIdmBLZSWDJLWEqUce4qW4RvF2wmPjd7w8OIHkX1exa0CB-sSg'];


exports.pushit = (apiKey,titleText,tokensArray) => {

const sender = new gcm.Sender(apiKey);

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