'use strict';

const gcm = require('node-gcm');

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
    });
    sender.send(message, { registrationTokens: tokensArray }, 10,function (err, response) {
      if(err) {
        console.error("push notification err ----> "+err);
        }
        else { 
        console.log("push notification response -----> "+JSON.stringify(response));
        }  
    });

};

//https://www.npmjs.com/package/node-gcm